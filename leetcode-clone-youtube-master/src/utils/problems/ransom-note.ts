import assert from "assert";
import { Problem } from "../types/problem";

function referenceCanConstruct(ransomNote: string, magazine: string): boolean {
	const counts = new Map<string, number>();
	for (const char of magazine) {
		counts.set(char, (counts.get(char) || 0) + 1);
	}
	for (const char of ransomNote) {
		const remaining = counts.get(char) || 0;
		if (remaining === 0) return false;
		counts.set(char, remaining - 1);
	}
	return true;
}

export const ransomNoteHandler = (fn: any) => {
	try {
		const tests: { ransomNote: string; magazine: string }[] = [
			{ ransomNote: "a", magazine: "b" },
			{ ransomNote: "aa", magazine: "ab" },
			{ ransomNote: "aa", magazine: "aab" },
			{ ransomNote: "", magazine: "abc" },
			{ ransomNote: "abc", magazine: "cbabca" },
		];

		for (const test of tests) {
			const expected = referenceCanConstruct(test.ransomNote, test.magazine);
			const result = fn(test.ransomNote, test.magazine);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from ransomNoteHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRansomNoteJS = `// Do not edit function name
function canConstruct(ransomNote, magazine) {
  // Write your code here
};`;

export const ransomNote: Problem = {
	id: "ransom-note",
	title: "296. Ransom Note",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>ransomNote</code> and <code>magazine</code>, return <code>true</code> if
    <code>ransomNote</code> can be constructed by cutting out and rearranging individual letters from
    <code>magazine</code>, or <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    Each letter available in <code>magazine</code> can be used at most once when building
    <code>ransomNote</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `ransomNote = "a", magazine = "b"`,
			outputText: `false`,
		},
		{
			id: 1,
			inputText: `ransomNote = "aa", magazine = "ab"`,
			outputText: `false`,
			explanation: "magazine only has one 'a', but ransomNote needs two.",
		},
		{
			id: 2,
			inputText: `ransomNote = "aa", magazine = "aab"`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= ransomNote.length, magazine.length <= 10^5</code></li>
  <li class='mt-2'><code>ransomNote</code> and <code>magazine</code> consist of lowercase English letters.</li>`,
	starterCode: starterCodeRansomNoteJS,
	handlerFunction: ransomNoteHandler,
	starterFunctionName: "function canConstruct(",
	order: 296,
};
