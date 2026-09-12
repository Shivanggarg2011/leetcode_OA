import assert from "assert";
import { Problem } from "../types/problem";

function referenceWordPattern(pattern: string, s: string): boolean {
	const words = s.split(" ");
	if (pattern.length !== words.length) return false;

	const charToWord = new Map<string, string>();
	const wordToChar = new Map<string, string>();

	for (let i = 0; i < pattern.length; i++) {
		const c = pattern[i];
		const w = words[i];
		if (charToWord.has(c) && charToWord.get(c) !== w) return false;
		if (wordToChar.has(w) && wordToChar.get(w) !== c) return false;
		charToWord.set(c, w);
		wordToChar.set(w, c);
	}
	return true;
}

export const wordPatternHandler = (fn: any) => {
	try {
		const tests: { pattern: string; s: string }[] = [
			{ pattern: "abba", s: "dog cat cat dog" },
			{ pattern: "abba", s: "dog cat cat fish" },
			{ pattern: "aaaa", s: "dog cat cat dog" },
			{ pattern: "abba", s: "dog dog dog dog" },
			{ pattern: "a", s: "dog" },
			{ pattern: "ab", s: "dog dog" },
		];

		for (const test of tests) {
			const expected = referenceWordPattern(test.pattern, test.s);
			const result = fn(test.pattern, test.s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordPatternHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordPatternJS = `// Do not edit function name
function wordPattern(pattern, s) {
  // Write your code here
};`;

export const wordPattern: Problem = {
	id: "word-pattern",
	title: "298. Word Pattern",
	problemStatement: `<p class='mt-3'>
    You are given a pattern string <code>pattern</code> and a string <code>s</code> containing words separated by
    single spaces. Determine if <code>s</code> follows the same pattern.
  </p>
  <p class='mt-3'>
    "Follows" here means there is a full bijection (one-to-one mapping in both directions) between each character
    in <code>pattern</code> and each word in <code>s</code>: the same character always maps to the same word, and
    the same word always maps to the same character.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `pattern = "abba", s = "dog cat cat dog"`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `pattern = "abba", s = "dog cat cat fish"`,
			outputText: `false`,
			explanation: "'a' would need to map to both \"dog\" and \"fish\".",
		},
		{
			id: 2,
			inputText: `pattern = "aaaa", s = "dog cat cat dog"`,
			outputText: `false`,
			explanation: "'a' cannot map to more than one distinct word.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= pattern.length <= 300</code></li>
  <li class='mt-2'><code>pattern</code> consists of lowercase English letters.</li>
  <li class='mt-2'><code>1 <= s.length <= 3000</code></li>
  <li class='mt-2'><code>s</code> consists of lowercase English letters and single spaces, with no leading or
    trailing spaces.</li>`,
	starterCode: starterCodeWordPatternJS,
	handlerFunction: wordPatternHandler,
	starterFunctionName: "function wordPattern(",
	order: 298,
};
