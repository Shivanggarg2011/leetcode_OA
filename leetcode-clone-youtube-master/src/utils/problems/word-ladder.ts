import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: BFS over the word graph, where two words are
// connected if they differ by exactly one letter.
function referenceLadderLength(beginWord: string, endWord: string, wordList: string[]): number {
	const wordSet = new Set(wordList);
	if (!wordSet.has(endWord)) return 0;

	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const queue: [string, number][] = [[beginWord, 1]];
	const visited = new Set<string>([beginWord]);

	while (queue.length > 0) {
		const [word, steps] = queue.shift()!;
		if (word === endWord) return steps;

		for (let i = 0; i < word.length; i++) {
			for (const letter of alphabet) {
				if (letter === word[i]) continue;
				const candidate = word.slice(0, i) + letter + word.slice(i + 1);
				if (wordSet.has(candidate) && !visited.has(candidate)) {
					visited.add(candidate);
					queue.push([candidate, steps + 1]);
				}
			}
		}
	}

	return 0;
}

export const wordLadderHandler = (fn: any) => {
	try {
		const tests: [string, string, string[]][] = [
			["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
			["hit", "cog", ["hot", "dot", "dog", "lot", "log"]],
			["a", "c", ["a", "b", "c"]],
			["hot", "dog", ["hot", "dog"]],
			["cat", "cat", ["cat"]],
			["hit", "hot", ["hot"]],
		];
		for (const [beginWord, endWord, wordList] of tests) {
			const expected = referenceLadderLength(beginWord, endWord, [...wordList]);
			const result = fn(beginWord, endWord, [...wordList]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordLadderHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordLadderJS = `function ladderLength(beginWord, endWord, wordList) {
  // Write your code here
};`;

export const wordLadder: Problem = {
	id: "word-ladder",
	title: "174. Word Ladder",
	problemStatement: `<p class='mt-3'>
    You are given two words, <code>beginWord</code> and <code>endWord</code>, and a
    <code>wordList</code> of allowed words. A <strong>transformation sequence</strong> starts at
    <code>beginWord</code>, changes exactly one letter at a time to produce a new word, and each
    intermediate word (including the final one) must appear in <code>wordList</code>.
    <code>beginWord</code> does not need to be in <code>wordList</code>.
  </p>
  <p class='mt-3'>
    Return <em>the number of words</em> in the shortest transformation sequence from
    <code>beginWord</code> to <code>endWord</code>, or <code>0</code> if no such sequence exists.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]`,
			outputText: `5`,
			explanation: `One shortest sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which has 5 words.`,
		},
		{
			id: 1,
			inputText: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]`,
			outputText: `0`,
			explanation: `"cog" is not in wordList, so it can never be reached.`,
		},
		{
			id: 2,
			inputText: `beginWord = "a", endWord = "c", wordList = ["a","b","c"]`,
			outputText: `3`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= beginWord.length <= 10</code>, all words have the same length.</li>
  <li class='mt-2'><code>1 <= wordList.length <= 5000</code></li>
  <li class='mt-2'><code>beginWord != endWord</code> and all words in <code>wordList</code> are distinct.</li>
  <li class='mt-2'>All words consist of lowercase English letters.</li>`,
	starterCode: starterCodeWordLadderJS,
	handlerFunction: wordLadderHandler,
	starterFunctionName: "function ladderLength(",
	order: 174,
};
