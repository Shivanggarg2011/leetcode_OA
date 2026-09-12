import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: union-find, then count distinct root parents.
function referenceCountComponents(n: number, edges: number[][]): number {
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
		if (rootA !== rootB) parent[rootA] = rootB;
	}

	const roots = new Set<number>();
	for (let i = 0; i < n; i++) roots.add(find(i));
	return roots.size;
}

export const numberOfConnectedComponentsInAnUndirectedGraphHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[5, [[0, 1], [1, 2], [3, 4]]],
			[5, [[0, 1], [1, 2], [2, 3], [3, 4]]],
			[1, []],
			[4, []],
			[6, [[0, 1], [2, 3], [4, 5], [1, 2]]],
			[3, [[0, 1], [0, 2], [1, 2]]],
		];
		for (const [n, edges] of tests) {
			const expected = referenceCountComponents(n, edges.map((e) => [...e]));
			const result = fn(n, edges.map((e) => [...e]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from numberOfConnectedComponentsInAnUndirectedGraphHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNumberOfConnectedComponentsInAnUndirectedGraphJS = `function countComponents(n, edges) {
  // Write your code here
};`;

export const numberOfConnectedComponentsInAnUndirectedGraph: Problem = {
	id: "number-of-connected-components-in-an-undirected-graph",
	title: "172. Number of Connected Components in an Undirected Graph",
	problemStatement: `<p class='mt-3'>
    You are given an integer <code>n</code> and a list <code>edges</code> where
    <code>edges[i] = [a, b]</code> represents an <strong>undirected</strong> edge between nodes
    <code>a</code> and <code>b</code>, using nodes labeled <code>0</code> to <code>n - 1</code>.
  </p>
  <p class='mt-3'>
    Return <em>the number of connected components</em> in the graph.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 5, edges = [[0,1],[1,2],[3,4]]`,
			outputText: `2`,
			explanation: "Nodes 0, 1, 2 form one component; nodes 3, 4 form another.",
		},
		{
			id: 1,
			inputText: `n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `n = 4, edges = []`,
			outputText: `4`,
			explanation: "With no edges, every node is its own component.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 2000</code></li>
  <li class='mt-2'><code>0 <= edges.length <= 5000</code></li>
  <li class='mt-2'>There are no self-loops or repeated edges.</li>`,
	starterCode: starterCodeNumberOfConnectedComponentsInAnUndirectedGraphJS,
	handlerFunction: numberOfConnectedComponentsInAnUndirectedGraphHandler,
	starterFunctionName: "function countComponents(",
	order: 172,
};
