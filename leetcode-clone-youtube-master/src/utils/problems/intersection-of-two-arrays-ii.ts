import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count occurrences in nums1, then for each value in
// nums2, include it as many times as it can still be matched.
function referenceIntersect(nums1: number[], nums2: number[]): number[] {
	const counts = new Map<number, number>();
	for (const n of nums1) counts.set(n, (counts.get(n) || 0) + 1);
	const result: number[] = [];
	for (const n of nums2) {
		const remaining = counts.get(n) || 0;
		if (remaining > 0) {
			result.push(n);
			counts.set(n, remaining - 1);
		}
	}
	return result;
}

// The order of the result doesn't matter, but the multiplicity of each
// value does, so sort (rather than de-duplicate) before comparing.
function normalize(arr: number[]): number[] {
	return [...arr].sort((a, b) => a - b);
}

export const intersectionOfTwoArraysIiHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[1, 2, 2, 1], [2, 2]],
			[[4, 9, 5], [9, 4, 9, 8, 4]],
			[[1, 2, 3], [4, 5, 6]],
			[[], [1, 2, 3]],
			[[1, 1, 1, 2], [1, 1]],
			[[3, 3, 5, 8, 1], [3, 3, 3, 1, 8, 8]],
		];
		for (const [a, b] of tests) {
			const expected = normalize(referenceIntersect(a, b));
			const result = normalize(fn([...a], [...b]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from intersectionOfTwoArraysIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIntersectionOfTwoArraysIiJS = `function intersect(nums1, nums2) {
  // Write your code here
};`;

export const intersectionOfTwoArraysIi: Problem = {
	id: "intersection-of-two-arrays-ii",
	title: "17. Intersection of Two Arrays II",
	problemStatement: `<p class='mt-3'>
    Given two integer arrays <code>nums1</code> and <code>nums2</code>, return an array of their
    intersection, where each element in the result should appear as many times as it shows up in
    <strong>both</strong> arrays.
  </p>
  <p class='mt-3'>
    Unlike a set-based intersection, duplicates matter here: if a value appears twice in
    <code>nums1</code> and three times in <code>nums2</code>, it should appear twice in the
    result. You may return the result in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums1 = [1,2,2,1], nums2 = [2,2]`,
			outputText: `[2,2]`,
		},
		{
			id: 1,
			inputText: `nums1 = [4,9,5], nums2 = [9,4,9,8,4]`,
			outputText: `[4,9]`,
			explanation: "[9,4] is also accepted.",
		},
		{
			id: 2,
			inputText: `nums1 = [1,2,3], nums2 = [4,5,6]`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums1.length, nums2.length <= 1000</code></li>
  <li class='mt-2'><code>0 <= nums1[i], nums2[i] <= 1000</code></li>`,
	starterCode: starterCodeIntersectionOfTwoArraysIiJS,
	handlerFunction: intersectionOfTwoArraysIiHandler,
	starterFunctionName: "function intersect(",
	order: 17,
};
