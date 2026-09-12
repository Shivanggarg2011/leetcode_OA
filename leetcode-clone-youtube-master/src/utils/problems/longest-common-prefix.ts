import assert from "assert";
import { Problem } from "../types/problem";

function referenceLongestCommonPrefix(strs: string[]): string {
	if (strs.length === 0) return "";
	let prefix = strs[0];
	for (let i = 1; i < strs.length; i++) {
		while (strs[i].indexOf(prefix) !== 0) {
			prefix = prefix.slice(0, -1);
			if (prefix === "") return "";
		}
	}
	return prefix;
}

export const longestCommonPrefixHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["flower", "flow", "flight"],
			["dog", "racecar", "car"],
			["single"],
			["", "abc"],
			["interview", "internet", "internal", "interval"],
			["abc", "abc", "abc"],
		];

		for (const strs of tests) {
			const expected = referenceLongestCommonPrefix(strs);
			const result = fn(strs);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestCommonPrefixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestCommonPrefixJS = `// Do not edit function name
function longestCommonPrefix(strs) {
  // Write your code here
};`;

export const longestCommonPrefix: Problem = {
	id: "longest-common-prefix",
	title: "291. Longest Common Prefix",
	problemStatement: `<p class='mt-3'>
    Given an array of strings <code>strs</code>, return the longest string that is a prefix of every string in the
    array.
  </p>
  <p class='mt-3'>If no common prefix exists among all the strings, return an empty string <code>""</code>.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `strs = ["flower","flow","flight"]`,
			outputText: `"fl"`,
		},
		{
			id: 1,
			inputText: `strs = ["dog","racecar","car"]`,
			outputText: `""`,
			explanation: "There is no common prefix among the input strings.",
		},
		{
			id: 2,
			inputText: `strs = ["single"]`,
			outputText: `"single"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= strs.length <= 200</code></li>
  <li class='mt-2'><code>0 <= strs[i].length <= 200</code></li>
  <li class='mt-2'><code>strs[i]</code> consists of only lowercase English letters (if non-empty).</li>`,
	starterCode: starterCodeLongestCommonPrefixJS,
	handlerFunction: longestCommonPrefixHandler,
	starterFunctionName: "function longestCommonPrefix(",
	order: 291,
};
