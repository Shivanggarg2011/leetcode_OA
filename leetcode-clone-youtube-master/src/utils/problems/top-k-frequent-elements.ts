import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count frequencies, then take the k elements with
// the highest counts.
function referenceTopKFrequent(nums: number[], k: number): number[] {
	const counts = new Map<number, number>();
	for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);
	return Array.from(counts.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, k)
		.map((entry) => entry[0]);
}

// The k most frequent elements may be returned in any order, so sort
// numerically before comparing.
function normalize(arr: number[]): number[] {
	return [...arr].sort((a, b) => a - b);
}

export const topKFrequentElementsHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 1, 1, 2, 2, 3], 2],
			[[1], 1],
			[[4, 4, 4, 6, 6, 7, 7, 7, 7], 1],
			[[5, 3, 5, 3, 1, 1, 1], 3],
			[[-1, -1, -2, -2, -2, 3], 2],
			[[1, 2, 3, 4, 5], 3],
		];
		for (const [nums, k] of tests) {
			const expected = normalize(referenceTopKFrequent(nums, k));
			const result = normalize(fn([...nums], k));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from topKFrequentElementsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTopKFrequentElementsJS = `function topKFrequent(nums, k) {
  // Write your code here
};`;

export const topKFrequentElements: Problem = {
	id: "top-k-frequent-elements",
	title: "5. Top K Frequent Elements",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>
    most frequently occurring elements in the array.
  </p>
  <p class='mt-3'>
    You may return the answer in <strong>any order</strong>. The tests for this problem are
    constructed so that the set of the <code>k</code> most frequent elements is unambiguous.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,1,1,2,2,3], k = 2`,
			outputText: `[1,2]`,
			explanation: "1 occurs 3 times and 2 occurs 2 times, more than any other value.",
		},
		{
			id: 1,
			inputText: `nums = [1], k = 1`,
			outputText: `[1]`,
		},
		{
			id: 2,
			inputText: `nums = [4,4,4,6,6,7,7,7,7], k = 1`,
			outputText: `[7]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
  <li class='mt-2'><code>k</code> is between <code>1</code> and the number of distinct elements.</li>`,
	starterCode: starterCodeTopKFrequentElementsJS,
	handlerFunction: topKFrequentElementsHandler,
	starterFunctionName: "function topKFrequent(",
	order: 5,
};
