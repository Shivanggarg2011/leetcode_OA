import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: sort by squared Euclidean distance to the origin and
// keep the k smallest. Test cases are built with distinct distances so the
// chosen set of k points is unambiguous, and we only need to normalize the
// order in which they're returned.
function referenceKClosest(points: number[][], k: number): number[][] {
	return [...points]
		.sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))
		.slice(0, k);
}

function normalize(points: number[][]): number[][] {
	return [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

export const kClosestPointsToOriginHandler = (fn: any) => {
	try {
		const tests: [number[][], number][] = [
			[
				[
					[1, 3],
					[-2, 2],
				],
				1,
			],
			[
				[
					[3, 3],
					[5, -1],
					[-2, 4],
				],
				2,
			],
			[[[0, 1]], 1],
			[
				[
					[1, 1],
					[2, 2],
					[3, 3],
					[-1, -1],
				],
				3,
			],
			[
				[
					[6, 10],
					[-3, 3],
					[-2, 5],
					[0, 2],
					[7, 0],
				],
				3,
			],
		];

		for (const [points, k] of tests) {
			const expected = normalize(referenceKClosest(points, k));
			const result = normalize(fn(points.map((p) => [...p]), k));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kClosestPointsToOriginHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKClosestPointsToOriginJS = `function kClosest(points, k) {
  // Write your code here
};`;

export const kClosestPointsToOrigin: Problem = {
	id: "k-closest-points-to-origin",
	title: "140. K Closest Points to Origin",
	problemStatement: `<p class='mt-3'>
    You are given an array of coordinate pairs <code>points</code> where
    <code>points[i] = [x_i, y_i]</code> is a point on the plane, and an integer <code>k</code>.
  </p>
  <p class='mt-3'>
    Return the <code>k</code> points that are closest to the origin <code>(0, 0)</code>, using
    ordinary Euclidean distance. You may return the answer in any order — the test cases are set
    up so that the set of <code>k</code> closest points is unique.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `points = [[1,3],[-2,2]], k = 1`,
			outputText: `[[-2,2]]`,
			explanation: "(-2,2) has distance sqrt(8) from the origin, closer than (1,3) at sqrt(10).",
		},
		{
			id: 1,
			inputText: `points = [[3,3],[5,-1],[-2,4]], k = 2`,
			outputText: `[[3,3],[-2,4]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= k <= points.length <= 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= x_i, y_i <= 10^4</code></li>`,
	starterCode: starterCodeKClosestPointsToOriginJS,
	handlerFunction: kClosestPointsToOriginHandler,
	starterFunctionName: "function kClosest(",
	order: 140,
};
