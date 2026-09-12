import assert from "assert";
import { Problem } from "../types/problem";

function referenceIsIsomorphic(s: string, t: string): boolean {
	if (s.length !== t.length) return false;
	const mapST = new Map<string, string>();
	const mapTS = new Map<string, string>();

	for (let i = 0; i < s.length; i++) {
		const a = s[i];
		const b = t[i];
		if (mapST.has(a) && mapST.get(a) !== b) return false;
		if (mapTS.has(b) && mapTS.get(b) !== a) return false;
		mapST.set(a, b);
		mapTS.set(b, a);
	}
	return true;
}

export const isomorphicStringsHandler = (fn: any) => {
	try {
		const tests: { s: string; t: string }[] = [
			{ s: "egg", t: "add" },
			{ s: "foo", t: "bar" },
			{ s: "paper", t: "title" },
			{ s: "badc", t: "baba" },
			{ s: "ab", t: "aa" },
			{ s: "a", t: "a" },
		];

		for (const test of tests) {
			const expected = referenceIsIsomorphic(test.s, test.t);
			const result = fn(test.s, test.t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from isomorphicStringsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIsomorphicStringsJS = `// Do not edit function name
function isIsomorphic(s, t) {
  // Write your code here
};`;

export const isomorphicStrings: Problem = {
	id: "isomorphic-strings",
	title: "297. Isomorphic Strings",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, determine if they are <strong>isomorphic</strong>.
  </p>
  <p class='mt-3'>
    Two strings are isomorphic if the characters in <code>s</code> can be replaced (consistently, one character
    at a time) to obtain <code>t</code>. Every occurrence of a character must map to the same character, and no
    two different characters may map to the same character, but a character may map to itself.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "egg", t = "add"`,
			outputText: `true`,
			explanation: "'e' maps to 'a', and 'g' maps to 'd'.",
		},
		{
			id: 1,
			inputText: `s = "foo", t = "bar"`,
			outputText: `false`,
			explanation: "'o' would need to map to both 'a' and 'r'.",
		},
		{
			id: 2,
			inputText: `s = "paper", t = "title"`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 5 * 10^4</code></li>
  <li class='mt-2'><code>t.length == s.length</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> consist of any valid ASCII characters.</li>`,
	starterCode: starterCodeIsomorphicStringsJS,
	handlerFunction: isomorphicStringsHandler,
	starterFunctionName: "function isIsomorphic(",
	order: 297,
};
