import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: split on '/', use a stack, handle '.', '..', and empty segments
function referenceSimplifyPath(path: string): string {
	const parts = path.split("/");
	const stack: string[] = [];
	for (const part of parts) {
		if (part === "" || part === ".") continue;
		if (part === "..") {
			if (stack.length > 0) stack.pop();
		} else {
			stack.push(part);
		}
	}
	return "/" + stack.join("/");
}

export const simplifyPathHandler = (fn: any) => {
	try {
		const tests: string[] = [
			"/home/",
			"/home//foo/",
			"/home/user/Documents/../Pictures",
			"/../",
			"/.../a/../b/c/../d/./",
			"/a/./b/../../c/",
		];
		for (const path of tests) {
			const expected = referenceSimplifyPath(path);
			const result = fn(path);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from simplifyPathHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSimplifyPathJS = `function simplifyPath(path) {
  // Write your code here
};`;

export const simplifyPath: Problem = {
	id: "simplify-path",
	title: "74. Simplify Path",
	problemStatement: `<p class='mt-3'>
    You are given an absolute Unix-style file path <code>path</code> as a string, and you must
    transform it into its <strong>simplified canonical path</strong>.
  </p>
  <p class='mt-3'>
    In a Unix-style path, a single period <code>.</code> refers to the current directory, a double
    period <code>..</code> refers to the parent directory (moving up one level, or staying at the
    root if already there), and multiple consecutive slashes are treated as a single slash.
  </p>
  <p class='mt-3'>
    The canonical path should start with a single slash, directories should be separated by exactly
    one slash, it should not end with a trailing slash (unless it is the root <code>/</code>), and it
    should not contain <code>.</code> or <code>..</code> segments.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `path = "/home/"`,
			outputText: `"/home"`,
		},
		{
			id: 1,
			inputText: `path = "/home//foo/"`,
			outputText: `"/home/foo"`,
		},
		{
			id: 2,
			inputText: `path = "/home/user/Documents/../Pictures"`,
			outputText: `"/home/user/Pictures"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= path.length <= 3000</code></li>
<li class='mt-2'><code>path</code> starts with a single slash <code>/</code></li>
<li class='mt-2'><code>path</code> consists of English letters, digits, <code>.</code>, <code>/</code>, or <code>_</code></li>
<li class='mt-2'><code>path</code> is a valid absolute Unix path</li>`,
	starterCode: starterCodeSimplifyPathJS,
	handlerFunction: simplifyPathHandler,
	starterFunctionName: "function simplifyPath(",
	order: 74,
};
