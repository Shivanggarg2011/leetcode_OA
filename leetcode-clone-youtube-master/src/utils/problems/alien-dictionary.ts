import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: build a precedence graph from adjacent words, then
// topologically sort the letters via DFS post-order.
function referenceAlienOrder(words: string[]): string {
	const adj = new Map<string, Set<string>>();
	for (const w of words) {
		for (const ch of w) {
			if (!adj.has(ch)) adj.set(ch, new Set());
		}
	}

	for (let i = 0; i < words.length - 1; i++) {
		const w1 = words[i];
		const w2 = words[i + 1];
		const minLen = Math.min(w1.length, w2.length);
		let foundDiff = false;
		for (let j = 0; j < minLen; j++) {
			if (w1[j] !== w2[j]) {
				adj.get(w1[j])!.add(w2[j]);
				foundDiff = true;
				break;
			}
		}
		if (!foundDiff && w1.length > w2.length) return "";
	}

	const visited = new Map<string, number>(); // 0/undefined = unvisited, 1 = visiting, 2 = done
	const result: string[] = [];
	let hasCycle = false;

	function dfs(c: string) {
		if (hasCycle) return;
		visited.set(c, 1);
		for (const nei of adj.get(c)!) {
			if (visited.get(nei) === 1) {
				hasCycle = true;
				return;
			}
			if (!visited.get(nei)) {
				dfs(nei);
				if (hasCycle) return;
			}
		}
		visited.set(c, 2);
		result.push(c);
	}

	for (const c of adj.keys()) {
		if (!visited.get(c)) dfs(c);
		if (hasCycle) return "";
	}

	return result.reverse().join("");
}

export const alienDictionaryHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["wrt", "wrf", "er", "ett", "rftt"],
			["z", "x"],
			["z", "x", "z"],
			["abc", "ab"],
			["a", "b", "ca"],
			["a"],
		];
		for (const words of tests) {
			const expected = referenceAlienOrder(words);
			const result = fn([...words]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from alienDictionaryHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeAlienDictionaryJS = `function alienOrder(words) {
  // Write your code here
};`;

export const alienDictionary: Problem = {
	id: "alien-dictionary",
	title: "185. Alien Dictionary",
	problemStatement: `<p class='mt-3'>
    There is a new alien language that uses the English alphabet, but the order among the letters is
    unknown. You are given a list of <code>words</code> from this language's dictionary, where the
    words are sorted lexicographically according to the rules of this new language.
  </p>
  <p class='mt-3'>
    Derive one valid ordering of the letters in this language based on the given words, and return it
    as a string with no separators. If the given <code>words</code> are not a valid sort under any
    possible letter ordering (including a word appearing before a proper prefix of itself, or a cyclic
    contradiction), return an empty string <code>""</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `words = ["wrt","wrf","er","ett","rftt"]`,
			outputText: `"wertf"`,
		},
		{
			id: 1,
			inputText: `words = ["z","x"]`,
			outputText: `"zx"`,
		},
		{
			id: 2,
			inputText: `words = ["z","x","z"]`,
			outputText: `""`,
			explanation: "z must come before x (from 'z','x'), and x must come before z (from 'x','z') — a contradiction.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= words.length <= 100</code></li>
  <li class='mt-2'><code>1 <= words[i].length <= 100</code></li>
  <li class='mt-2'><code>words[i]</code> consists only of lowercase English letters.</li>`,
	starterCode: starterCodeAlienDictionaryJS,
	handlerFunction: alienDictionaryHandler,
	starterFunctionName: "function alienOrder(",
	order: 185,
};
