import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Prim's algorithm using Manhattan distance as edge weight.
function referenceMinCostConnectPoints(points: number[][]): number {
	const n = points.length;
	if (n <= 1) return 0;

	const inMST = new Array(n).fill(false);
	const minDist = new Array(n).fill(Infinity);
	minDist[0] = 0;
	let total = 0;

	for (let i = 0; i < n; i++) {
		let u = -1;
		for (let v = 0; v < n; v++) {
			if (!inMST[v] && (u === -1 || minDist[v] < minDist[u])) u = v;
		}
		inMST[u] = true;
		total += minDist[u];
		for (let v = 0; v < n; v++) {
			if (!inMST[v]) {
				const dist = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
				if (dist < minDist[v]) minDist[v] = dist;
			}
		}
	}

	return total;
}

export const minCostToConnectAllPointsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]],
			[[3, 12], [-2, 5], [-4, 1]],
			[[0, 0]],
			[[0, 0], [1, 1]],
			[[0, 0], [1, 0], [2, 0], [3, 0]],
		];
		for (const points of tests) {
			const expected = referenceMinCostConnectPoints(points);
			const result = fn(points);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minCostToConnectAllPointsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinCostToConnectAllPointsJS = `function minCostConnectPoints(points) {
  // Write your code here
};`;

export const minCostToConnectAllPoints: Problem = {
	id: "min-cost-to-connect-all-points",
	title: "186. Min Cost to Connect All Points",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>points</code> where <code>points[i] = [x_i, y_i]</code> represents
    the coordinates of a point on a 2D plane. The cost of connecting two points is the
    <strong>Manhattan distance</strong> between them: <code>|x1 - x2| + |y1 - y2|</code>.
  </p>
  <p class='mt-3'>
    Return the minimum total cost to connect all the points together so that there is exactly one
    simple path between every pair of points (i.e. build a minimum spanning tree over the points).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `points = [[0,0],[2,2],[3,10],[5,2],[7,0]]`,
			outputText: `20`,
		},
		{
			id: 1,
			inputText: `points = [[3,12],[-2,5],[-4,1]]`,
			outputText: `18`,
		},
		{
			id: 2,
			inputText: `points = [[0,0],[1,1]]`,
			outputText: `2`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= points.length <= 1000</code></li>
  <li class='mt-2'><code>-10^6 <= x_i, y_i <= 10^6</code></li>
  <li class='mt-2'>All pairs <code>(x_i, y_i)</code> are distinct.</li>`,
	starterCode: starterCodeMinCostToConnectAllPointsJS,
	handlerFunction: minCostToConnectAllPointsHandler,
	starterFunctionName: "function minCostConnectPoints(",
	order: 186,
};
