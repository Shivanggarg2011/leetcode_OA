import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][]): number {
	if (intervals.length === 0) return 0;
	const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
	let end = sorted[0][1];
	let count = 1;
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i][0] >= end) {
			count++;
			end = sorted[i][1];
		}
	}
	return sorted.length - count;
}

export const nonOverlappingIntervalsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 3],
			],
			[
				[1, 2],
				[1, 2],
				[1, 2],
			],
			[
				[1, 2],
				[2, 3],
			],
			[],
			[
				[1, 100],
				[11, 22],
				[1, 11],
				[2, 12],
			],
		];
		for (const intervals of tests) {
			const expected = referenceSolution(intervals);
			const result = fn(intervals);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from nonOverlappingIntervalsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNonOverlappingIntervalsJS = `function eraseOverlapIntervals(intervals) {
  // Write your code here
};`;

export const nonOverlappingIntervals: Problem = {
	id: "non-overlapping-intervals",
	title: "238. Non-overlapping Intervals",
	problemStatement: `<p class='mt-3'>
    You are given an array of intervals, <code>intervals</code>, where
    <code>intervals[i] = [start_i, end_i]</code>.
  </p>
  <p class='mt-3'>
    Return the minimum number of intervals you need to remove so that the remaining intervals do not overlap
    (intervals that merely touch at an endpoint, such as <code>[1,2]</code> and <code>[2,3]</code>, are not
    considered overlapping).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
			outputText: "1",
			explanation: "Remove [1,3] and the rest of the intervals do not overlap.",
		},
		{
			id: 1,
			inputText: "intervals = [[1,2],[1,2],[1,2]]",
			outputText: "2",
			explanation: "You need to remove two [1,2] intervals to leave only one.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= intervals.length <= 10^5</code></li>
<li class='mt-2'><code>-5 * 10^4 <= start_i < end_i <= 5 * 10^4</code></li>`,
	starterCode: starterCodeNonOverlappingIntervalsJS,
	handlerFunction: nonOverlappingIntervalsHandler,
	starterFunctionName: "function eraseOverlapIntervals(",
	order: 238,
};
