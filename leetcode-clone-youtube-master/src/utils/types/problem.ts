export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

export type RemoteLanguage = "python" | "java" | "cpp";

// A single parsed test-case argument, e.g. { name: "nums", raw: "[2,7,11,15]", value: [2,7,11,15] }.
// Re-exported shape from testRunner/parse.ts's ParsedArg — kept structurally compatible so
// driver builders can be written against either import without a mismatch.
export type RemoteParsedArg = { name: string; raw: string; value: any };

// Given the user's submitted source and this test case's parsed args, produce a
// complete, runnable single-file program for that language, printing its result
// to stdout in a canonical (JSON-comparable) format.
export type RemoteDriverBuilder = (userCode: string, args: RemoteParsedArg[]) => { filename: string; source: string };

// Non-JS execution support for a problem. Optional — undefined for every problem
// that hasn't been piloted for remote execution yet (see src/utils/problems/two-sum.ts,
// valid-parentheses.ts, contains-duplicate.ts for the current pilot set).
export type RemoteExecutionConfig = {
	languages: RemoteLanguage[];
	starterCodeByLanguage: Partial<Record<RemoteLanguage, string>>;
	driversByLanguage: Partial<Record<RemoteLanguage, RemoteDriverBuilder>>;
	hiddenTestCases: { inputText: string; outputText: string }[];
};

// local problem data
export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
	remoteExecution?: RemoteExecutionConfig;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
