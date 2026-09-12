import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][], queries: number[]): number[] {
	return queries.map((q) => {
		let best = -1;
		for (const [l, r] of intervals) {
			if (l <= q && q <= r) {
				const size = r - l + 1;
				if (best === -1 || size < best) best = size;
			}
		}
		return best;
	});
}

export const minimumIntervalToIncludeEachQueryHandler = (fn: any) => {
	try {
		const tests: [number[][], number[]][] = [
			[
				[
					[1, 4],
					[2, 4],
					[3, 6],
					[4, 4],
				],
				[2, 3, 4, 5],
			],
			[
				[
					[2, 3],
					[2, 5],
					[1, 8],
					[20, 25],
				],
				[2, 19, 5, 22],
			],
			[[[1, 10]], [5]],
			[
				[
					[1, 3],
					[4, 6],
				],
				[2, 5, 10],
			],
			[[[1, 4]], [0, 10]],
		];
		for (const [intervals, queries] of tests) {
			const expected = referenceSolution(intervals, queries);
			const result = fn(intervals, queries);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumIntervalToIncludeEachQueryHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumIntervalToIncludeEachQueryJS = `function minInterval(intervals, queries) {
  // Write your code here
};`;

export const minimumIntervalToIncludeEachQuery: Problem = {
	id: "minimum-interval-to-include-each-query",
	title: "250. Minimum Interval to Include Each Query",
	problemStatement: `<p class='mt-3'>
    You are given a 2D array <code>intervals</code>, where <code>intervals[i] = [left_i, right_i]</code>
    describes the <code>i</code>-th interval starting at <code>left_i</code> and ending at
    <code>right_i</code> (inclusive). The <strong>size</strong> of an interval is
    <code>right_i - left_i + 1</code>.
  </p>
  <p class='mt-3'>
    You are also given an array of integers <code>queries</code>. For each <code>queries[j]</code>, find the
    size of the <strong>smallest</strong> interval that contains <code>queries[j]</code> (that is,
    <code>left_i <= queries[j] <= right_i</code>). If no interval contains <code>queries[j]</code>, the answer
    for that query is <code>-1</code>.
  </p>
  <p class='mt-3'>
    Return an array of answers, one for each query, in the same order as <code>queries</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
			outputText: "[3,3,1,4]",
			explanation: "For query 4, the interval [4,4] has size 1 and is the smallest containing it.",
		},
		{
			id: 1,
			inputText: "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]",
			outputText: "[2,-1,4,6]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= intervals.length <= 1500</code></li>
<li class='mt-2'><code>1 <= left_i <= right_i <= 10^7</code></li>
<li class='mt-2'><code>1 <= queries.length <= 1500</code></li>
<li class='mt-2'><code>1 <= queries[j] <= 10^7</code></li>`,
	starterCode: starterCodeMinimumIntervalToIncludeEachQueryJS,
	handlerFunction: minimumIntervalToIncludeEachQueryHandler,
	starterFunctionName: "function minInterval(",
	order: 250,
};
