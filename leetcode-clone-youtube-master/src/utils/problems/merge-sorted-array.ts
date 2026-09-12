import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: take the first m elements of nums1 and the first n
// elements of nums2 (the real data), then merge them like the merge step
// of merge sort.
function referenceMerge(nums1: number[], m: number, nums2: number[], n: number): number[] {
	const a = nums1.slice(0, m);
	const b = nums2.slice(0, n);
	const result: number[] = [];
	let i = 0;
	let j = 0;
	while (i < a.length && j < b.length) {
		if (a[i] <= b[j]) result.push(a[i++]);
		else result.push(b[j++]);
	}
	while (i < a.length) result.push(a[i++]);
	while (j < b.length) result.push(b[j++]);
	return result;
}

export const mergeSortedArrayHandler = (fn: any) => {
	try {
		const tests: [number[], number, number[], number][] = [
			[[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
			[[1], 1, [], 0],
			[[0], 0, [1], 1],
			[[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
			[[2, 0], 1, [1], 1],
			[[-3, -1, 0, 0, 0], 2, [-2, -1, 4], 3],
		];
		for (const [nums1, m, nums2, n] of tests) {
			const expected = referenceMerge(nums1, m, nums2, n);
			const input1 = [...nums1];
			const returned = fn(input1, m, [...nums2], n);
			const actual = Array.isArray(returned) ? returned : input1;
			assert.deepStrictEqual(actual, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from mergeSortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMergeSortedArrayJS = `function merge(nums1, m, nums2, n) {
  // Write your code here.
  // nums1 has length m + n: the first m entries hold its real values, and
  // the last n entries are just placeholder zeroes with room for nums2.
  // Merge in place into nums1 (or return the merged array).
};`;

export const mergeSortedArray: Problem = {
	id: "merge-sorted-array",
	title: "25. Merge Sorted Array",
	problemStatement: `<p class='mt-3'>
    You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in
    non-decreasing order, along with the number of real elements <code>m</code> and <code>n</code>
    in each respectively.
  </p>
  <p class='mt-3'>
    <code>nums1</code> has a total length of <code>m + n</code>: the first <code>m</code>
    elements are its actual values, and the final <code>n</code> elements are <code>0</code> and
    should be ignored — they exist only to leave room for the merge. Merge <code>nums2</code>
    into <code>nums1</code> so that the result is a single array sorted in non-decreasing order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3`,
			outputText: `[1,2,2,3,5,6]`,
		},
		{
			id: 1,
			inputText: `nums1 = [1], m = 1, nums2 = [], n = 0`,
			outputText: `[1]`,
		},
		{
			id: 2,
			inputText: `nums1 = [0], m = 0, nums2 = [1], n = 1`,
			outputText: `[1]`,
			explanation: "nums1 has no real elements, so the result is just nums2.",
		},
	],
	constraints: `<li class='mt-2'><code>nums1.length == m + n</code> and <code>nums2.length == n</code></li>
  <li class='mt-2'><code>0 <= m, n <= 200</code></li>
  <li class='mt-2'><code>-10^9 <= nums1[i], nums2[j] <= 10^9</code></li>`,
	starterCode: starterCodeMergeSortedArrayJS,
	handlerFunction: mergeSortedArrayHandler,
	starterFunctionName: "function merge(",
	order: 25,
};
