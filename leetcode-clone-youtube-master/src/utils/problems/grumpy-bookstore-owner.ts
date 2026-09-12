import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: fixed satisfied customers + sliding window of extra customers saved by the technique
function referenceMaxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
	let base = 0;
	for (let i = 0; i < customers.length; i++) {
		if (grumpy[i] === 0) base += customers[i];
	}

	let windowGain = 0;
	for (let i = 0; i < minutes && i < customers.length; i++) {
		if (grumpy[i] === 1) windowGain += customers[i];
	}
	let bestGain = windowGain;

	for (let i = minutes; i < customers.length; i++) {
		if (grumpy[i] === 1) windowGain += customers[i];
		if (grumpy[i - minutes] === 1) windowGain -= customers[i - minutes];
		bestGain = Math.max(bestGain, windowGain);
	}

	return base + bestGain;
}

export const grumpyBookstoreOwnerHandler = (fn: any) => {
	try {
		const tests: [number[], number[], number][] = [
			[[1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3],
			[[1], [0], 1],
			[[4, 10, 10], [1, 1, 0], 2],
			[[1, 2, 3, 4, 5], [0, 0, 0, 0, 0], 2],
			[[2, 4, 1, 2], [1, 1, 0, 0], 1],
		];
		for (const [customers, grumpy, minutes] of tests) {
			const expected = referenceMaxSatisfied([...customers], [...grumpy], minutes);
			const result = fn([...customers], [...grumpy], minutes);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from grumpyBookstoreOwnerHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGrumpyBookstoreOwnerJS = `function maxSatisfied(customers, grumpy, minutes) {
  // Write your code here
};`;

export const grumpyBookstoreOwner: Problem = {
	id: "grumpy-bookstore-owner",
	title: "60. Grumpy Bookstore Owner",
	problemStatement: `<p class='mt-3'>
    On the <code>i</code>-th minute, exactly <code>customers[i]</code> customers enter a bookstore.
    All those customers leave at the end of that minute.
  </p>
  <p class='mt-3'>
    On some minutes the owner is grumpy, indicated by <code>grumpy[i] === 1</code> (otherwise
    <code>grumpy[i] === 0</code>). When the owner is grumpy, the customers that minute are unsatisfied;
    otherwise, they are satisfied.
  </p>
  <p class='mt-3'>
    The owner knows a secret technique to keep himself <strong>not grumpy</strong> for
    <code>minutes</code> consecutive minutes, but can only use it once.
  </p>
  <p class='mt-3'>
    Return the <strong>maximum</strong> number of customers that can be satisfied throughout the day.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3",
			outputText: "16",
			explanation: "Using the technique on the last 3 minutes satisfies the 1+1+7+5 customers there, plus the 1+1+1 already satisfied minutes.",
		},
		{
			id: 1,
			inputText: "customers = [1], grumpy = [0], minutes = 1",
			outputText: "1",
		},
		{
			id: 2,
			inputText: "customers = [1,2,3,4,5], grumpy = [0,0,0,0,0], minutes = 2",
			outputText: "15",
			explanation: "The owner is never grumpy, so every customer is already satisfied.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= minutes <= customers.length == grumpy.length <= 2 * 10^4</code></li>
<li class='mt-2'><code>0 <= customers[i] <= 1000</code></li>
<li class='mt-2'><code>grumpy[i]</code> is either <code>0</code> or <code>1</code></li>`,
	starterCode: starterCodeGrumpyBookstoreOwnerJS,
	handlerFunction: grumpyBookstoreOwnerHandler,
	starterFunctionName: "function maxSatisfied(",
	order: 60,
};
