import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: monotonic increasing stack of indices
function referenceLargestRectangleArea(heights: number[]): number {
	const stack: number[] = [];
	let best = 0;
	const n = heights.length;
	for (let i = 0; i <= n; i++) {
		const h = i === n ? 0 : heights[i];
		while (stack.length > 0 && heights[stack[stack.length - 1]] >= h) {
			const height = heights[stack.pop()!];
			const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
			best = Math.max(best, height * width);
		}
		stack.push(i);
	}
	return best;
}

export const largestRectangleInHistogramHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 1, 5, 6, 2, 3],
			[2, 4],
			[1, 1, 1, 1],
			[0, 0, 0],
			[5],
			[6, 2, 5, 4, 5, 1, 6],
		];
		for (const heights of tests) {
			const expected = referenceLargestRectangleArea([...heights]);
			const result = fn([...heights]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from largestRectangleInHistogramHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLargestRectangleInHistogramJS = `function largestRectangleArea(heights) {
  // Write your code here
};`;

export const largestRectangleInHistogram: Problem = {
	id: "largest-rectangle-in-histogram",
	title: "68. Largest Rectangle in Histogram",
	problemStatement: `<p class='mt-3'>
    Given an array of integers <code>heights</code> representing the heights of bars in a histogram,
    where each bar has a width of <code>1</code> and the bars are placed side by side, find the area
    of the <strong>largest rectangle</strong> that can be formed within the histogram.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "heights = [2,1,5,6,2,3]",
			outputText: "10",
			explanation: "The largest rectangle has height 5 and width 2 (bars at indices 2 and 3), giving area 10.",
		},
		{
			id: 1,
			inputText: "heights = [2,4]",
			outputText: "4",
		},
		{
			id: 2,
			inputText: "heights = [1,1,1,1]",
			outputText: "4",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= heights.length <= 10^5</code></li>
<li class='mt-2'><code>0 <= heights[i] <= 10^4</code></li>`,
	starterCode: starterCodeLargestRectangleInHistogramJS,
	handlerFunction: largestRectangleInHistogramHandler,
	starterFunctionName: "function largestRectangleArea(",
	order: 68,
};
