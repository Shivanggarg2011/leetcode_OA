import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: the intersection is every distinct value present in
// both arrays.
function referenceIntersection(nums1: number[], nums2: number[]): number[] {
	const set1 = new Set(nums1);
	const set2 = new Set(nums2);
	const result: number[] = [];
	for (const n of set1) {
		if (set2.has(n)) result.push(n);
	}
	return result;
}

// The intersection may be returned in any order and each value should
// appear only once, so normalize by de-duplicating and sorting.
function normalize(arr: number[]): number[] {
	return Array.from(new Set(arr)).sort((a, b) => a - b);
}

export const intersectionOfTwoArraysHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[1, 2, 2, 1], [2, 2]],
			[[4, 9, 5], [9, 4, 9, 8, 4]],
			[[1, 2, 3], [4, 5, 6]],
			[[], [1, 2, 3]],
			[[1, 1, 1], [1]],
			[[5, 3, 3, 8, 1], [8, 8, 1, 1, 3]],
		];
		for (const [a, b] of tests) {
			const expected = normalize(referenceIntersection(a, b));
			const result = normalize(fn([...a], [...b]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from intersectionOfTwoArraysHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIntersectionOfTwoArraysJS = `function intersection(nums1, nums2) {
  // Write your code here
};`;

export const intersectionOfTwoArrays: Problem = {
	id: "intersection-of-two-arrays",
	title: "16. Intersection of Two Arrays",
	problemStatement: `<p class='mt-3'>
    Given two integer arrays <code>nums1</code> and <code>nums2</code>, return an array of their
    <strong>intersection</strong>: every distinct value that appears in both arrays.
  </p>
  <p class='mt-3'>
    Each element in the result must be <strong>unique</strong>, and you may return the result in
    any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums1 = [1,2,2,1], nums2 = [2,2]`,
			outputText: `[2]`,
		},
		{
			id: 1,
			inputText: `nums1 = [4,9,5], nums2 = [9,4,9,8,4]`,
			outputText: `[9,4]`,
			explanation: "[4,9] is also accepted.",
		},
		{
			id: 2,
			inputText: `nums1 = [1,2,3], nums2 = [4,5,6]`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums1.length, nums2.length <= 1000</code></li>
  <li class='mt-2'><code>0 <= nums1[i], nums2[i] <= 1000</code></li>`,
	starterCode: starterCodeIntersectionOfTwoArraysJS,
	handlerFunction: intersectionOfTwoArraysHandler,
	starterFunctionName: "function intersection(",
	order: 16,
};
