import assert from "assert";
import { Problem } from "../types/problem";

export const permutationInStringHandler = (fn: any) => {
	try {
		function referenceSolution(s1: string, s2: string): boolean {
			if (s1.length > s2.length) return false;
			const need = new Array(26).fill(0);
			const window = new Array(26).fill(0);
			const a = "a".charCodeAt(0);
			for (let i = 0; i < s1.length; i++) {
				need[s1.charCodeAt(i) - a]++;
				window[s2.charCodeAt(i) - a]++;
			}
			const matches = () => need.every((v, idx) => v === window[idx]);
			if (matches()) return true;
			for (let i = s1.length; i < s2.length; i++) {
				window[s2.charCodeAt(i) - a]++;
				window[s2.charCodeAt(i - s1.length) - a]--;
				if (matches()) return true;
			}
			return false;
		}

		const tests: [string, string][] = [
			["ab", "eidbaooo"],
			["ab", "eidboaoo"],
			["adc", "dcda"],
			["hello", "ooolleoooleh"],
			["a", "a"],
			["abc", "ab"],
		];

		for (const [s1, s2] of tests) {
			const expected = referenceSolution(s1, s2);
			const result = fn(s1, s2);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from permutationInStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePermutationInStringJS = `function checkInclusion(s1, s2) {
  // Write your code here
};`;

export const permutationInString: Problem = {
	id: "permutation-in-string",
	title: "49. Permutation in String",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code>
    contains a permutation of <code>s1</code> as a contiguous substring, or <code>false</code>
    otherwise.
  </p>
  <p class='mt-3'>
    In other words, determine whether some rearrangement of the characters of <code>s1</code> appears
    as a substring inside <code>s2</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s1 = "ab", s2 = "eidbaooo"`,
			outputText: "true",
			explanation: `s2 contains "ba", which is a rearrangement of s1.`,
		},
		{
			id: 1,
			inputText: `s1 = "ab", s2 = "eidboaoo"`,
			outputText: "false",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s1.length, s2.length <= 10^4</code></li>
  <li class='mt-2'><code>s1</code> and <code>s2</code> consist only of lowercase English letters.</li>`,
	starterCode: starterCodePermutationInStringJS,
	handlerFunction: permutationInStringHandler,
	starterFunctionName: "function checkInclusion(",
	order: 49,
};
