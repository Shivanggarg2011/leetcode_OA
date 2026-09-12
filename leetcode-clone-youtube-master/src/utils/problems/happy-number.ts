import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: repeatedly replace n with the sum of the squares of
// its digits, using a Set to detect cycles that never reach 1.
function referenceIsHappy(n: number): boolean {
	const seen = new Set<number>();
	let current = n;
	while (current !== 1 && !seen.has(current)) {
		seen.add(current);
		let next = 0;
		while (current > 0) {
			const digit = current % 10;
			next += digit * digit;
			current = Math.floor(current / 10);
		}
		current = next;
	}
	return current === 1;
}

export const happyNumberHandler = (fn: any) => {
	try {
		const tests = [19, 2, 1, 7, 4, 100];
		for (const n of tests) {
			const expected = referenceIsHappy(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from happyNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeHappyNumberJS = `function isHappy(n) {
  // Write your code here
};`;

export const happyNumber: Problem = {
	id: "happy-number",
	title: "256. Happy Number",
	problemStatement: `<p class='mt-3'>
    Write an algorithm to determine whether a positive integer <code>n</code> is a
    <strong>happy number</strong>.
  </p>
  <p class='mt-3'>
    Starting from <code>n</code>, repeatedly replace the number with the sum of the squares of
    its decimal digits. Keep repeating this process. The number is <strong>happy</strong> if this
    process eventually reaches <code>1</code>. If the process instead loops forever in a cycle that
    never includes <code>1</code>, the number is <strong>not happy</strong>.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if <code>n</code> is a happy number, otherwise return <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 19`,
			outputText: `true`,
			explanation: "1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1.",
		},
		{
			id: 1,
			inputText: `n = 2`,
			outputText: `false`,
			explanation: "Repeating the process from 2 falls into a cycle that never reaches 1.",
		},
		{
			id: 2,
			inputText: `n = 1`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 2^31 - 1</code></li>`,
	starterCode: starterCodeHappyNumberJS,
	handlerFunction: happyNumberHandler,
	starterFunctionName: "function isHappy(",
	order: 256,
};
