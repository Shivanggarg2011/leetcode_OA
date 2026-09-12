import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][]): number[][] {
	if (intervals.length === 0) return [];
	const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
	const result: number[][] = [sorted[0].slice()];
	for (let i = 1; i < sorted.length; i++) {
		const last = result[result.length - 1];
		const [s, e] = sorted[i];
		if (s <= last[1]) {
			last[1] = Math.max(last[1], e);
		} else {
			result.push([s, e]);
		}
	}
	return result;
}

export const mergeIntervalsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 3],
				[2, 6],
				[8, 10],
				[15, 18],
			],
			[
				[1, 4],
				[4, 5],
			],
			[
				[1, 4],
				[0, 4],
			],
			[],
			[
				[1, 4],
				[2, 3],
			],
		];
		for (const intervals of tests) {
			const expected = referenceSolution(intervals);
			const result = fn(intervals);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from mergeIntervalsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMergeIntervalsJS = `function merge(intervals) {
  // Write your code here
};`;

export const mergeIntervals: Problem = {
	id: "merge-intervals",
	title: "242. Merge Intervals",
	problemStatement: `<p class='mt-3'>
    Given an array of intervals <code>intervals</code>, where <code>intervals[i] = [start_i, end_i]</code>,
    merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the
    intervals in the input.
  </p>
  <p class='mt-3'>
    Two intervals overlap if they share at least one point, meaning touching intervals like
    <code>[1,4]</code> and <code>[4,5]</code> should be merged into <code>[1,5]</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
			outputText: "[[1,6],[8,10],[15,18]]",
			explanation: "[1,3] and [2,6] overlap, so they merge into [1,6].",
		},
		{
			id: 1,
			inputText: "intervals = [[1,4],[4,5]]",
			outputText: "[[1,5]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= intervals.length <= 10^4</code></li>
<li class='mt-2'><code>0 <= start_i <= end_i <= 5 * 10^4</code></li>`,
	starterCode: starterCodeMergeIntervalsJS,
	handlerFunction: mergeIntervalsHandler,
	starterFunctionName: "function merge(",
	order: 242,
};
