import { evalLiteral } from "../parse";
import { RunResult } from "../runCase";
import type { ExecuteResponse } from "@/utils/types/execute";

// Mirrors runCase.ts's own JSON-stringify comparison (displayValue + evalLiteral)
// so remote (Python/Java/C++) results produce the exact same RunResult shape the
// UI already renders for JS — driver builders are responsible for printing their
// result to stdout in that same JSON-comparable format.
export function mapRemoteResultToRunResult(data: ExecuteResponse, outputText: string | null): RunResult {
	if (!data.ok) {
		return { status: "error", message: data.message };
	}

	const actualDisplay = data.stdout.trim();

	let expectedDisplay: string | null = null;
	let passed: boolean | null = null;
	if (outputText && outputText.trim().length > 0) {
		try {
			expectedDisplay = JSON.stringify(evalLiteral(outputText.trim()));
			passed = actualDisplay === expectedDisplay;
		} catch {
			expectedDisplay = outputText.trim();
			passed = null;
		}
	}

	return { status: "success", actualDisplay, expectedDisplay, passed };
}
