import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sort then sliding window on the "budget" needed to raise the whole window to nums[right]
function referenceMaxFrequency(nums: number[], k: number): number {
	const sorted = [...nums].sort((a, b) => a - b);
	let left = 0;
	let sum = 0;
	let best = 1;
	for (let right = 0; right < sorted.length; right++) {
		sum += sorted[right];
		while (sorted[right] * (right - left + 1) - sum > k) {
			sum -= sorted[left];
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
}

export const frequencyOfTheMostFrequentElementHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 4], 5],
			[[1, 4, 8, 13], 5],
			[[3, 9, 6], 2],
			[[1, 1, 1], 0],
			[[1, 2, 3, 4], 10],
			[[10, 20, 30], 0],
		];
		for (const [nums, k] of tests) {
			const expected = referenceMaxFrequency([...nums], k);
			const result = fn([...nums], k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from frequencyOfTheMostFrequentElementHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFrequencyOfTheMostFrequentElementJS = `function maxFrequency(nums, k) {
  // Write your code here
};`;

export const frequencyOfTheMostFrequentElement: Problem = {
	id: "frequency-of-the-most-frequent-element",
	title: "61. Frequency of the Most Frequent Element",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code> and an integer <code>k</code>.
  </p>
  <p class='mt-3'>
    In one operation, you may choose one element of <code>nums</code> and increase it by
    <code>1</code>. You may perform this operation at most <code>k</code> times in total (each
    operation can target any element, and the same element may be chosen more than once).
  </p>
  <p class='mt-3'>
    Return the <strong>maximum possible frequency</strong> of any single value in the array after
    performing at most <code>k</code> operations.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,2,4], k = 5",
			outputText: "3",
			explanation: "Increase the first element three times and the second element two times to make [4,4,4].",
		},
		{
			id: 1,
			inputText: "nums = [1,4,8,13], k = 5",
			outputText: "2",
		},
		{
			id: 2,
			inputText: "nums = [3,9,6], k = 2",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
<li class='mt-2'><code>1 <= nums[i] <= 10^5</code></li>
<li class='mt-2'><code>0 <= k <= 10^5</code></li>`,
	starterCode: starterCodeFrequencyOfTheMostFrequentElementJS,
	handlerFunction: frequencyOfTheMostFrequentElementHandler,
	starterFunctionName: "function maxFrequency(",
	order: 61,
};
