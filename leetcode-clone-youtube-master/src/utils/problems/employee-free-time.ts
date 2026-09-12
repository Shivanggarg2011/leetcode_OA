import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(schedule: number[][][]): number[][] {
	const all: number[][] = [];
	for (const emp of schedule) for (const iv of emp) all.push(iv);
	all.sort((a, b) => a[0] - b[0]);
	const result: number[][] = [];
	if (all.length === 0) return result;
	let end = all[0][1];
	for (let i = 1; i < all.length; i++) {
		if (all[i][0] > end) {
			result.push([end, all[i][0]]);
			end = all[i][1];
		} else {
			end = Math.max(end, all[i][1]);
		}
	}
	return result;
}

export const employeeFreeTimeHandler = (fn: any) => {
	try {
		const tests: number[][][][] = [
			[
				[
					[1, 2],
					[5, 6],
				],
				[[1, 3]],
				[[4, 10]],
			],
			[
				[
					[1, 3],
					[6, 7],
				],
				[[2, 4]],
				[
					[2, 5],
					[9, 12],
				],
			],
			[[[1, 5]], [[2, 3], [4, 5]]],
			[[[1, 2]]],
			[[[1, 2]], [[3, 4]]],
		];
		for (const schedule of tests) {
			const expected = referenceSolution(schedule);
			const result = fn(schedule);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from employeeFreeTimeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeEmployeeFreeTimeJS = `function employeeFreeTime(schedule) {
  // schedule is an array of employees, each an array of [start, end] intervals that are
  // already sorted and non-overlapping for that employee.
  // Write your code here
};`;

export const employeeFreeTime: Problem = {
	id: "employee-free-time",
	title: "248. Employee Free Time",
	problemStatement: `<p class='mt-3'>
    You are given the working schedules of several employees as <code>schedule</code>, where
    <code>schedule[i]</code> is a list of <code>[start, end]</code> intervals (already sorted and
    non-overlapping) representing when employee <code>i</code> is busy.
  </p>
  <p class='mt-3'>
    Return a list of finite intervals representing the common, positive-length free time shared by
    <strong>all</strong> employees, sorted by start time. Do not include the unbounded free time before the
    earliest busy interval or after the latest one.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]",
			outputText: "[[3,4]]",
			explanation: "Combining all busy intervals: [1,2],[1,3],[4,10],[5,6] merge to [1,3] and [4,10], leaving a gap [3,4].",
		},
		{
			id: 1,
			inputText: "schedule = [[[1,2]],[[3,4]]]",
			outputText: "[[2,3]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= schedule.length , schedule[i].length <= 50</code></li>
<li class='mt-2'><code>0 <= start_i < end_i <= 10^8</code></li>`,
	starterCode: starterCodeEmployeeFreeTimeJS,
	handlerFunction: employeeFreeTimeHandler,
	starterFunctionName: "function employeeFreeTime(",
	order: 248,
};
