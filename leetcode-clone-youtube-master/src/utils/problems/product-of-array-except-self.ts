import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: for each index, the answer is the product of all
// prefix elements before it times the product of all suffix elements after it.
function referenceProductExceptSelf(nums: number[]): number[] {
	const n = nums.length;
	const result = new Array(n).fill(1);
	let prefix = 1;
	for (let i = 0; i < n; i++) {
		result[i] = prefix;
		prefix *= nums[i];
	}
	let suffix = 1;
	for (let i = n - 1; i >= 0; i--) {
		result[i] *= suffix;
		suffix *= nums[i];
	}
	return result;
}

export const productOfArrayExceptSelfHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 3, 4],
			[-1, 1, 0, -3, 3],
			[2, 3],
			[1, 1, 1, 1],
			[5, 0, 0],
			[4, -2, 6, 3, -5],
		];
		for (const test of tests) {
			const expected = referenceProductExceptSelf(test);
			const result = fn([...test]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from productOfArrayExceptSelfHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeProductOfArrayExceptSelfJS = `function productExceptSelf(nums) {
  // Write your code here
};`;

export const productOfArrayExceptSelf: Problem = {
	id: "product-of-array-except-self",
	title: "6. Product of Array Except Self",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, return an array <code>answer</code> such that
    <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code>
    except <code>nums[i]</code>.
  </p>
  <p class='mt-3'>
    You must write an algorithm that runs in <code>O(n)</code> time and does not use the division
    operation.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3,4]`,
			outputText: `[24,12,8,6]`,
		},
		{
			id: 1,
			inputText: `nums = [-1,1,0,-3,3]`,
			outputText: `[0,0,9,0,0]`,
		},
		{
			id: 2,
			inputText: `nums = [2,3]`,
			outputText: `[3,2]`,
		},
	],
	constraints: `<li class='mt-2'><code>2 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-30 <= nums[i] <= 30</code></li>
  <li class='mt-2'>The product of any prefix or suffix of <code>nums</code> fits in a 32-bit integer.</li>`,
	starterCode: starterCodeProductOfArrayExceptSelfJS,
	handlerFunction: productOfArrayExceptSelfHandler,
	starterFunctionName: "function productExceptSelf(",
	order: 6,
};
