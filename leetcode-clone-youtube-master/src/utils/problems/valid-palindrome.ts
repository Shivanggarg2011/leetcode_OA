import assert from "assert";
import { Problem } from "../types/problem";

export const validPalindromeHandler = (fn: any) => {
	try {
		function referenceSolution(s: string): boolean {
			const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
			let i = 0;
			let j = cleaned.length - 1;
			while (i < j) {
				if (cleaned[i] !== cleaned[j]) return false;
				i++;
				j--;
			}
			return true;
		}

		const tests = ["A man, a plan, a canal: Panama", "race a car", " ", "0P", "ab_a", ".,"];

		for (const s of tests) {
			const expected = referenceSolution(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from validPalindromeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidPalindromeJS = `function isPalindrome(s) {
  // Write your code here
};`;

export const validPalindrome: Problem = {
	id: "valid-palindrome",
	title: "32. Valid Palindrome",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return <code>true</code> if it is a palindrome after the following
    processing: convert all uppercase letters to lowercase, and remove all characters that are not
    letters or digits.
  </p>
  <p class='mt-3'>An empty string (after processing) is considered a valid palindrome.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "A man, a plan, a canal: Panama"`,
			outputText: "true",
			explanation: `After removing non-alphanumeric characters: "amanaplanacanalpanama", which is a palindrome.`,
		},
		{
			id: 1,
			inputText: `s = "race a car"`,
			outputText: "false",
			explanation: `"raceacar" is not a palindrome.`,
		},
		{
			id: 2,
			inputText: `s = " "`,
			outputText: "true",
			explanation: "After removing non-alphanumeric characters, s is an empty string, which is a palindrome.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 2 * 10^5</code></li>
  <li class='mt-2'><code>s</code> consists only of printable ASCII characters.</li>`,
	starterCode: starterCodeValidPalindromeJS,
	handlerFunction: validPalindromeHandler,
	starterFunctionName: "function isPalindrome(",
	order: 32,
};
