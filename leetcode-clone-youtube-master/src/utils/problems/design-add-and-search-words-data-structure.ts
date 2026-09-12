import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a trie where search() can additionally explore every
// branch when it encounters a '.' wildcard character.
class ReferenceWordNode {
	children: Map<string, ReferenceWordNode> = new Map();
	isEnd = false;
}

class ReferenceWordDictionary {
	root = new ReferenceWordNode();

	addWord(word: string): void {
		let node = this.root;
		for (const ch of word) {
			if (!node.children.has(ch)) node.children.set(ch, new ReferenceWordNode());
			node = node.children.get(ch)!;
		}
		node.isEnd = true;
	}

	search(word: string): boolean {
		const dfs = (node: ReferenceWordNode, i: number): boolean => {
			if (i === word.length) return node.isEnd;
			const ch = word[i];
			if (ch === ".") {
				for (const child of node.children.values()) {
					if (dfs(child, i + 1)) return true;
				}
				return false;
			}
			const child = node.children.get(ch);
			if (!child) return false;
			return dfs(child, i + 1);
		};
		return dfs(this.root, 0);
	}
}

type Op = { op: "addWord" | "search"; arg: string };

export const designAddAndSearchWordsDataStructureHandler = (fn: any) => {
	try {
		const scripts: Op[][] = [
			[
				{ op: "addWord", arg: "bad" },
				{ op: "addWord", arg: "dad" },
				{ op: "addWord", arg: "mad" },
				{ op: "search", arg: "pad" },
				{ op: "search", arg: "bad" },
				{ op: "search", arg: ".ad" },
				{ op: "search", arg: "b.." },
			],
			[
				{ op: "addWord", arg: "a" },
				{ op: "search", arg: "." },
				{ op: "search", arg: "a" },
				{ op: "search", arg: "aa" },
			],
			[
				{ op: "addWord", arg: "at" },
				{ op: "addWord", arg: "and" },
				{ op: "addWord", arg: "an" },
				{ op: "addWord", arg: "add" },
				{ op: "search", arg: "a" },
				{ op: "search", arg: ".at" },
				{ op: "addWord", arg: "bat" },
				{ op: "search", arg: ".at" },
				{ op: "search", arg: "an." },
				{ op: "search", arg: "a.d." },
			],
		];

		for (const script of scripts) {
			const userDict = new fn();
			const refDict = new ReferenceWordDictionary();
			const userResults: any[] = [];
			const refResults: any[] = [];
			for (const step of script) {
				if (step.op === "addWord") {
					userDict.addWord(step.arg);
					refDict.addWord(step.arg);
					userResults.push(undefined);
					refResults.push(undefined);
				} else {
					userResults.push(userDict.search(step.arg));
					refResults.push(refDict.search(step.arg));
				}
			}
			assert.deepStrictEqual(userResults, refResults);
		}
		return true;
	} catch (error: any) {
		console.log("Error from designAddAndSearchWordsDataStructureHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignAddAndSearchWordsDataStructureJS = `class WordDictionary {
  constructor() {
    // Write your code here
  }

  addWord(word) {
    // Write your code here
  }

  search(word) {
    // Write your code here
  }
};`;

export const designAddAndSearchWordsDataStructure: Problem = {
	id: "design-add-and-search-words-data-structure",
	title: "133. Design Add and Search Words Data Structure",
	problemStatement: `<p class='mt-3'>
    Design a data structure that supports adding words and then checking whether a given string
    matches any previously added word, where the search string may contain the special character
    <code>.</code> which can match any single letter.
  </p>
  <p class='mt-3'>
    Implement the <code>WordDictionary</code> class:
  </p>
  <p class='mt-3'>
    <code>addWord(word)</code> adds <code>word</code> to the data structure.
  </p>
  <p class='mt-3'>
    <code>search(word)</code> returns <code>true</code> if there is a previously added string that
    matches <code>word</code>, treating each <code>.</code> in <code>word</code> as a wildcard for
    exactly one character, and <code>false</code> otherwise.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]`,
			outputText: `[null,null,null,null,false,true,true,true]`,
		},
		{
			id: 1,
			inputText: `["WordDictionary","addWord","search","search"]\n[[],["a"],["."],["aa"]]`,
			outputText: `[null,null,true,false]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= word.length <= 25</code></li>
  <li class='mt-2'><code>word</code> in <code>addWord</code> consists of lowercase English letters.</li>
  <li class='mt-2'><code>word</code> in <code>search</code> consists of <code>'.'</code> or lowercase English letters.</li>
  <li class='mt-2'>At most <code>10^4</code> calls will be made to <code>addWord</code> and <code>search</code>.</li>`,
	starterCode: starterCodeDesignAddAndSearchWordsDataStructureJS,
	handlerFunction: designAddAndSearchWordsDataStructureHandler,
	starterFunctionName: "class WordDictionary {",
	order: 133,
};
