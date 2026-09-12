import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a graph with n nodes is a tree iff it is connected and
// has exactly n - 1 edges (using union-find to both detect cycles and check
// connectivity in one pass).
function referenceValidTree(n: number, edges: number[][]): boolean {
	if (edges.length !== n - 1) return false;

	const parent = Array.from({ length: n }, (_, i) => i);

	function find(x: number): number {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x]];
			x = parent[x];
		}
		return x;
	}

	for (const [a, b] of edges) {
		const rootA = find(a);
		const rootB = find(b);
		if (rootA === rootB) return false;
		parent[rootA] = rootB;
	}

	return true;
}

export const graphValidTreeHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[5, [[0, 1], [0, 2], [0, 3], [1, 4]]],
			[5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]],
			[1, []],
			[2, [[0, 1]]],
			[4, [[0, 1], [2, 3]]],
			[4, [[0, 1], [1, 2], [2, 3], [3, 0]]],
		];
		for (const [n, edges] of tests) {
			const expected = referenceValidTree(n, edges.map((e) => [...e]));
			const result = fn(n, edges.map((e) => [...e]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from graphValidTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGraphValidTreeJS = `function validTree(n, edges) {
  // Write your code here
};`;

export const graphValidTree: Problem = {
	id: "graph-valid-tree",
	title: "171. Graph Valid Tree",
	problemStatement: `<p class='mt-3'>
    You are given an integer <code>n</code> and a list <code>edges</code> where
    <code>edges[i] = [a, b]</code> represents an <strong>undirected</strong> edge between nodes
    <code>a</code> and <code>b</code>, using nodes labeled <code>0</code> to <code>n - 1</code>.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if these edges form a <strong>valid tree</strong> -- meaning every
    node is reachable from every other node, and there are no cycles.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]`,
			outputText: `false`,
			explanation: "Nodes 1, 2, and 3 form a cycle.",
		},
		{
			id: 2,
			inputText: `n = 4, edges = [[0,1],[2,3]]`,
			outputText: `false`,
			explanation: "The graph is not fully connected -- there are two separate components.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 2000</code></li>
  <li class='mt-2'><code>0 <= edges.length <= 5000</code></li>
  <li class='mt-2'><code>edges[i].length == 2</code> and there are no self-loops or repeated edges.</li>`,
	starterCode: starterCodeGraphValidTreeJS,
	handlerFunction: graphValidTreeHandler,
	starterFunctionName: "function validTree(",
	order: 171,
};
