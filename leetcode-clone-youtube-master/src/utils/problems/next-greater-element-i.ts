import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: monotonic stack over nums2 to build a "next greater" map, then look up nums1
function referenceNextGreaterElement(nums1: number[], nums2: number[]): number[] {
	const nextGreater = new Map<number, number>();
	const stack: number[] = [];
	for (const num of nums2) {
		while (stack.length > 0 && stack[stack.length - 1] < num) {
			nextGreater.set(stack.pop()!, num);
		}
		stack.push(num);
	}
	return nums1.map((num) => (nextGreater.has(num) ? nextGreater.get(num)! : -1));
}

export const nextGreaterElementIHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[4, 1, 2], [1, 3, 4, 2]],
			[[2, 4], [1, 2, 3, 4]],
			[[1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7]],
			[[1], [1]],
			[[3, 1], [4, 3, 2, 1]],
		];
		for (const [nums1, nums2] of tests) {
			const expected = referenceNextGreaterElement([...nums1], [...nums2]);
			const result = fn([...nums1], [...nums2]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from nextGreaterElementIHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNextGreaterElementIJS = `function nextGreaterElement(nums1, nums2) {
  // Write your code here
};`;

export const nextGreaterElementI: Problem = {
	id: "next-greater-element-i",
	title: "69. Next Greater Element I",
	problemStatement: `<p class='mt-3'>
    You are given two arrays <code>nums1</code> and <code>nums2</code>, both containing
    <strong>distinct</strong> values, where <code>nums1</code> is a subset of <code>nums2</code>.
  </p>
  <p class='mt-3'>
    For each value <code>nums1[i]</code>, find the index of that value in <code>nums2</code> and find
    the first element to its right in <code>nums2</code> that is <strong>greater</strong> than it (its
    "next greater element"). If it does not exist, use <code>-1</code> for that value instead.
  </p>
  <p class='mt-3'>
    Return an array <code>answer</code> of the same length as <code>nums1</code> such that
    <code>answer[i]</code> is the next greater element of <code>nums1[i]</code> as described above.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums1 = [4,1,2], nums2 = [1,3,4,2]",
			outputText: "[-1,3,-1]",
			explanation: "For 4, there is nothing to its right in nums2, so -1. For 1, the next greater is 3. For 2, there is nothing to its right, so -1.",
		},
		{
			id: 1,
			inputText: "nums1 = [2,4], nums2 = [1,2,3,4]",
			outputText: "[3,-1]",
		},
		{
			id: 2,
			inputText: "nums1 = [1], nums2 = [1]",
			outputText: "[-1]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums1.length <= nums2.length <= 1000</code></li>
<li class='mt-2'><code>0 <= nums1[i], nums2[i] <= 10^4</code></li>
<li class='mt-2'>All integers in <code>nums1</code> and <code>nums2</code> are unique</li>
<li class='mt-2'>All integers in <code>nums1</code> also appear in <code>nums2</code></li>`,
	starterCode: starterCodeNextGreaterElementIJS,
	handlerFunction: nextGreaterElementIHandler,
	starterFunctionName: "function nextGreaterElement(",
	order: 69,
};
