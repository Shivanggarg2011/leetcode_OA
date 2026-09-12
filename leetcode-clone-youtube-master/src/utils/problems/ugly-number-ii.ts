import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: classic dynamic-programming construction of the ugly
// number sequence using three pointers, one per prime factor.
function referenceNthUglyNumber(n: number): number {
	const ugly = [1];
	let i2 = 0;
	let i3 = 0;
	let i5 = 0;
	while (ugly.length < n) {
		const next = Math.min(ugly[i2] * 2, ugly[i3] * 3, ugly[i5] * 5);
		ugly.push(next);
		if (next === ugly[i2] * 2) i2++;
		if (next === ugly[i3] * 3) i3++;
		if (next === ugly[i5] * 5) i5++;
	}
	return ugly[n - 1];
}

export const uglyNumberIiHandler = (fn: any) => {
	try {
		const tests: number[] = [1, 2, 10, 15, 1690, 100];

		for (const n of tests) {
			const expected = referenceNthUglyNumber(n);
			const result = fn(n);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from uglyNumberIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeUglyNumberIiJS = `function nthUglyNumber(n) {
  // Write your code here
};`;

export const uglyNumberIi: Problem = {
	id: "ugly-number-ii",
	title: "146. Ugly Number II",
	problemStatement: `<p class='mt-3'>
    An <strong>ugly number</strong> is a positive integer whose only prime factors are
    <code>2</code>, <code>3</code>, and <code>5</code>. By convention, <code>1</code> is
    considered an ugly number.
  </p>
  <p class='mt-3'>
    Given an integer <code>n</code>, return the <code>n</code>th ugly number, counting them in
    increasing order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 10`,
			outputText: `12`,
			explanation: "The first 10 ugly numbers are [1,2,3,4,5,6,8,9,10,12].",
		},
		{
			id: 1,
			inputText: `n = 1`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 1690</code></li>`,
	starterCode: starterCodeUglyNumberIiJS,
	handlerFunction: uglyNumberIiHandler,
	starterFunctionName: "function nthUglyNumber(",
	order: 146,
};
