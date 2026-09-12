import type { NextApiRequest, NextApiResponse } from "next";
import type { RemoteLanguage } from "@/utils/types/problem";
import type { ExecuteResponse } from "@/utils/types/execute";

const ALLOWED_LANGUAGES: RemoteLanguage[] = ["python", "java", "cpp"];

// Piston's language id for C++ has varied across package versions ("cpp" vs "c++").
// Verify with `curl {PISTON_API_URL}/api/v2/runtimes` against your instance and adjust here if needed.
const PISTON_LANGUAGE: Record<RemoteLanguage, string> = {
	python: "python",
	java: "java",
	cpp: "cpp",
};

const MAX_SOURCE_LENGTH = 65536;
const PUBLIC_FALLBACK_URL = "https://emkc.org/api/v2/piston";

// In-memory per-IP rate limit. Resets on server restart and doesn't hold across
// multiple instances/replicas — fine for a single self-hosted pilot VM, but should
// move to a shared store (e.g. Redis/Upstash) before any real multi-instance launch.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = requestLog.get(ip);
	if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
		requestLog.set(ip, { count: 1, windowStart: now });
		return false;
	}
	entry.count += 1;
	return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export const config = {
	api: {
		bodyParser: { sizeLimit: "256kb" },
	},
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ExecuteResponse>) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ ok: false, stage: "request", message: "Method not allowed" });
	}

	const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
	if (isRateLimited(ip)) {
		return res.status(429).json({ ok: false, stage: "request", message: "Too many requests — try again in a minute." });
	}

	const { language, source, filename } = req.body ?? {};

	if (typeof language !== "string" || !ALLOWED_LANGUAGES.includes(language as RemoteLanguage)) {
		return res.status(400).json({ ok: false, stage: "request", message: "Unsupported language" });
	}
	if (typeof source !== "string" || source.length === 0 || source.length > MAX_SOURCE_LENGTH) {
		return res.status(400).json({ ok: false, stage: "request", message: "Invalid or oversized source" });
	}
	if (typeof filename !== "string" || filename.length === 0 || filename.length > 128) {
		return res.status(400).json({ ok: false, stage: "request", message: "Invalid filename" });
	}

	let pistonApiUrl = process.env.PISTON_API_URL;
	// Self-hosted Piston serves its API at the container root (e.g. http://host:2000/api/v2/execute).
	// The public emkc.org instance instead namespaces it under /api/v2/piston (their own multi-app
	// domain convention), so its execute path is just "/execute" off that base — hence the two
	// different suffixes below rather than a single hardcoded "/api/v2/execute".
	let executePath = "/api/v2/execute";
	if (!pistonApiUrl) {
		pistonApiUrl = PUBLIC_FALLBACK_URL;
		executePath = "/execute";
		console.warn(
			"[api/execute] PISTON_API_URL not set — using the public emkc.org Piston API. " +
				"This is rate-limited and explicitly discouraged for production use; set PISTON_API_URL " +
				"to your self-hosted instance (see deploy/piston/README.md)."
		);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 15_000);

	try {
		const pistonRes = await fetch(`${pistonApiUrl}${executePath}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				language: PISTON_LANGUAGE[language as RemoteLanguage],
				version: "*",
				files: [{ name: filename, content: source }],
				compile_timeout: 10000,
				run_timeout: 5000,
				compile_memory_limit: -1,
				run_memory_limit: -1,
			}),
			signal: controller.signal,
		});

		if (!pistonRes.ok) {
			const text = await pistonRes.text();
			console.error("[api/execute] Piston request failed:", pistonRes.status, text);
			// 4xx from Piston usually means a bad/unregistered language-version (e.g. the
			// runtime hasn't been installed on this instance yet, see deploy/piston/README.md)
			// rather than a connectivity problem — surface its own message when there is one.
			let message = "Couldn't reach the code execution service. Try again shortly.";
			if (pistonRes.status >= 400 && pistonRes.status < 500) {
				try {
					const parsed = JSON.parse(text);
					if (typeof parsed?.message === "string") message = parsed.message;
				} catch {
					// keep the generic message
				}
			}
			return res.status(502).json({ ok: false, stage: "request", message });
		}

		const data = await pistonRes.json();

		if (data.compile && data.compile.code !== 0) {
			return res.status(200).json({
				ok: false,
				stage: "compile",
				message: data.compile.stderr || data.compile.output || "Compile error",
			});
		}

		if (!data.run || data.run.code !== 0 || data.run.signal) {
			return res.status(200).json({
				ok: false,
				stage: "run",
				message: data.run?.stderr || (data.run?.signal ? `Process exited with signal ${data.run.signal}` : "Runtime error"),
			});
		}

		return res.status(200).json({
			ok: true,
			stage: "run",
			stdout: data.run.stdout ?? "",
			stderr: data.run.stderr ?? "",
			exitCode: data.run.code ?? 0,
		});
	} catch (error: any) {
		console.error("[api/execute] Error contacting Piston:", error);
		const message = error?.name === "AbortError" ? "Execution timed out. Try again shortly." : "Couldn't reach the code execution service. Try again shortly.";
		return res.status(502).json({ ok: false, stage: "request", message });
	} finally {
		clearTimeout(timeout);
	}
}
