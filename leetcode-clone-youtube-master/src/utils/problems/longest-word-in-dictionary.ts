import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a word qualifies only if every prefix of it (built up
// one letter at a time) is also present in the word list.
function referenceLongestWord(words: string[]): string {
	const wordSet = new Set(words);
	let best = "";
	for (const word of words) {
		let valid = true;
		for (let i = 1; i < word.length; i++) {
			if (!wordSet.has(word.slice(0, i))) {
				valid = false;
				break;
			}
		}
		if (valid) {
			if (word.length > best.length || (word.length === best.length && word < best)) {
				best = word;
			}
		}
	}
	return best;
}

export const longestWordInDictionaryHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["w", "wo", "wor", "worl", "world"],
			["a", "banana", "app", "appl", "ap", "apply", "apple"],
			["yo", "ew", "fc", "zrc", "yodn", "fcm", "qm", "qmo", "fcmz", "z", "ewq", "yod", "ewqz", "y"],
			["abc"],
			["a", "ab", "abc", "abcd", "abcde", "abcdf"],
			["rac", "rats", "ra", "raced"],
		];

		for (const words of tests) {
			const expected = referenceLongestWord([...words]);
			const result = fn([...words]);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestWordInDictionaryHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestWordInDictionaryJS = `function longestWord(words) {
  // Write your code here
};`;

export const longestWordInDictionary: Problem = {
	id: "longest-word-in-dictionary",
	title: "136. Longest Word in Dictionary",
	problemStatement: `<p class='mt-3'>
    Given an array of strings <code>words</code>, find the longest word that can be built one
    character at a time by other words in <code>words</code>. A word <code>w</code> qualifies only
    if every one of its non-empty prefixes is also present somewhere in <code>words</code>.
  </p>
  <p class='mt-3'>
    Return the longest qualifying word. If more than one word has the same (longest) length,
    return the one that is lexicographically smallest. If no word qualifies, return an empty
    string <code>""</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `words = ["w","wo","wor","worl","world"]`,
			outputText: `"world"`,
			explanation: "Each prefix \"w\", \"wo\", \"wor\", \"worl\" is also in the list, so \"world\" qualifies.",
		},
		{
			id: 1,
			inputText: `words = ["a","banana","app","appl","ap","apply","apple"]`,
			outputText: `"apple"`,
			explanation: "Both \"apply\" and \"apple\" have every prefix present and share the longest length; \"apple\" is lexicographically smaller.",
		},
		{
			id: 2,
			inputText: `words = ["abc"]`,
			outputText: `""`,
			explanation: "\"abc\" requires \"a\" and \"ab\" to be present, but they are not.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= words.length <= 1000</code></li>
  <li class='mt-2'><code>1 <= words[i].length <= 30</code></li>
  <li class='mt-2'><code>words[i]</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodeLongestWordInDictionaryJS,
	handlerFunction: longestWordInDictionaryHandler,
	starterFunctionName: "function longestWord(",
	order: 136,
};
