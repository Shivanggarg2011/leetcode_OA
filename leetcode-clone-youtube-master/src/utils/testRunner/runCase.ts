import { parseArgString, evalLiteral } from "./parse";
import { arrayToLinkedList, linkedListToArray, arrayToTree, treeToArray, findTreeNodeByValue } from "./dataStructures";
import { getProblemTypeEntry, ParamType, ReturnType } from "./paramTypes";
import { formatRuntimeError } from "./errorLocation";

export type RunResult =
	| { status: "success"; actualDisplay: string; expectedDisplay: string | null; passed: boolean | null }
	| { status: "error"; message: string };

// Context needed to map a runtime error's location back to the line the
// user actually sees in the editor. Optional — when omitted, errors are
// shown without a line number (still useful for e.g. malformed custom test
// case input, which never has a meaningful "line" anyway).
export type CodeContext = {
	fullCode: string;
	sliceStartIndex: number;
	functionName: string;
};

function convertArg(type: ParamType, value: any, priorTrees: any[]): any {
	switch (type) {
		case "tree": {
			const tree = arrayToTree(value);
			priorTrees.push(tree);
			return tree;
		}
		case "list":
			return arrayToLinkedList(value);
		case "listArray":
			return Array.isArray(value) ? value.map((v: any[]) => arrayToLinkedList(v)) : value;
		case "treeRefByValue": {
			const lastTree = priorTrees[priorTrees.length - 1];
			return findTreeNodeByValue(lastTree, value);
		}
		case "value":
		default:
			return value;
	}
}

function convertReturn(type: ReturnType, value: any): any {
	switch (type) {
		case "tree":
			return treeToArray(value);
		case "list":
			return linkedListToArray(value);
		case "treeNodeValue":
			return value === null || value === undefined ? null : value.val;
		case "value":
		default:
			return value;
	}
}

function displayValue(value: any): string {
	if (value === undefined) return "undefined";
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}

// Runs a user-submitted solution against one test case's input text (either
// a problem's built-in example or a user-added custom case) and returns
// the actual output for display, compared against the expected output when
// one is known. `fn` is the callable extracted from the editor's code.
export function runTestCase(
	problemId: string,
	fn: (...args: any[]) => any,
	inputText: string,
	outputText: string | null,
	codeContext?: CodeContext
): RunResult {
	try {
		const parsedArgs = parseArgString(inputText);
		if (parsedArgs.length === 0) {
			return { status: "error", message: "Couldn't parse this input. Use the same format as the examples, e.g. nums = [1,2,3], target = 5" };
		}

		const entry = getProblemTypeEntry(problemId);
		const priorTrees: any[] = [];
		const callArgs: any[] = [];
		const structuralArgIndices: number[] = [];

		parsedArgs.forEach((arg, i) => {
			const type: ParamType = entry.params[i] ?? "value";
			const converted = convertArg(type, arg.value, priorTrees);
			callArgs.push(converted);
			if (type === "tree" || type === "list") structuralArgIndices.push(i);
		});

		let result = fn(...callArgs);

		// In-place mutation problems (reorder-list, flatten-binary-tree, ...)
		// return undefined; fall back to the mutated structural argument.
		if (result === undefined && structuralArgIndices.length > 0) {
			result = callArgs[structuralArgIndices[0]];
		}

		const actualDisplay = displayValue(convertReturn(entry.returnType, result));

		let expectedDisplay: string | null = null;
		let passed: boolean | null = null;
		if (outputText && outputText.trim().length > 0) {
			try {
				expectedDisplay = displayValue(evalLiteral(outputText.trim()));
				passed = actualDisplay === expectedDisplay;
			} catch {
				expectedDisplay = outputText.trim();
				passed = null;
			}
		}

		return { status: "success", actualDisplay, expectedDisplay, passed };
	} catch (error: any) {
		const rawMessage = error?.message ?? String(error);
		const message = codeContext
			? formatRuntimeError(error, codeContext.fullCode, codeContext.sliceStartIndex, codeContext.functionName)
			: rawMessage;
		return { status: "error", message };
	}
}
