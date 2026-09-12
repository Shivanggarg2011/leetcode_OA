import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: keep every number seen so far and re-sort on each add.
// Simple and obviously correct, which is all a reference implementation
// needs to be.
class ReferenceKthLargest {
	k: number;
	nums: number[];
	constructor(k: number, nums: number[]) {
		this.k = k;
		this.nums = [...nums];
	}
	add(val: number): number {
		this.nums.push(val);
		this.nums.sort((a, b) => b - a);
		return this.nums[this.k - 1];
	}
}

export const kthLargestElementInAStreamHandler = (fn: any) => {
	try {
		const scripts: { k: number; nums: number[]; adds: number[] }[] = [
			{ k: 3, nums: [4, 5, 8, 2], adds: [3, 5, 10, 9, 4] },
			{ k: 1, nums: [], adds: [-3, -2, -4, 0, 4] },
			{ k: 2, nums: [0], adds: [-1, 1, -2, -4, 3] },
			{ k: 4, nums: [7, 7, 7, 7, 8], adds: [5, 6, 7, 7, 7] },
		];

		for (const { k, nums, adds } of scripts) {
			const userInstance = new fn(k, [...nums]);
			const refInstance = new ReferenceKthLargest(k, [...nums]);
			const userResults: number[] = [];
			const refResults: number[] = [];
			for (const val of adds) {
				userResults.push(userInstance.add(val));
				refResults.push(refInstance.add(val));
			}
			assert.deepStrictEqual(userResults, refResults);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kthLargestElementInAStreamHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKthLargestElementInAStreamJS = `class KthLargest {
  constructor(k, nums) {
    // Write your code here
  }

  add(val) {
    // Write your code here
  }
};`;

export const kthLargestElementInAStream: Problem = {
	id: "kth-largest-element-in-a-stream",
	title: "138. Kth Largest Element in a Stream",
	problemStatement: `<p class='mt-3'>
    Design a class <code>KthLargest</code> that keeps track of the <code>k</code>th largest
    element in a growing stream of numbers.
  </p>
  <p class='mt-3'>
    <code>KthLargest(k, nums)</code> initializes the object with the given integer <code>k</code>
    and an initial stream of numbers <code>nums</code>.
  </p>
  <p class='mt-3'>
    <code>add(val)</code> appends <code>val</code> to the stream and returns the current
    <code>k</code>th largest element in the stream (counting duplicates separately).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `["KthLargest", "add", "add", "add", "add", "add"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]`,
			outputText: `[null, 4, 5, 5, 8, 8]`,
		},
		{
			id: 1,
			inputText: `["KthLargest", "add", "add"]\n[[1, []], [-3], [-2]]`,
			outputText: `[null, -3, -2]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= k <= 10^4</code></li>
  <li class='mt-2'><code>0 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i], val <= 10^4</code></li>
  <li class='mt-2'>It is guaranteed there will be at least <code>k</code> elements in the stream when <code>add</code> is called.</li>`,
	starterCode: starterCodeKthLargestElementInAStreamJS,
	handlerFunction: kthLargestElementInAStreamHandler,
	starterFunctionName: "class KthLargest {",
	order: 138,
};
