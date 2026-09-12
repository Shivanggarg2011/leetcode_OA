import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: repeatedly peel off all current leaves (BFS topological
// trim) until 1 or 2 nodes remain -- those are the centroids that minimize
// the tree's height.
function referenceFindMinHeightTrees(n: number, edges: number[][]): number[] {
	if (n === 1) return [0];

	const adjacency: Set<number>[] = Array.from({ length: n }, () => new Set());
	for (const [a, b] of edges) {
		adjacency[a].add(b);
		adjacency[b].add(a);
	}

	let leaves: number[] = [];
	for (let i = 0; i < n; i++) {
		if (adjacency[i].size === 1) leaves.push(i);
	}

	let remaining = n;
	while (remaining > 2) {
		remaining -= leaves.length;
		const newLeaves: number[] = [];
		for (const leaf of leaves) {
			const [neighbor] = adjacency[leaf];
			adjacency[neighbor].delete(leaf);
			if (adjacency[neighbor].size === 1) newLeaves.push(neighbor);
		}
		leaves = newLeaves;
	}

	return leaves;
}

function normalize(values: number[]): number[] {
	return [...values].sort((a, b) => a - b);
}

export const minimumHeightTreesHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[4, [[1, 0], [1, 2], [1, 3]]],
			[6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]],
			[1, []],
			[2, [[0, 1]]],
			[3, [[0, 1], [1, 2]]],
			[7, [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6]]],
		];
		for (const [n, edges] of tests) {
			const expected = normalize(referenceFindMinHeightTrees(n, edges.map((e) => [...e])));
			const result = normalize(fn(n, edges.map((e) => [...e])));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumHeightTreesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumHeightTreesJS = `function findMinHeightTrees(n, edges) {
  // Write your code here
};`;

export const minimumHeightTrees: Problem = {
	id: "minimum-height-trees",
	title: "179. Minimum Height Trees",
	problemStatement: `<p class='mt-3'>
    A tree is an undirected graph in which any two nodes are connected by exactly one path. You are
    given a tree of <code>n</code> nodes labeled <code>0</code> to <code>n - 1</code> and a list of
    <code>n - 1</code> <code>edges</code>.
  </p>
  <p class='mt-3'>
    For any node, its height is the length of the longest path from it to any other node if that
    node is picked as the root. Return <em>all node values</em> that, when chosen as the root,
    produce a tree of minimum possible height. You may return them in any order (there will be at
    most two such nodes).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4, edges = [[1,0],[1,2],[1,3]]`,
			outputText: `[1]`,
			explanation: "Rooting at node 1 gives height 1, the minimum possible.",
		},
		{
			id: 1,
			inputText: `n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]`,
			outputText: `[3,4]`,
		},
		{
			id: 2,
			inputText: `n = 1, edges = []`,
			outputText: `[0]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 2 * 10^4</code></li>
  <li class='mt-2'><code>edges.length == n - 1</code></li>
  <li class='mt-2'>The given edges always form a valid tree.</li>`,
	starterCode: starterCodeMinimumHeightTreesJS,
	handlerFunction: minimumHeightTreesHandler,
	starterFunctionName: "function findMinHeightTrees(",
	order: 179,
};
