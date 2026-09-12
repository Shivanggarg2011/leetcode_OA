import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Floyd-Warshall all-pairs shortest paths, then pick the
// city with the fewest reachable neighbors within the threshold (ties broken
// by the larger city number).
function referenceFindTheCity(n: number, edges: number[][], distanceThreshold: number): number {
	const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
	for (let i = 0; i < n; i++) dist[i][i] = 0;
	for (const [u, v, w] of edges) {
		dist[u][v] = Math.min(dist[u][v], w);
		dist[v][u] = Math.min(dist[v][u], w);
	}

	for (let k = 0; k < n; k++) {
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (dist[i][k] + dist[k][j] < dist[i][j]) {
					dist[i][j] = dist[i][k] + dist[k][j];
				}
			}
		}
	}

	let bestCity = -1;
	let bestCount = Infinity;
	for (let i = 0; i < n; i++) {
		let count = 0;
		for (let j = 0; j < n; j++) {
			if (i !== j && dist[i][j] <= distanceThreshold) count++;
		}
		if (count <= bestCount) {
			bestCount = count;
			bestCity = i;
		}
	}
	return bestCity;
}

export const findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistanceHandler = (
	fn: any
) => {
	try {
		const tests: [number, number[][], number][] = [
			[4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4],
			[5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2],
			[3, [[0, 1, 1], [1, 2, 1], [0, 2, 1]], 1],
			[2, [[0, 1, 1]], 1],
			[4, [[0, 1, 1], [1, 2, 1], [2, 3, 1]], 1],
		];
		for (const [n, edges, distanceThreshold] of tests) {
			const expected = referenceFindTheCity(n, edges, distanceThreshold);
			const result = fn(n, edges, distanceThreshold);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log(
			"Error from findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistanceHandler: ",
			error
		);
		throw new Error(error);
	}
};

const starterCodeFindTheCityJS = `function findTheCity(n, edges, distanceThreshold) {
  // Write your code here
};`;

export const findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistance: Problem = {
	id: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
	title: "191. Find the City With the Smallest Number of Neighbors at a Threshold Distance",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> cities numbered from <code>0</code> to <code>n - 1</code>, connected by
    weighted, undirected <code>edges[i] = [from_i, to_i, weight_i]</code>. You are also given a
    <code>distanceThreshold</code>.
  </p>
  <p class='mt-3'>
    For each city, count how many other cities are reachable from it with a shortest path distance of
    at most <code>distanceThreshold</code>. Return the city with the <strong>smallest</strong> such
    count. If there is a tie, return the city with the <strong>greatest</strong> number.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4`,
			outputText: `3`,
			explanation: "City 3 can reach cities 1 and 2 within distance 4 (2 neighbors), the fewest.",
		},
		{
			id: 1,
			inputText: `n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>2 <= n <= 100</code></li>
  <li class='mt-2'><code>1 <= edges.length <= n * (n - 1) / 2</code></li>
  <li class='mt-2'><code>0 <= from_i, to_i < n</code>, and <code>from_i != to_i</code></li>
  <li class='mt-2'><code>1 <= weight_i, distanceThreshold <= 10^4</code></li>
  <li class='mt-2'>There is at most one edge between any pair of cities.</li>`,
	starterCode: starterCodeFindTheCityJS,
	handlerFunction: findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistanceHandler,
	starterFunctionName: "function findTheCity(",
	order: 191,
};
