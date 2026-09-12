import assert from "assert";
import { Problem } from "../types/problem";

export const trappingRainWaterHandler = (fn: any) => {
	try {
		function referenceSolution(height: number[]): number {
			let lo = 0;
			let hi = height.length - 1;
			let leftMax = 0;
			let rightMax = 0;
			let total = 0;
			while (lo < hi) {
				if (height[lo] < height[hi]) {
					leftMax = Math.max(leftMax, height[lo]);
					total += leftMax - height[lo];
					lo++;
				} else {
					rightMax = Math.max(rightMax, height[hi]);
					total += rightMax - height[hi];
					hi--;
				}
			}
			return total;
		}

		const tests: number[][] = [
			[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
			[4, 2, 0, 3, 2, 5],
			[],
			[1, 2, 3, 4],
			[5, 4, 3, 2, 1],
			[3, 0, 3],
		];

		for (const height of tests) {
			const expected = referenceSolution(height);
			const result = fn([...height]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from trappingRainWaterHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTrappingRainWaterJS = `function trap(height) {
  // Write your code here
};`;

export const trappingRainWater: Problem = {
	id: "trapping-rain-water",
	title: "37. Trapping Rain Water",
	problemStatement: `<p class='mt-3'>
    Given <code>n</code> non-negative integers in an array <code>height</code>, where each value
    represents the height of a bar with width <code>1</code>, compute how much water the terrain can
    trap after raining.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
			outputText: "6",
			explanation: "The elevation map traps 6 total units of water in the gaps above the shorter bars.",
		},
		{
			id: 1,
			inputText: "height = [4,2,0,3,2,5]",
			outputText: "9",
		},
	],
	constraints: `<li class='mt-2'><code>n == height.length</code></li>
  <li class='mt-2'><code>0 <= n <= 2 * 10^4</code></li>
  <li class='mt-2'><code>0 <= height[i] <= 10^5</code></li>`,
	starterCode: starterCodeTrappingRainWaterJS,
	handlerFunction: trappingRainWaterHandler,
	starterFunctionName: "function trap(",
	order: 37,
};
