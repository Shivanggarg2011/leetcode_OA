import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Dijkstra-style search that maximizes path probability
// (product of edge weights) instead of minimizing a sum.
function referenceMaxProbability(
	n: number,
	edges: number[][],
	succProb: number[],
	start: number,
	end: number
): number {
	const graph = new Map<number, [number, number][]>();
	for (let i = 0; i < n; i++) graph.set(i, []);
	for (let i = 0; i < edges.length; i++) {
		const [u, v] = edges[i];
		const p = succProb[i];
		graph.get(u)!.push([v, p]);
		graph.get(v)!.push([u, p]);
	}

	const prob = new Array(n).fill(0);
	prob[start] = 1;
	const visited = new Array(n).fill(false);

	for (let iter = 0; iter < n; iter++) {
		let u = -1;
		for (let i = 0; i < n; i++) {
			if (!visited[i] && (u === -1 || prob[i] > prob[u])) u = i;
		}
		if (u === -1 || prob[u] === 0) break;
		visited[u] = true;
		for (const [v, p] of graph.get(u)!) {
			if (prob[u] * p > prob[v]) prob[v] = prob[u] * p;
		}
	}

	return prob[end];
}

export const pathWithMaximumProbabilityHandler = (fn: any) => {
	try {
		const tests: [number, number[][], number[], number, number][] = [
			[3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2],
			[3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.3], 0, 2],
			[3, [[0, 1]], [0.5], 0, 2],
			[5, [[0, 1], [1, 2], [2, 3], [3, 4]], [0.9, 0.9, 0.9, 0.9], 0, 4],
			[2, [[0, 1]], [1], 0, 1],
		];
		for (const [n, edges, succProb, start, end] of tests) {
			const expected = referenceMaxProbability(n, edges, succProb, start, end);
			const result = fn(n, edges, succProb, start, end);
			assert.ok(
				Math.abs(result - expected) < 1e-5,
				`expected ~${expected} but got ${result}`
			);
		}
		return true;
	} catch (error: any) {
		console.log("Error from pathWithMaximumProbabilityHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePathWithMaximumProbabilityJS = `function maxProbability(n, edges, succProb, start, end) {
  // Write your code here
};`;

export const pathWithMaximumProbability: Problem = {
	id: "path-with-maximum-probability",
	title: "187. Path with Maximum Probability",
	problemStatement: `<p class='mt-3'>
    You are given an undirected weighted graph of <code>n</code> nodes (numbered <code>0</code> to
    <code>n - 1</code>), described by <code>edges</code>, where <code>edges[i] = [a, b]</code> is an
    undirected edge connecting nodes <code>a</code> and <code>b</code> with a success probability of
    traversal given by <code>succProb[i]</code>.
  </p>
  <p class='mt-3'>
    Given <code>start</code> and <code>end</code> nodes, return the maximum probability of a path
    from <code>start</code> to <code>end</code>. The probability of a path is the product of the
    probabilities of its edges. If there is no path, return <code>0</code>. Answers within
    <code>10^-5</code> of the correct answer are accepted.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2`,
			outputText: `0.25`,
			explanation: "The path 0 -> 1 -> 2 has probability 0.5 * 0.5 = 0.25, better than the direct edge (0.2).",
		},
		{
			id: 1,
			inputText: `n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2`,
			outputText: `0`,
			explanation: "There is no path from 0 to 2.",
		},
	],
	constraints: `<li class='mt-2'><code>2 <= n <= 10^4</code></li>
  <li class='mt-2'><code>0 <= edges.length <= 2 * 10^4</code></li>
  <li class='mt-2'><code>0 <= a, b < n</code>, and <code>a != b</code></li>
  <li class='mt-2'><code>0 <= succProb[i] <= 1</code></li>
  <li class='mt-2'><code>0 <= start, end < n</code></li>`,
	starterCode: starterCodePathWithMaximumProbabilityJS,
	handlerFunction: pathWithMaximumProbabilityHandler,
	starterFunctionName: "function maxProbability(",
	order: 187,
};
