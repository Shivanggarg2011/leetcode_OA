import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: BFS layer by layer to find the shortest distance and
// record each word's parents at that shortest distance, then DFS backward
// from endWord through parent links to reconstruct every shortest path.
function referenceFindLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const wordSet = new Set(wordList);
	if (!wordSet.has(endWord)) return [];

	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const parents = new Map<string, string[]>();
	let currentLevel = new Set<string>([beginWord]);
	const visited = new Set<string>([beginWord]);
	let found = false;

	while (currentLevel.size > 0 && !found) {
		const nextLevel = new Set<string>();
		const toVisitThisRound = new Set<string>();

		for (const word of currentLevel) {
			for (let i = 0; i < word.length; i++) {
				for (const letter of alphabet) {
					if (letter === word[i]) continue;
					const candidate = word.slice(0, i) + letter + word.slice(i + 1);
					if (!wordSet.has(candidate) || visited.has(candidate)) continue;

					if (candidate === endWord) found = true;
					nextLevel.add(candidate);
					toVisitThisRound.add(candidate);
					if (!parents.has(candidate)) parents.set(candidate, []);
					parents.get(candidate)!.push(word);
				}
			}
		}

		for (const word of toVisitThisRound) visited.add(word);
		currentLevel = nextLevel;
	}

	if (!found) return [];

	const results: string[][] = [];
	const path: string[] = [endWord];

	function backtrack(word: string) {
		if (word === beginWord) {
			results.push([...path].reverse());
			return;
		}
		for (const parent of parents.get(word) ?? []) {
			path.push(parent);
			backtrack(parent);
			path.pop();
		}
	}

	backtrack(endWord);
	return results;
}

function normalize(sequences: string[][]): string[] {
	return sequences.map((seq) => seq.join(",")).sort();
}

export const wordLadderIiHandler = (fn: any) => {
	try {
		const tests: [string, string, string[]][] = [
			["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
			["hit", "cog", ["hot", "dot", "dog", "lot", "log"]],
			["a", "c", ["a", "b", "c"]],
			["red", "tax", ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]],
			["hot", "dog", ["hot", "dog"]],
		];
		for (const [beginWord, endWord, wordList] of tests) {
			const expected = normalize(referenceFindLadders(beginWord, endWord, [...wordList]));
			const result = normalize(fn(beginWord, endWord, [...wordList]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordLadderIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordLadderIiJS = `function findLadders(beginWord, endWord, wordList) {
  // Write your code here
};`;

export const wordLadderIi: Problem = {
	id: "word-ladder-ii",
	title: "175. Word Ladder II",
	problemStatement: `<p class='mt-3'>
    You are given two words, <code>beginWord</code> and <code>endWord</code>, and a
    <code>wordList</code> of allowed words. A <strong>transformation sequence</strong> starts at
    <code>beginWord</code>, changes exactly one letter at a time to produce a new word, and each
    intermediate word (including the final one) must appear in <code>wordList</code>.
    <code>beginWord</code> does not need to be in <code>wordList</code>.
  </p>
  <p class='mt-3'>
    Return <em>every shortest transformation sequence</em> from <code>beginWord</code> to
    <code>endWord</code>, where each sequence is an array of words from <code>beginWord</code> to
    <code>endWord</code> inclusive. If no such sequence exists, return an empty array. You may
    return the sequences in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]`,
			outputText: `[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]`,
		},
		{
			id: 1,
			inputText: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]`,
			outputText: `[]`,
			explanation: `"cog" is not in wordList, so it can never be reached.`,
		},
		{
			id: 2,
			inputText: `beginWord = "a", endWord = "c", wordList = ["a","b","c"]`,
			outputText: `[["a","b","c"]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= beginWord.length <= 7</code>, all words have the same length.</li>
  <li class='mt-2'><code>1 <= wordList.length <= 500</code></li>
  <li class='mt-2'><code>beginWord != endWord</code> and all words in <code>wordList</code> are distinct.</li>
  <li class='mt-2'>All words consist of lowercase English letters.</li>`,
	starterCode: starterCodeWordLadderIiJS,
	handlerFunction: wordLadderIiHandler,
	starterFunctionName: "function findLadders(",
	order: 175,
};
