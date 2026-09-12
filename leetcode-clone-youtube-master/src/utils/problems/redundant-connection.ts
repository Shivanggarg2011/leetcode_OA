import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: process edges in order with union-find; the first edge
// that connects two nodes already in the same component is the redundant
// one (guaranteed unique and well-defined by the problem's constraints).
function referenceFindRedundantConnection(edges: number[][]): number[] {
	const n = edges.length;
	const parent = Array.from({ length: n + 1 }, (_, i) => i);

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
		if (rootA === rootB) return [a, b];
		parent[rootA] = rootB;
	}

	return [];
}

export const redundantConnectionHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[1, 2], [1, 3], [2, 3]],
			[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]],
			[[1, 2], [1, 3], [1, 4], [1, 5], [2, 3]],
			[[1, 2], [2, 3], [1, 3]],
			[[1, 4], [3, 4], [1, 3], [1, 2]],
		];
		for (const edges of tests) {
			const expected = referenceFindRedundantConnection(edges.map((e) => [...e]));
			const result = fn(edges.map((e) => [...e]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from redundantConnectionHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRedundantConnectionJS = `function findRedundantConnection(edges) {
  // Write your code here
};`;

export const redundantConnection: Problem = {
	id: "redundant-connection",
	title: "173. Redundant Connection",
	problemStatement: `<p class='mt-3'>
    A tree with <code>n</code> nodes labeled <code>1</code> to <code>n</code> has exactly
    <code>n - 1</code> edges connecting every node. You are given <code>edges</code>, a list of
    <code>n</code> undirected edges (one more than a tree needs) where
    <code>edges[i] = [a, b]</code>. Adding this extra edge to an otherwise valid tree created
    exactly one cycle.
  </p>
  <p class='mt-3'>
    Return <em>the edge that can be removed</em> so that the remaining edges form a tree on all
    <code>n</code> nodes. If several edges could be removed, return the one that occurs
    <strong>last</strong> in the input array <code>edges</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `edges = [[1,2],[1,3],[2,3]]`,
			outputText: `[2,3]`,
			explanation: "Removing [2,3] leaves a valid tree; it is also the last edge that closes a cycle.",
		},
		{
			id: 1,
			inputText: `edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]`,
			outputText: `[1,4]`,
		},
		{
			id: 2,
			inputText: `edges = [[1,2],[1,3],[1,4],[1,5],[2,3]]`,
			outputText: `[2,3]`,
		},
	],
	constraints: `<li class='mt-2'><code>n == edges.length</code>, <code>3 <= n <= 1000</code></li>
  <li class='mt-2'><code>edges[i].length == 2</code></li>
  <li class='mt-2'><code>1 <= a, b <= n</code></li>`,
	starterCode: starterCodeRedundantConnectionJS,
	handlerFunction: redundantConnectionHandler,
	starterFunctionName: "function findRedundantConnection(",
	order: 173,
};
