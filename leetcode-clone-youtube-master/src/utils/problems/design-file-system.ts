import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a map from full path to value. A path can only be
// created if it doesn't already exist and its parent path already does
// (the root "" always counts as existing).
class ReferenceFileSystem {
	private paths: Map<string, number>;

	constructor() {
		this.paths = new Map();
	}

	createPath(path: string, value: number): boolean {
		if (path === "" || this.paths.has(path)) return false;
		const lastSlash = path.lastIndexOf("/");
		const parent = path.slice(0, lastSlash);
		if (parent !== "" && !this.paths.has(parent)) return false;
		this.paths.set(path, value);
		return true;
	}

	get(path: string): number {
		return this.paths.has(path) ? this.paths.get(path)! : -1;
	}
}

export const designFileSystemHandler = (fn: any) => {
	try {
		const runTest = (ops: string[], args: any[][]) => {
			const obj = fn();
			const ref = new ReferenceFileSystem();
			for (let i = 0; i < ops.length; i++) {
				const op = ops[i];
				const arg = args[i];
				const result = (obj as any)[op](...arg);
				const expected = (ref as any)[op](...arg);
				assert.equal(result, expected);
			}
		};

		runTest(
			["createPath", "createPath", "get", "createPath", "get"],
			[["/a", 1], ["/a/b", 2], ["/a/b"], ["/c/d", 3], ["/c/d"]]
		);

		runTest(
			["createPath", "get", "createPath", "createPath", "get"],
			[["/leet", 1], ["/leet"], ["/leet/code", 2], ["/leet", 3], ["/leet"]]
		);

		runTest(["createPath", "get", "get"], [["/a", 5], ["/a"], ["/b"]]);

		return true;
	} catch (error: any) {
		console.log("Error from designFileSystemHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignFileSystemJS = `function FileSystem() {
  // Write your code here.
  // Return an object exposing "createPath" and "get" methods.
  return {
    createPath: function(path, value) {

    },
    get: function(path) {

    }
  };
};`;

export const designFileSystem: Problem = {
	id: "design-file-system",
	title: "280. Design File System",
	problemStatement: `<p class='mt-3'>
    Design an in-memory file system that maps hierarchical paths (like <code>"/a/b"</code>) to
    integer values.
  </p>
  <p class='mt-3'>
    <code>createPath(path, value)</code> &mdash; creates a new path and associates
    <code>value</code> with it, then returns <code>true</code>. Returns <code>false</code> if the
    path already exists, if the path is the root <code>""</code>, or if the <strong>parent</strong>
    path does not already exist (you cannot create <code>/a/b</code> before <code>/a</code>
    exists).
  </p>
  <p class='mt-3'>
    <code>get(path)</code> &mdash; returns the value associated with <code>path</code>, or
    <code>-1</code> if the path doesn't exist.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `createPath("/a",1); createPath("/a/b",2); get("/a/b"); createPath("/c/d",3); get("/c/d")`,
			outputText: `true, true, 2, false, -1`,
			explanation: "\"/c/d\" fails because its parent \"/c\" was never created.",
		},
	],
	constraints: `<li class='mt-2'>Each path consists of lowercase English letters, digits, <code>'/'</code>, and has a length between <code>1</code> and <code>100</code>.</li>
  <li class='mt-2'><code>1 <= value <= 10^9</code></li>
  <li class='mt-2'>At most <code>10^4</code> calls total will be made to <code>createPath</code> and <code>get</code>.</li>`,
	starterCode: starterCodeDesignFileSystemJS,
	handlerFunction: designFileSystemHandler,
	starterFunctionName: "function FileSystem(",
	order: 280,
};
