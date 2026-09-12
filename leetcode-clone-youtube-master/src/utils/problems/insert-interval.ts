import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][], newInterval: number[]): number[][] {
	const result: number[][] = [];
	let [ns, ne] = newInterval;
	let i = 0;
	const n = intervals.length;
	while (i < n && intervals[i][1] < ns) {
		result.push(intervals[i]);
		i++;
	}
	while (i < n && intervals[i][0] <= ne) {
		ns = Math.min(ns, intervals[i][0]);
		ne = Math.max(ne, intervals[i][1]);
		i++;
	}
	result.push([ns, ne]);
	while (i < n) {
		result.push(intervals[i]);
		i++;
	}
	return result;
}

export const insertIntervalHandler = (fn: any) => {
	try {
		const tests: [number[][], number[]][] = [
			[
				[
					[1, 3],
					[6, 9],
				],
				[2, 5],
			],
			[
				[
					[1, 2],
					[3, 5],
					[6, 7],
					[8, 10],
					[12, 16],
				],
				[4, 8],
			],
			[[], [5, 7]],
			[[[1, 5]], [2, 3]],
			[[[1, 5]], [6, 8]],
		];
		for (const [intervals, newInterval] of tests) {
			const expected = referenceSolution(intervals, newInterval);
			const result = fn(intervals, newInterval);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from insertIntervalHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeInsertIntervalJS = `function insert(intervals, newInterval) {
  // Write your code here
};`;

export const insertInterval: Problem = {
	id: "insert-interval",
	title: "243. Insert Interval",
	problemStatement: `<p class='mt-3'>
    You are given an array of non-overlapping intervals <code>intervals</code>, sorted by their start values,
    where <code>intervals[i] = [start_i, end_i]</code>. You are also given a new interval
    <code>newInterval = [start, end]</code>.
  </p>
  <p class='mt-3'>
    Insert <code>newInterval</code> into <code>intervals</code> so that the result is still sorted by start
    value and contains no overlapping intervals (merging any that now overlap).
  </p>
  <p class='mt-3'>
    Return the resulting array of intervals.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
			outputText: "[[1,5],[6,9]]",
		},
		{
			id: 1,
			inputText: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
			outputText: "[[1,2],[3,10],[12,16]]",
			explanation: "[3,5],[6,7],[8,10] all overlap with [4,8] and merge into [3,10].",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= intervals.length <= 10^4</code></li>
<li class='mt-2'><code>intervals[i].length == 2</code> and <code>newInterval.length == 2</code></li>
<li class='mt-2'><code>0 <= start_i <= end_i <= 10^5</code></li>`,
	starterCode: starterCodeInsertIntervalJS,
	handlerFunction: insertIntervalHandler,
	starterFunctionName: "function insert(",
	order: 243,
};
