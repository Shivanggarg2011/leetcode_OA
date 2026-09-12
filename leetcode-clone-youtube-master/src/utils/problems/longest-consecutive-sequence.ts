import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: put all numbers in a set, then for each number that
// starts a run (no predecessor in the set), walk forward counting the run length.
function referenceLongestConsecutive(nums: number[]): number {
	const set = new Set(nums);
	let longest = 0;
	for (const n of set) {
		if (set.has(n - 1)) continue;
		let length = 1;
		let current = n;
		while (set.has(current + 1)) {
			current++;
			length++;
		}
		longest = Math.max(longest, length);
	}
	return longest;
}

export const longestConsecutiveSequenceHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[100, 4, 200, 1, 3, 2],
			[0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
			[],
			[1],
			[1, 2, 0, 1],
			[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
		];
		for (const test of tests) {
			const expected = referenceLongestConsecutive(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestConsecutiveSequenceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestConsecutiveSequenceJS = `function longestConsecutive(nums) {
  // Write your code here
};`;

export const longestConsecutiveSequence: Problem = {
	id: "longest-consecutive-sequence",
	title: "7. Longest Consecutive Sequence",
	problemStatement: `<p class='mt-3'>
    Given an unsorted array of integers <code>nums</code>, return the length of the longest
    consecutive elements sequence (a run of integers that each differ from the next by exactly 1).
  </p>
  <p class='mt-3'>
    The elements of the sequence do not need to appear next to each other in the array, and your
    algorithm should run in <code>O(n)</code> time.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [100,4,200,1,3,2]`,
			outputText: `4`,
			explanation: "The longest consecutive sequence is [1, 2, 3, 4].",
		},
		{
			id: 1,
			inputText: `nums = [0,3,7,2,5,8,4,6,0,1]`,
			outputText: `9`,
		},
		{
			id: 2,
			inputText: `nums = []`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-10^9 <= nums[i] <= 10^9</code></li>`,
	starterCode: starterCodeLongestConsecutiveSequenceJS,
	handlerFunction: longestConsecutiveSequenceHandler,
	starterFunctionName: "function longestConsecutive(",
	order: 7,
};
