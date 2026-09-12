import assert from "assert";
import { Problem } from "../types/problem";

const DIGIT_LETTERS: Record<string, string> = {
	"2": "abc",
	"3": "def",
	"4": "ghi",
	"5": "jkl",
	"6": "mno",
	"7": "pqrs",
	"8": "tuv",
	"9": "wxyz",
};

// Reference solution: standard backtracking over each digit's letters.
function referenceLetterCombinations(digits: string): string[] {
	if (digits.length === 0) return [];
	const result: string[] = [];
	const path: string[] = [];

	function backtrack(index: number) {
		if (index === digits.length) {
			result.push(path.join(""));
			return;
		}
		const letters = DIGIT_LETTERS[digits[index]];
		for (const letter of letters) {
			path.push(letter);
			backtrack(index + 1);
			path.pop();
		}
	}

	backtrack(0);
	return result;
}

export const letterCombinationsOfAPhoneNumberHandler = (fn: any) => {
	try {
		const tests: string[] = ["23", "", "2", "9", "79", "234"];
		for (const digits of tests) {
			const expected = [...referenceLetterCombinations(digits)].sort();
			const result = [...fn(digits)].sort();
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from letterCombinationsOfAPhoneNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLetterCombinationsOfAPhoneNumberJS = `function letterCombinations(digits) {
  // Write your code here
};`;

export const letterCombinationsOfAPhoneNumber: Problem = {
	id: "letter-combinations-of-a-phone-number",
	title: "155. Letter Combinations of a Phone Number",
	problemStatement: `<p class='mt-3'>
    You are given a string <code>digits</code> containing only the digits <code>2</code> through
    <code>9</code>. Each digit maps to a set of letters, just like on an old telephone keypad:
  </p>
  <p class='mt-3'>
    <code>2</code> -> "abc", <code>3</code> -> "def", <code>4</code> -> "ghi", <code>5</code> -> "jkl",
    <code>6</code> -> "mno", <code>7</code> -> "pqrs", <code>8</code> -> "tuv", <code>9</code> -> "wxyz".
  </p>
  <p class='mt-3'>
    Return <em>all possible letter combinations</em> that the number could represent, considering one
    letter choice per digit, in <strong>any order</strong>. If <code>digits</code> is an empty string,
    return an empty array.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `digits = "23"`,
			outputText: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`,
			explanation: "Digit 2 maps to a/b/c and digit 3 maps to d/e/f, so every combination of one letter from each is produced.",
		},
		{
			id: 1,
			inputText: `digits = ""`,
			outputText: `[]`,
		},
		{
			id: 2,
			inputText: `digits = "2"`,
			outputText: `["a","b","c"]`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= digits.length <= 4</code></li>
  <li class='mt-2'><code>digits[i]</code> is a digit in the range <code>['2', '9']</code>.</li>`,
	starterCode: starterCodeLetterCombinationsOfAPhoneNumberJS,
	handlerFunction: letterCombinationsOfAPhoneNumberHandler,
	starterFunctionName: "function letterCombinations(",
	order: 155,
};
