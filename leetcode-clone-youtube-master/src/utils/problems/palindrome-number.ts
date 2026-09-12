import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: negative numbers are never palindromes; otherwise
// compare the number's string form against its reverse.
function referenceIsPalindrome(x: number): boolean {
	if (x < 0) return false;
	const str = String(x);
	const reversed = str.split("").reverse().join("");
	return str === reversed;
}

export const palindromeNumberHandler = (fn: any) => {
	try {
		const tests = [121, -121, 10, 0, 12321, 7];
		for (const x of tests) {
			const expected = referenceIsPalindrome(x);
			const result = fn(x);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from palindromeNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePalindromeNumberJS = `function isPalindrome(x) {
  // Write your code here
};`;

export const palindromeNumber: Problem = {
	id: "palindrome-number",
	title: "261. Palindrome Number",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>x</code>, return <code>true</code> if <code>x</code> reads the same
    forwards and backwards (a <strong>palindrome</strong>), and <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    Negative numbers are never palindromes, since the minus sign would need to appear on both
    ends.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `x = 121`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `x = -121`,
			outputText: `false`,
			explanation: "Reading right to left gives 121-, which is not the same as -121.",
		},
		{
			id: 2,
			inputText: `x = 10`,
			outputText: `false`,
			explanation: "Reading right to left gives 01, which is not the same as 10.",
		},
	],
	constraints: `<li class='mt-2'><code>-2^31 <= x <= 2^31 - 1</code></li>`,
	starterCode: starterCodePalindromeNumberJS,
	handlerFunction: palindromeNumberHandler,
	starterFunctionName: "function isPalindrome(",
	order: 261,
};
