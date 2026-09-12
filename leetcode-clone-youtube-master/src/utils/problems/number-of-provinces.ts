import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count connected components via DFS over the adjacency matrix.
function referenceFindCircleNum(isConnected: number[][]): number {
	const n = isConnected.length;
	const visited = new Array(n).fill(false);
	let count = 0;

	function dfs(i: number) {
		visited[i] = true;
		for (let j = 0; j < n; j++) {
			if (isConnected[i][j] === 1 && !visited[j]) dfs(j);
		}
	}

	for (let i = 0; i < n; i++) {
		if (!visited[i]) {
			count++;
			dfs(i);
		}
	}

	return count;
}

export const numberOfProvincesHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[1, 1, 0], [1, 1, 0], [0, 0, 1]],
			[[1, 0, 0], [0, 1, 0], [0, 0, 1]],
			[[1, 1, 1], [1, 1, 1], [1, 1, 1]],
			[[1]],
			[[1, 0], [0, 1]],
		];
		for (const isConnected of tests) {
			const expected = referenceFindCircleNum(isConnected);
			const result = fn(isConnected);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from numberOfProvincesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNumberOfProvincesJS = `function findCircleNum(isConnected) {
  // Write your code here
};`;

export const numberOfProvinces: Problem = {
	id: "number-of-provinces",
	title: "189. Number of Provinces",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> cities. Some are directly connected, and others are not. A
    <strong>province</strong> is a group of cities that are connected, directly or indirectly, but
    not connected to any city outside the group.
  </p>
  <p class='mt-3'>
    You are given an <code>n x n</code> matrix <code>isConnected</code>, where
    <code>isConnected[i][j] = 1</code> if the <code>i</code>-th city and the <code>j</code>-th city
    are directly connected, and <code>0</code> otherwise. Return the total number of provinces.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `isConnected = [[1,1,0],[1,1,0],[0,0,1]]`,
			outputText: `2`,
		},
		{
			id: 1,
			inputText: `isConnected = [[1,0,0],[0,1,0],[0,0,1]]`,
			outputText: `3`,
		},
		{
			id: 2,
			inputText: `isConnected = [[1,1,1],[1,1,1],[1,1,1]]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 200</code></li>
  <li class='mt-2'><code>isConnected[i][i] == 1</code></li>
  <li class='mt-2'><code>isConnected[i][j] == isConnected[j][i]</code></li>`,
	starterCode: starterCodeNumberOfProvincesJS,
	handlerFunction: numberOfProvincesHandler,
	starterFunctionName: "function findCircleNum(",
	order: 189,
};
