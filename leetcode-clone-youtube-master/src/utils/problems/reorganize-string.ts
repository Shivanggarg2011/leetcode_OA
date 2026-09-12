import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: rearranging a multiset so no two adjacent characters
// match is possible exactly when no character's count exceeds half the
// string length (rounded up). We use this to know whether a rearrangement
// should exist; since many valid rearrangements exist when it is possible,
// we validate the *structure* of the submitted answer rather than comparing
// against one fixed string.
function referenceCanReorganize(s: string): boolean {
	const counts = new Map<string, number>();
	for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
	const maxFreq = Math.max(...counts.values());
	return maxFreq <= Math.ceil(s.length / 2);
}

function isValidRearrangement(result: string, original: string): boolean {
	if (typeof result !== "string") return false;
	if (result.length !== original.length) return false;
	const sortedResult = result.split("").sort().join("");
	const sortedOriginal = original.split("").sort().join("");
	if (sortedResult !== sortedOriginal) return false;
	for (let i = 1; i < result.length; i++) {
		if (result[i] === result[i - 1]) return false;
	}
	return true;
}

export const reorganizeStringHandler = (fn: any) => {
	try {
		const tests: string[] = ["aab", "aaab", "vvvlo", "aaaa", "ab", "aaabbbcc"];

		for (const s of tests) {
			const possible = referenceCanReorganize(s);
			const result = fn(s);
			if (!possible) {
				assert.strictEqual(result, "");
			} else {
				assert.strictEqual(isValidRearrangement(result, s), true);
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from reorganizeStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReorganizeStringJS = `function reorganizeString(s) {
  // Write your code here
};`;

export const reorganizeString: Problem = {
	id: "reorganize-string",
	title: "145. Reorganize String",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, rearrange its characters so that no two adjacent characters are
    the same, and return any such rearrangement.
  </p>
  <p class='mt-3'>
    If it is not possible to rearrange <code>s</code> this way, return an empty string
    <code>""</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "aab"`,
			outputText: `"aba"`,
		},
		{
			id: 1,
			inputText: `s = "aaab"`,
			outputText: `""`,
			explanation: "\"a\" appears 3 times out of 4 characters, too many to avoid a repeat next to itself.",
		},
		{
			id: 2,
			inputText: `s = "vvvlo"`,
			outputText: `"vlvov"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 500</code></li>
  <li class='mt-2'><code>s</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodeReorganizeStringJS,
	handlerFunction: reorganizeStringHandler,
	starterFunctionName: "function reorganizeString(",
	order: 145,
};
