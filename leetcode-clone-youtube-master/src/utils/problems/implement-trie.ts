import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a straightforward trie (prefix tree) implementation.
class ReferenceTrieNode {
	children: Map<string, ReferenceTrieNode> = new Map();
	isEnd = false;
}

class ReferenceTrie {
	root = new ReferenceTrieNode();

	insert(word: string): void {
		let node = this.root;
		for (const ch of word) {
			if (!node.children.has(ch)) node.children.set(ch, new ReferenceTrieNode());
			node = node.children.get(ch)!;
		}
		node.isEnd = true;
	}

	search(word: string): boolean {
		let node = this.root;
		for (const ch of word) {
			const next = node.children.get(ch);
			if (!next) return false;
			node = next;
		}
		return node.isEnd;
	}

	startsWith(prefix: string): boolean {
		let node = this.root;
		for (const ch of prefix) {
			const next = node.children.get(ch);
			if (!next) return false;
			node = next;
		}
		return true;
	}
}

type Op = { op: "insert" | "search" | "startsWith"; arg: string };

export const implementTrieHandler = (fn: any) => {
	try {
		const scripts: Op[][] = [
			[
				{ op: "insert", arg: "apple" },
				{ op: "search", arg: "apple" },
				{ op: "search", arg: "app" },
				{ op: "startsWith", arg: "app" },
				{ op: "insert", arg: "app" },
				{ op: "search", arg: "app" },
			],
			[
				{ op: "insert", arg: "a" },
				{ op: "search", arg: "a" },
				{ op: "search", arg: "" },
				{ op: "startsWith", arg: "" },
			],
			[
				{ op: "insert", arg: "banana" },
				{ op: "insert", arg: "band" },
				{ op: "search", arg: "ban" },
				{ op: "startsWith", arg: "ban" },
				{ op: "startsWith", arg: "bana" },
				{ op: "search", arg: "banana" },
			],
			[
				{ op: "insert", arg: "cat" },
				{ op: "insert", arg: "car" },
				{ op: "insert", arg: "cart" },
				{ op: "search", arg: "car" },
				{ op: "search", arg: "care" },
				{ op: "startsWith", arg: "car" },
				{ op: "startsWith", arg: "cx" },
			],
		];

		for (const script of scripts) {
			const userTrie = new fn();
			const refTrie = new ReferenceTrie();
			const userResults: any[] = [];
			const refResults: any[] = [];
			for (const step of script) {
				if (step.op === "insert") {
					userTrie.insert(step.arg);
					refTrie.insert(step.arg);
					userResults.push(undefined);
					refResults.push(undefined);
				} else if (step.op === "search") {
					userResults.push(userTrie.search(step.arg));
					refResults.push(refTrie.search(step.arg));
				} else {
					userResults.push(userTrie.startsWith(step.arg));
					refResults.push(refTrie.startsWith(step.arg));
				}
			}
			assert.deepStrictEqual(userResults, refResults);
		}
		return true;
	} catch (error: any) {
		console.log("Error from implementTrieHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeImplementTrieJS = `class Trie {
  constructor() {
    // Write your code here
  }

  insert(word) {
    // Write your code here
  }

  search(word) {
    // Write your code here
  }

  startsWith(prefix) {
    // Write your code here
  }
};`;

export const implementTrie: Problem = {
	id: "implement-trie",
	title: "132. Implement Trie (Prefix Tree)",
	problemStatement: `<p class='mt-3'>
    A <strong>trie</strong> (pronounced "try", also called a prefix tree) stores a set of strings
    so that words sharing a common prefix share the same path through the structure. Implement the
    <code>Trie</code> class with the following methods:
  </p>
  <p class='mt-3'>
    <code>insert(word)</code> adds the string <code>word</code> to the trie.
  </p>
  <p class='mt-3'>
    <code>search(word)</code> returns <code>true</code> if <code>word</code> was previously
    inserted (as a complete word), and <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    <code>startsWith(prefix)</code> returns <code>true</code> if some previously inserted word
    begins with <code>prefix</code>, and <code>false</code> otherwise.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]`,
			outputText: `[null, null, true, false, true, null, true]`,
			explanation: "After inserting \"apple\", searching \"app\" fails but startsWith(\"app\") succeeds. Inserting \"app\" then makes search(\"app\") true.",
		},
		{
			id: 1,
			inputText: `["Trie", "insert", "search", "startsWith"]\n[[], ["a"], [""], [""]]`,
			outputText: `[null, null, false, true]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= word.length, prefix.length <= 2000</code></li>
  <li class='mt-2'><code>word</code> and <code>prefix</code> consist of lowercase English letters.</li>
  <li class='mt-2'>At most <code>3 * 10^4</code> calls in total will be made to <code>insert</code>, <code>search</code>, and <code>startsWith</code>.</li>`,
	starterCode: starterCodeImplementTrieJS,
	handlerFunction: implementTrieHandler,
	starterFunctionName: "class Trie {",
	order: 132,
};
