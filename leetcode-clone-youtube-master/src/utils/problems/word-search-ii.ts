import assert from "assert";
import { Problem } from "../types/problem";

type TrieNode = { children: Map<string, TrieNode>; word: string | null };

// Reference solution: build a trie of all target words, then DFS from every
// cell, walking the trie in step with the board so shared prefixes are only
// explored once.
function referenceFindWords(inputBoard: string[][], words: string[]): string[] {
	const board = inputBoard.map((row) => [...row]);
	const rows = board.length;
	const cols = board[0].length;
	const found = new Set<string>();

	const root: TrieNode = { children: new Map(), word: null };
	for (const w of words) {
		let node = root;
		for (const ch of w) {
			if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), word: null });
			node = node.children.get(ch)!;
		}
		node.word = w;
	}

	function dfs(r: number, c: number, node: TrieNode) {
		const ch = board[r][c];
		const next = node.children.get(ch);
		if (!next) return;
		if (next.word) found.add(next.word);

		board[r][c] = "#";
		const dirs = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		for (const [dr, dc] of dirs) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== "#") {
				dfs(nr, nc, next);
			}
		}
		board[r][c] = ch;
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			dfs(r, c, root);
		}
	}
	return Array.from(found);
}

function normalize(words: string[]): string[] {
	return [...words].sort();
}

export const wordSearchIiHandler = (fn: any) => {
	try {
		const tests: [string[][], string[]][] = [
			[
				[
					["o", "a", "a", "n"],
					["e", "t", "a", "e"],
					["i", "h", "k", "r"],
					["i", "f", "l", "v"],
				],
				["oath", "pea", "eat", "rain"],
			],
			[
				[
					["a", "b"],
					["c", "d"],
				],
				["abcb"],
			],
			[[["a"]], ["a"]],
			[[["a", "a"]], ["aaa", "aa", "a"]],
			[
				[
					["a", "b", "c"],
					["a", "e", "d"],
					["a", "f", "g"],
				],
				["abcdefg", "gfedcbaaa", "eaabcdgfa", "befa", "dgc", "ade"],
			],
		];

		for (const [board, words] of tests) {
			const expected = normalize(referenceFindWords(board, words));
			const boardCopyForUser = board.map((row) => [...row]);
			const result = normalize(fn(boardCopyForUser, [...words]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordSearchIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordSearchIiJS = `function findWords(board, words) {
  // Write your code here
};`;

export const wordSearchIi: Problem = {
	id: "word-search-ii",
	title: "134. Word Search II",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> grid of characters <code>board</code> and a list of
    strings <code>words</code>. Return all words from <code>words</code> that can be built by
    tracing a path of adjacent cells in the grid.
  </p>
  <p class='mt-3'>
    Cells are adjacent if they are horizontally or vertically next to each other, and the same
    grid cell may not be reused more than once within a single word's path. You may return the
    matching words in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`,
			outputText: `["eat","oath"]`,
		},
		{
			id: 1,
			inputText: `board = [["a","b"],["c","d"]], words = ["abcb"]`,
			outputText: `[]`,
			explanation: "\"abcb\" would need to reuse the cell containing 'b', which isn't allowed.",
		},
		{
			id: 2,
			inputText: `board = [["a"]], words = ["a"]`,
			outputText: `["a"]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= board.length, board[i].length <= 12</code></li>
  <li class='mt-2'><code>board[i][j]</code> is a lowercase English letter.</li>
  <li class='mt-2'><code>1 <= words.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>1 <= words[i].length <= 10</code></li>
  <li class='mt-2'>All strings in <code>words</code> are unique.</li>`,
	starterCode: starterCodeWordSearchIiJS,
	handlerFunction: wordSearchIiHandler,
	starterFunctionName: "function findWords(",
	order: 134,
};
