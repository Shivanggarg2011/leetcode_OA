import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][]): number {
	const sorted = [...intervals].sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));
	let count = 0;
	let prevEnd = -Infinity;
	for (const [, e] of sorted) {
		if (e > prevEnd) {
			count++;
			prevEnd = e;
		}
	}
	return count;
}

export const removeCoveredIntervalsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 4],
				[3, 6],
				[2, 8],
			],
			[
				[1, 4],
				[2, 3],
			],
			[
				[1, 2],
				[1, 4],
				[3, 4],
			],
			[
				[1, 10],
				[2, 3],
				[4, 5],
				[6, 7],
			],
			[
				[1, 2],
				[3, 4],
				[5, 6],
			],
		];
		for (const intervals of tests) {
			const expected = referenceSolution(intervals);
			const result = fn(intervals);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeCoveredIntervalsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveCoveredIntervalsJS = `function removeCoveredIntervals(intervals) {
  // Write your code here
};`;

export const removeCoveredIntervals: Problem = {
	id: "remove-covered-intervals",
	title: "251. Remove Covered Intervals",
	problemStatement: `<p class='mt-3'>
    You are given an array of closed intervals <code>intervals</code>, where
    <code>intervals[i] = [start_i, end_i]</code>. An interval <code>[s1, e1]</code> is considered
    <strong>covered</strong> by another interval <code>[s2, e2]</code> if <code>s2 <= s1</code> and
    <code>e1 <= e2</code>.
  </p>
  <p class='mt-3'>
    Remove every interval that is covered by another interval in the list, and return the number of
    intervals that remain.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[1,4],[3,6],[2,8]]",
			outputText: "2",
			explanation: "[3,6] is covered by [2,8] and gets removed. [1,4] and [2,8] remain.",
		},
		{
			id: 1,
			inputText: "intervals = [[1,4],[2,3]]",
			outputText: "1",
			explanation: "[2,3] is covered by [1,4].",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= intervals.length <= 1000</code></li>
<li class='mt-2'><code>0 <= start_i < end_i <= 5 * 10^4</code></li>
<li class='mt-2'>All the intervals are unique</li>`,
	starterCode: starterCodeRemoveCoveredIntervalsJS,
	handlerFunction: removeCoveredIntervalsHandler,
	starterFunctionName: "function removeCoveredIntervals(",
	order: 251,
};
