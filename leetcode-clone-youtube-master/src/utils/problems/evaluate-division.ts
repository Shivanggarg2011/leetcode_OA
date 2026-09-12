import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: build a weighted graph (a -> b with weight a/b) and,
// for each query, DFS from the numerator to the denominator multiplying
// edge weights along the way.
function referenceCalcEquation(
	equations: string[][],
	values: number[],
	queries: string[][]
): number[] {
	const graph = new Map<string, Map<string, number>>();

	function addEdge(a: string, b: string, weight: number) {
		if (!graph.has(a)) graph.set(a, new Map());
		graph.get(a)!.set(b, weight);
	}

	equations.forEach(([a, b], i) => {
		addEdge(a, b, values[i]);
		addEdge(b, a, 1 / values[i]);
	});

	function dfs(current: string, target: string, visited: Set<string>): number {
		if (!graph.has(current)) return -1;
		if (current === target) return 1;
		visited.add(current);
		for (const [neighbor, weight] of graph.get(current)!) {
			if (visited.has(neighbor)) continue;
			const rest = dfs(neighbor, target, visited);
			if (rest !== -1) return weight * rest;
		}
		return -1;
	}

	return queries.map(([a, b]) => {
		if (!graph.has(a) || !graph.has(b)) return -1;
		return dfs(a, b, new Set());
	});
}

function resultsCloseEnough(a: number[], b: number[]): boolean {
	if (!Array.isArray(a) || a.length !== b.length) return false;
	return a.every((value, i) => Math.abs(value - b[i]) < 1e-4);
}

export const evaluateDivisionHandler = (fn: any) => {
	try {
		const tests: [string[][], number[], string[][]][] = [
			[
				[["a", "b"], ["b", "c"]],
				[2.0, 3.0],
				[["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]],
			],
			[
				[["a", "b"], ["b", "c"], ["bc", "cd"]],
				[1.5, 2.5, 5.0],
				[["a", "c"], ["c", "b"], ["bc", "cd"], ["cd", "bc"]],
			],
			[[["a", "b"]], [0.5], [["a", "b"], ["b", "a"], ["a", "c"]]],
			[
				[["x1", "x2"], ["x2", "x3"], ["x3", "x4"], ["x4", "x5"]],
				[3.0, 4.0, 5.0, 6.0],
				[["x1", "x5"], ["x5", "x2"], ["x2", "x4"], ["x1", "x1"], ["x9", "x9"]],
			],
		];
		for (const [equations, values, queries] of tests) {
			const expected = referenceCalcEquation(
				equations.map((e) => [...e]),
				[...values],
				queries.map((q) => [...q])
			);
			const result = fn(
				equations.map((e) => [...e]),
				[...values],
				queries.map((q) => [...q])
			);
			assert.ok(
				resultsCloseEnough(result, expected),
				`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`
			);
		}
		return true;
	} catch (error: any) {
		console.log("Error from evaluateDivisionHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeEvaluateDivisionJS = `function calcEquation(equations, values, queries) {
  // Write your code here
};`;

export const evaluateDivision: Problem = {
	id: "evaluate-division",
	title: "177. Evaluate Division",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>equations</code> where <code>equations[i] = [A, B]</code> and a
    matching array <code>values</code> where <code>values[i]</code> represents the known result of
    <code>A / B</code>.
  </p>
  <p class='mt-3'>
    You are also given an array of <code>queries</code>, where <code>queries[j] = [C, D]</code>
    asks for the value of <code>C / D</code>. Return an array of answers, one per query. If a
    query cannot be determined from the given equations, its answer should be <code>-1.0</code>.
    Variables that never appear in <code>equations</code> are treated as unknown.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]`,
			outputText: `[6.0,0.5,-1.0,1.0,-1.0]`,
			explanation: "a/c = (a/b) * (b/c) = 2.0 * 3.0 = 6.0, while e and x never appear in any equation.",
		},
		{
			id: 1,
			inputText: `equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"]]`,
			outputText: `[0.5,2.0,-1.0]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= equations.length <= 20</code></li>
  <li class='mt-2'><code>values[i]</code> is a positive real number.</li>
  <li class='mt-2'><code>1 <= queries.length <= 20</code></li>`,
	starterCode: starterCodeEvaluateDivisionJS,
	handlerFunction: evaluateDivisionHandler,
	starterFunctionName: "function calcEquation(",
	order: 177,
};
