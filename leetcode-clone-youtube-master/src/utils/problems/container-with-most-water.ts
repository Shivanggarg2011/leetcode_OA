import assert from "assert";
import { Problem } from "../types/problem";

export const containerWithMostWaterHandler = (fn: any) => {
	try {
		function referenceSolution(height: number[]): number {
			let lo = 0;
			let hi = height.length - 1;
			let best = 0;
			while (lo < hi) {
				const area = Math.min(height[lo], height[hi]) * (hi - lo);
				best = Math.max(best, area);
				if (height[lo] < height[hi]) lo++;
				else hi--;
			}
			return best;
		}

		const tests: number[][] = [
			[1, 8, 6, 2, 5, 4, 8, 3, 7],
			[1, 1],
			[4, 3, 2, 1, 4],
			[1, 2, 1],
			[1, 2, 4, 3],
		];

		for (const height of tests) {
			const expected = referenceSolution(height);
			const result = fn([...height]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from containerWithMostWaterHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeContainerWithMostWaterJS = `function maxArea(height) {
  // Write your code here
};`;

export const containerWithMostWater: Problem = {
	id: "container-with-most-water",
	title: "36. Container With Most Water",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>height</code> of length <code>n</code>. There are
    <code>n</code> vertical lines drawn such that the two endpoints of the <code>i</code>-th line are
    <code>(i, 0)</code> and <code>(i, height[i])</code>.
  </p>
  <p class='mt-3'>
    Find two lines that, together with the x-axis, form a container that holds the most water, and
    return the maximum amount of water it can store.
  </p>
  <p class='mt-3'>Note: the container cannot be slanted; it is formed only by two vertical lines and the x-axis.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "height = [1,8,6,2,5,4,8,3,7]",
			outputText: "49",
			explanation: "The lines at index 1 (height 8) and index 8 (height 7) form the largest container: min(8,7) * (8-1) = 49.",
		},
		{
			id: 1,
			inputText: "height = [1,1]",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>2 <= height.length <= 10^5</code></li>
  <li class='mt-2'><code>0 <= height[i] <= 10^4</code></li>`,
	starterCode: starterCodeContainerWithMostWaterJS,
	handlerFunction: containerWithMostWaterHandler,
	starterFunctionName: "function maxArea(",
	order: 36,
};
