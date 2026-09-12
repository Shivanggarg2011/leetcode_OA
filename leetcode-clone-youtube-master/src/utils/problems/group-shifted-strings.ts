import assert from "assert";
import { Problem } from "../types/problem";

function shiftKey(word: string): string {
	const diffs: number[] = [];
	for (let i = 1; i < word.length; i++) {
		let diff = word.charCodeAt(i) - word.charCodeAt(i - 1);
		if (diff < 0) diff += 26;
		diffs.push(diff);
	}
	return diffs.join(",");
}

function referenceGroupStrings(strings: string[]): string[][] {
	const groups = new Map<string, string[]>();
	for (const word of strings) {
		const key = shiftKey(word);
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key)!.push(word);
	}
	return Array.from(groups.values());
}

// Normalizes a grouping so that ordering (both within groups and across groups)
// does not affect equality comparisons.
function normalize(groups: string[][]): string[][] {
	return groups
		.map((group) => [...group].sort())
		.sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const groupShiftedStringsHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"],
			["a"],
			["az", "ba"],
			["acef", "bdfh", "abc"],
			["aa", "bb", "cc", "ad"],
		];

		for (const strings of tests) {
			const expected = normalize(referenceGroupStrings(strings));
			const result = normalize(fn(strings));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from groupShiftedStringsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGroupShiftedStringsJS = `// Do not edit function name
function groupStrings(strings) {
  // Write your code here
};`;

export const groupShiftedStrings: Problem = {
	id: "group-shifted-strings",
	title: "292. Group Shifted Strings",
	problemStatement: `<p class='mt-3'>
    We can shift a lowercase letter to the next letter cyclically, so <code>'a'</code> becomes <code>'b'</code>,
    ..., <code>'y'</code> becomes <code>'z'</code>, and <code>'z'</code> becomes <code>'a'</code>. Shifting an
    entire string means shifting every letter in it by the same amount.
  </p>
  <p class='mt-3'>
    Two strings belong to the same group if one can be obtained from the other by applying some number of
    shifts (including zero). Given an array of strings <code>strings</code>, group all strings that belong to the
    same shifting group together.
  </p>
  <p class='mt-3'>
    Return the groups in <strong>any order</strong>, and the strings within each group in <strong>any
    order</strong>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `strings = ["abc","bcd","acef","xyz","az","ba","a","z"]`,
			outputText: `[["abc","bcd","xyz"],["acef"],["az","ba"],["a","z"]]`,
			explanation: "\"abc\", \"bcd\", and \"xyz\" all share the same shift pattern (+1, +1) between letters.",
		},
		{
			id: 1,
			inputText: `strings = ["a"]`,
			outputText: `[["a"]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= strings.length <= 200</code></li>
  <li class='mt-2'><code>1 <= strings[i].length <= 50</code></li>
  <li class='mt-2'><code>strings[i]</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodeGroupShiftedStringsJS,
	handlerFunction: groupShiftedStringsHandler,
	starterFunctionName: "function groupStrings(",
	order: 292,
};
