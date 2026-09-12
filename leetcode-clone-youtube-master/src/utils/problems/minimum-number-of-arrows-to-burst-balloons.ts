import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(points: number[][]): number {
	if (points.length === 0) return 0;
	const sorted = [...points].sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
	let arrows = 1;
	let end = sorted[0][1];
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i][0] > end) {
			arrows++;
			end = sorted[i][1];
		}
	}
	return arrows;
}

export const minimumNumberOfArrowsToBurstBalloonsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[10, 16],
				[2, 8],
				[1, 6],
				[7, 12],
			],
			[
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8],
			],
			[
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
			],
			[[1, 2]],
			[],
		];
		for (const points of tests) {
			const expected = referenceSolution(points);
			const result = fn(points);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumNumberOfArrowsToBurstBalloonsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumNumberOfArrowsToBurstBalloonsJS = `function findMinArrowShots(points) {
  // Write your code here
};`;

export const minimumNumberOfArrowsToBurstBalloons: Problem = {
	id: "minimum-number-of-arrows-to-burst-balloons",
	title: "240. Minimum Number of Arrows to Burst Balloons",
	problemStatement: `<p class='mt-3'>
    There are a number of spherical balloons floating along a wall, each represented as a horizontal diameter
    by the array <code>points</code>, where <code>points[i] = [x_start, x_end]</code> is the horizontal span
    covered by the <code>i</code>-th balloon.
  </p>
  <p class='mt-3'>
    An arrow can be shot straight up from any horizontal position, and it bursts every balloon whose span
    contains that x-coordinate (an arrow at a balloon's exact boundary also bursts it). There is no limit to
    how far an arrow can travel vertically.
  </p>
  <p class='mt-3'>
    Return the minimum number of arrows needed to burst every balloon.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "points = [[10,16],[2,8],[1,6],[7,12]]",
			outputText: "2",
			explanation: "One arrow at x=6 bursts [2,8] and [1,6]; another at x=11 bursts [10,16] and [7,12].",
		},
		{
			id: 1,
			inputText: "points = [[1,2],[3,4],[5,6],[7,8]]",
			outputText: "4",
			explanation: "No two balloons overlap, so each needs its own arrow.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= points.length <= 10^5</code></li>
<li class='mt-2'><code>-2^31 <= x_start < x_end <= 2^31 - 1</code></li>`,
	starterCode: starterCodeMinimumNumberOfArrowsToBurstBalloonsJS,
	handlerFunction: minimumNumberOfArrowsToBurstBalloonsHandler,
	starterFunctionName: "function findMinArrowShots(",
	order: 240,
};
