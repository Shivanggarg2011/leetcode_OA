import { RemoteLanguage } from "./problem";

export type ExecuteRequest = { language: RemoteLanguage; source: string; filename: string };

export type ExecuteResponse =
	| { ok: true; stdout: string; stderr: string; exitCode: number; stage: "run" }
	| { ok: false; stage: "compile" | "run" | "request"; message: string };
