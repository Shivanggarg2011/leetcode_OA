import assert from "assert";
import { Problem } from "../types/problem";

function referenceIsOneEditDistance(s: string, t: string): boolean {
	const lenS = s.length;
	const lenT = t.length;

	if (Math.abs(lenS - lenT) > 1) return false;

	// Ensure s is the shorter (or equal length) string to simplify the cases.
	if (lenS > lenT) return referenceIsOneEditDistance(t, s);

	for (let i = 0; i < lenS; i++) {
		if (s[i] !== t[i]) {
			if (lenS === lenT) {
				// Replace s[i] with t[i] and the rest must match.
				return s.slice(i + 1) === t.slice(i + 1);
			}
			// Insert t[i] into s and the rest must match.
			return s.slice(i) === t.slice(i + 1);
		}
	}

	// All compared characters matched; strings are one edit apart only if
	// t has exactly one extra trailing character.
	return lenT === lenS + 1;
}

export const oneEditDistanceHandler = (fn: any) => {
	try {
		const tests: { s: string; t: string }[] = [
			{ s: "ab", t: "acb" },
			{ s: "cab", t: "ad" },
			{ s: "1203", t: "1213" },
			{ s: "a", t: "a" },
			{ s: "", t: "a" },
			{ s: "abc", t: "abcd" },
			{ s: "abc", t: "abcde" },
		];

		for (const test of tests) {
			const expected = referenceIsOneEditDistance(test.s, test.t);
			const result = fn(test.s, test.t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from oneEditDistanceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeOneEditDistanceJS = `// Do not edit function name
function isOneEditDistance(s, t) {
  // Write your code here
};`;

export const oneEditDistance: Problem = {
	id: "one-edit-distance",
	title: "299. One Edit Distance",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if they are exactly
    <strong>one edit</strong> apart, otherwise return <code>false</code>.
  </p>
  <p class='mt-3'>An edit on a string is defined as exactly one of the following operations:</p>
  <li class='mt-2'>Insert one character into the string.</li>
  <li class='mt-2'>Delete one character from the string.</li>
  <li class='mt-2'>Replace one character in the string with a different character.</li>
  <p class='mt-3'>
    Two identical strings are considered zero edits apart, so they should return <code>false</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "ab", t = "acb"`,
			outputText: `true`,
			explanation: "Inserting 'c' into \"ab\" between 'a' and 'b' produces \"acb\".",
		},
		{
			id: 1,
			inputText: `s = "cab", t = "ad"`,
			outputText: `false`,
			explanation: "The two strings differ by more than one edit.",
		},
		{
			id: 2,
			inputText: `s = "1203", t = "1213"`,
			outputText: `true`,
			explanation: "Replacing '0' with '1' turns \"1203\" into \"1213\".",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length, t.length <= 5 * 10^4</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> consist of lowercase English letters, digits, or spaces.</li>`,
	starterCode: starterCodeOneEditDistanceJS,
	handlerFunction: oneEditDistanceHandler,
	starterFunctionName: "function isOneEditDistance(",
	order: 299,
};
