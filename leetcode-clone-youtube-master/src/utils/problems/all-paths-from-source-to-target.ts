import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: DFS backtracking from node 0 to node n - 1.
function referenceAllPathsSourceTarget(graph: number[][]): number[][] {
	const n = graph.length;
	const result: number[][] = [];
	const path: number[] = [0];

	function dfs(node: number) {
		if (node === n - 1) {
			result.push([...path]);
			return;
		}
		for (const next of graph[node]) {
			path.push(next);
			dfs(next);
			path.pop();
		}
	}

	dfs(0);
	return result;
}

// Order of the paths in the output doesn't matter, so normalize by sorting.
function normalizePaths(paths: number[][]): string[] {
	return paths.map((p) => p.join(",")).sort();
}

export const allPathsFromSourceToTargetHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[1, 2], [3], [3], []],
			[[4, 3, 1], [3, 2, 4], [3], [4], []],
			[[1], []],
			[[1, 2, 3], [2], [3], []],
			[[]],
		];
		for (const graph of tests) {
			const expected = normalizePaths(referenceAllPathsSourceTarget(graph));
			const result = normalizePaths(fn(graph));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from allPathsFromSourceToTargetHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeAllPathsFromSourceToTargetJS = `function allPathsSourceTarget(graph) {
  // Write your code here
};`;

export const allPathsFromSourceToTarget: Problem = {
	id: "all-paths-from-source-to-target",
	title: "180. All Paths From Source to Target",
	problemStatement: `<p class='mt-3'>
    You are given a directed acyclic graph (DAG) of <code>n</code> nodes labeled from <code>0</code>
    to <code>n - 1</code>, given as a 2D array <code>graph</code>, where <code>graph[i]</code> is a
    list of every node <code>j</code> for which there is a directed edge <code>i -> j</code>.
  </p>
  <p class='mt-3'>
    Return <em>all possible paths</em> from node <code>0</code> to node <code>n - 1</code>. Each path
    should be returned as an array of the node labels visited, in order. You may return the paths in
    any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `graph = [[1,2],[3],[3],[]]`,
			outputText: `[[0,1,3],[0,2,3]]`,
			explanation: "There are two paths from node 0 to node 3: 0->1->3 and 0->2->3.",
		},
		{
			id: 1,
			inputText: `graph = [[4,3,1],[3,2,4],[3],[4],[]]`,
			outputText: `[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]`,
		},
		{
			id: 2,
			inputText: `graph = [[1],[]]`,
			outputText: `[[0,1]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= graph.length <= 15</code></li>
  <li class='mt-2'><code>0 <= graph[i][j] < graph.length</code></li>
  <li class='mt-2'>All the elements of <code>graph[i]</code> are unique.</li>
  <li class='mt-2'>The input graph is guaranteed to have no cycles (it is a DAG).</li>`,
	starterCode: starterCodeAllPathsFromSourceToTargetJS,
	handlerFunction: allPathsFromSourceToTargetHandler,
	starterFunctionName: "function allPathsSourceTarget(",
	order: 180,
};
