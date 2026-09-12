import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(firstList: number[][], secondList: number[][]): number[][] {
	const result: number[][] = [];
	let i = 0;
	let j = 0;
	while (i < firstList.length && j < secondList.length) {
		const lo = Math.max(firstList[i][0], secondList[j][0]);
		const hi = Math.min(firstList[i][1], secondList[j][1]);
		if (lo <= hi) result.push([lo, hi]);
		if (firstList[i][1] < secondList[j][1]) i++;
		else j++;
	}
	return result;
}

export const intervalListIntersectionsHandler = (fn: any) => {
	try {
		const tests: [number[][], number[][]][] = [
			[
				[
					[0, 2],
					[5, 10],
					[13, 23],
					[24, 25],
				],
				[
					[1, 5],
					[8, 12],
					[15, 24],
					[25, 26],
				],
			],
			[[], [[1, 5]]],
			[
				[
					[1, 3],
					[5, 9],
				],
				[],
			],
			[[[1, 7]], [[3, 10]]],
			[
				[
					[3, 5],
					[9, 20],
				],
				[
					[4, 5],
					[7, 10],
					[11, 12],
					[14, 15],
					[16, 20],
				],
			],
		];
		for (const [firstList, secondList] of tests) {
			const expected = referenceSolution(firstList, secondList);
			const result = fn(firstList, secondList);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from intervalListIntersectionsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIntervalListIntersectionsJS = `function intervalIntersection(firstList, secondList) {
  // Write your code here
};`;

export const intervalListIntersections: Problem = {
	id: "interval-list-intersections",
	title: "246. Interval List Intersections",
	problemStatement: `<p class='mt-3'>
    You are given two lists of closed intervals, <code>firstList</code> and <code>secondList</code>, where
    <code>firstList[i] = [start_i, end_i]</code> and <code>secondList[j] = [start_j, end_j]</code>. Each list
    of intervals is pairwise disjoint and sorted in ascending order by start value.
  </p>
  <p class='mt-3'>
    Return the intersection of the two interval lists as an array of intervals (in any order that matches
    left-to-right, sorted by start). An intersection is the set of points that lie in both an interval from
    <code>firstList</code> and an interval from <code>secondList</code>; a single shared point (like
    <code>[3,3]</code>) still counts as a valid intersection.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]",
			outputText: "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
		},
		{
			id: 1,
			inputText: "firstList = [], secondList = [[1,5]]",
			outputText: "[]",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= firstList.length, secondList.length <= 1000</code></li>
<li class='mt-2'><code>0 <= start_i <= end_i <= 10^9</code></li>`,
	starterCode: starterCodeIntervalListIntersectionsJS,
	handlerFunction: intervalListIntersectionsHandler,
	starterFunctionName: "function intervalIntersection(",
	order: 246,
};
