import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: brute-force sum of pairwise Hamming distances. Test
// arrays are small, so this O(n^2) approach is efficient and obviously
// correct.
function hammingDistance(a: number, b: number): number {
	let xorValue = a ^ b;
	let count = 0;
	while (xorValue !== 0) {
		count += xorValue & 1;
		xorValue >>>= 1;
	}
	return count;
}

function referenceTotalHammingDistance(nums: number[]): number {
	let total = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			total += hammingDistance(nums[i], nums[j]);
		}
	}
	return total;
}

export const totalHammingDistanceHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[4, 14, 2],
			[4, 14, 4],
			[0, 0],
			[1],
			[1, 2, 3, 4, 5],
			[0, 1, 2, 3],
		];
		for (const nums of tests) {
			const expected = referenceTotalHammingDistance([...nums]);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from totalHammingDistanceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTotalHammingDistanceJS = `function totalHammingDistance(nums) {
  // Write your code here
};`;

export const totalHammingDistance: Problem = {
	id: "total-hamming-distance",
	title: "271. Total Hamming Distance",
	problemStatement: `<p class='mt-3'>
    The <strong>Hamming distance</strong> between two integers is the number of positions at
    which their binary representations differ.
  </p>
  <p class='mt-3'>
    Given an integer array <code>nums</code>, return the sum of the Hamming distances between
    every pair of numbers in the array (each unordered pair counted once).
  </p>
  <p class='mt-3'>
    A brute-force double loop works but is <code>O(n^2)</code>; for a faster approach, consider
    counting, for each bit position, how many numbers have a <code>0</code> versus a
    <code>1</code> there.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [4,14,2]`,
			outputText: `6`,
			explanation:
				"4 = 0100, 14 = 1110, 2 = 0010. HammingDistance(4,14)=2, HammingDistance(4,2)=2, HammingDistance(14,2)=2, total = 6.",
		},
		{
			id: 1,
			inputText: `nums = [4,14,4]`,
			outputText: `4`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 10^9</code></li>
  <li class='mt-2'>The answer fits within a 32-bit integer.</li>`,
	starterCode: starterCodeTotalHammingDistanceJS,
	handlerFunction: totalHammingDistanceHandler,
	starterFunctionName: "function totalHammingDistance(",
	order: 271,
};
