import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: try to 2-color the graph with BFS; if any edge
// connects two same-colored nodes, it is not bipartite.
function referenceIsBipartite(graph: number[][]): boolean {
	const n = graph.length;
	const colors = new Array(n).fill(0); // 0 = uncolored, 1 or -1 = colors

	for (let start = 0; start < n; start++) {
		if (colors[start] !== 0) continue;
		colors[start] = 1;
		const queue = [start];
		while (queue.length > 0) {
			const node = queue.shift()!;
			for (const neighbor of graph[node]) {
				if (colors[neighbor] === 0) {
					colors[neighbor] = -colors[node];
					queue.push(neighbor);
				} else if (colors[neighbor] === colors[node]) {
					return false;
				}
			}
		}
	}

	return true;
}

export const isGraphBipartiteHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 3],
				[0, 2],
				[0, 1, 3],
				[0, 2],
			],
			[
				[1, 3],
				[0, 2],
				[1, 3],
				[0, 2],
			],
			[[], []],
			[[1], [0]],
			[
				[1, 2],
				[0, 2],
				[0, 1],
			],
			[[]],
		];
		for (const graph of tests) {
			const expected = referenceIsBipartite(graph.map((row) => [...row]));
			const result = fn(graph.map((row) => [...row]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from isGraphBipartiteHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIsGraphBipartiteJS = `function isBipartite(graph) {
  // Write your code here
};`;

export const isGraphBipartite: Problem = {
	id: "is-graph-bipartite",
	title: "178. Is Graph Bipartite",
	problemStatement: `<p class='mt-3'>
    You are given an undirected graph with <code>n</code> nodes labeled <code>0</code> to
    <code>n - 1</code>, represented as an adjacency list <code>graph</code>, where
    <code>graph[u]</code> lists all nodes adjacent to node <code>u</code>. The graph has no
    self-loops or repeated edges.
  </p>
  <p class='mt-3'>
    A graph is <strong>bipartite</strong> if its nodes can be split into two groups such that every
    edge connects a node in one group to a node in the other (no edge connects two nodes in the
    same group). Return <code>true</code> if the graph is bipartite.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]`,
			outputText: `false`,
			explanation: "Node 0 would need to be in a different group from 1, 2, and 3, but 1 and 3 both connect to 2 as well, forcing a contradiction.",
		},
		{
			id: 1,
			inputText: `graph = [[1,3],[0,2],[1,3],[0,2]]`,
			outputText: `true`,
			explanation: "Nodes {0,2} can be one group and {1,3} the other.",
		},
		{
			id: 2,
			inputText: `graph = [[],[]]`,
			outputText: `true`,
			explanation: "With no edges at all, the split is trivially valid.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= graph.length <= 100</code></li>
  <li class='mt-2'>The graph is undirected and has no self-loops or duplicate edges.</li>`,
	starterCode: starterCodeIsGraphBipartiteJS,
	handlerFunction: isGraphBipartiteHandler,
	starterFunctionName: "function isBipartite(",
	order: 178,
};
