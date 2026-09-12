// Tracks solved-problem progress in localStorage so the editor/judge works
// as a standalone feature without requiring an account. Signed-in users
// additionally get their progress synced to Firestore (see Playground.tsx);
// this is just the always-available local fallback.

const STORAGE_KEY = "lcc-solved-problems";

export function getLocalSolvedProblems(): string[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as string[]) : [];
	} catch {
		return [];
	}
}

export function addLocalSolvedProblem(problemId: string): void {
	if (typeof window === "undefined") return;
	const current = getLocalSolvedProblems();
	if (current.includes(problemId)) return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, problemId]));
}
