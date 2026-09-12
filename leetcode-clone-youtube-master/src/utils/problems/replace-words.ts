import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: for each word, try increasingly long prefixes and
// replace with the first one found in the root dictionary.
function referenceReplaceWords(dictionary: string[], sentence: string): string {
	const roots = new Set(dictionary);
	const words = sentence.split(" ");
	const replaced = words.map((word) => {
		for (let i = 1; i <= word.length; i++) {
			const prefix = word.slice(0, i);
			if (roots.has(prefix)) return prefix;
		}
		return word;
	});
	return replaced.join(" ");
}

export const replaceWordsHandler = (fn: any) => {
	try {
		const tests: [string[], string][] = [
			[["cat", "bat", "rat"], "the cattle was rattled by the battery"],
			[["a", "b", "c"], "aadsfasf absfasf ac aewrb"],
			[["a", "aa", "aaa", "aaaa"], "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"],
			[["catt", "cat", "bat", "rat"], "the cattle was rattled by the battery"],
			[["ac", "ab"], "it is abnormal that this dog is acting like a ac dog"],
			[["a"], "a a a a a a"],
		];

		for (const [dictionary, sentence] of tests) {
			const expected = referenceReplaceWords([...dictionary], sentence);
			const result = fn([...dictionary], sentence);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from replaceWordsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReplaceWordsJS = `function replaceWords(dictionary, sentence) {
  // Write your code here
};`;

export const replaceWords: Problem = {
	id: "replace-words",
	title: "135. Replace Words",
	problemStatement: `<p class='mt-3'>
    In English, a <strong>root</strong> word can have many words built from it by adding a suffix,
    for example the root <code>"help"</code> can form <code>"helped"</code>, <code>"helping"</code>,
    and <code>"helpful"</code>.
  </p>
  <p class='mt-3'>
    You are given a list of root words <code>dictionary</code> and a <code>sentence</code>
    (a string of lowercase words separated by single spaces). For every word in the sentence, if it
    can be formed by adding a suffix onto one of the roots, replace it with the <strong>shortest</strong>
    matching root. If a word matches no root, leave it unchanged.
  </p>
  <p class='mt-3'>
    Return the sentence after all replacements have been made.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"`,
			outputText: `"the cat was rat by the bat"`,
		},
		{
			id: 1,
			inputText: `dictionary = ["a","aa","aaa","aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"`,
			outputText: `"a a a a a a a a bbb baba ababa"`,
			explanation: "Every word starting with 'a' is replaced by the shortest matching root, which is \"a\".",
		},
		{
			id: 2,
			inputText: `dictionary = ["a","b","c"], sentence = "aadsfasf absfasf ac aewrb"`,
			outputText: `"a a a a"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= dictionary.length <= 1000</code></li>
  <li class='mt-2'><code>1 <= dictionary[i].length <= 100</code></li>
  <li class='mt-2'><code>dictionary[i]</code> consists of lowercase English letters.</li>
  <li class='mt-2'><code>1 <= sentence.length <= 10^6</code></li>
  <li class='mt-2'><code>sentence</code> consists of lowercase English letters and single spaces, with no leading or trailing spaces.</li>`,
	starterCode: starterCodeReplaceWordsJS,
	handlerFunction: replaceWordsHandler,
	starterFunctionName: "function replaceWords(",
	order: 135,
};
