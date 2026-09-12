import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: two strings are anagrams if they have the same
// length and the same multiset of characters.
function referenceValidAnagram(s: string, t: string): boolean {
	if (s.length !== t.length) return false;
	const counts: Record<string, number> = {};
	for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
	for (const ch of t) {
		if (!counts[ch]) return false;
		counts[ch]--;
	}
	return true;
}

export const validAnagramHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["anagram", "nagaram"],
			["rat", "car"],
			["a", "a"],
			["ab", "a"],
			["", ""],
			["aabbcc", "abcabc"],
		];
		for (const [s, t] of tests) {
			const expected = referenceValidAnagram(s, t);
			const result = fn(s, t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from validAnagramHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidAnagramJS = `function isAnagram(s, t) {
  // Write your code here
};`;

export const validAnagram: Problem = {
	id: "valid-anagram",
	title: "3. Valid Anagram",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, determine whether <code>t</code> is an
    <strong>anagram</strong> of <code>s</code>.
  </p>
  <p class='mt-3'>
    A string is an anagram of another if it uses exactly the same characters, the same number of
    times, just possibly rearranged into a different order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "anagram", t = "nagaram"`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `s = "rat", t = "car"`,
			outputText: `false`,
		},
		{
			id: 2,
			inputText: `s = "a", t = "ab"`,
			outputText: `false`,
			explanation: "The strings have different lengths, so they cannot be anagrams.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length, t.length <= 5 * 10^4</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> consist of lowercase English letters.</li>`,
	starterCode: starterCodeValidAnagramJS,
	handlerFunction: validAnagramHandler,
	starterFunctionName: "function isAnagram(",
	order: 3,
};
