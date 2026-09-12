import assert from "assert";
import { Problem } from "../types/problem";

export const reverseVowelsOfAStringHandler = (fn: any) => {
	try {
		function referenceSolution(s: string): string {
			const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
			const chars = s.split("");
			let lo = 0;
			let hi = chars.length - 1;
			while (lo < hi) {
				if (!vowels.has(chars[lo])) {
					lo++;
				} else if (!vowels.has(chars[hi])) {
					hi--;
				} else {
					const tmp = chars[lo];
					chars[lo] = chars[hi];
					chars[hi] = tmp;
					lo++;
					hi--;
				}
			}
			return chars.join("");
		}

		const tests = ["hello", "leetcode", "aA", "programming", "DesignGurus", "xyz"];

		for (const s of tests) {
			const expected = referenceSolution(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reverseVowelsOfAStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReverseVowelsOfAStringJS = `function reverseVowels(s) {
  // Write your code here
};`;

export const reverseVowelsOfAString: Problem = {
	id: "reverse-vowels-of-a-string",
	title: "46. Reverse Vowels of a String",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, reverse only the vowel characters within it
    (<code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, <code>'u'</code>, in
    either upper or lower case, and each may appear more than once), and return the result.
  </p>
  <p class='mt-3'>Consonants and every other character must stay in their original positions.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "hello"`,
			outputText: `"holle"`,
		},
		{
			id: 1,
			inputText: `s = "leetcode"`,
			outputText: `"leotcede"`,
		},
		{
			id: 2,
			inputText: `s = "aA"`,
			outputText: `"Aa"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 3 * 10^5</code></li>
  <li class='mt-2'><code>s</code> consists of printable ASCII characters.</li>`,
	starterCode: starterCodeReverseVowelsOfAStringJS,
	handlerFunction: reverseVowelsOfAStringHandler,
	starterFunctionName: "function reverseVowels(",
	order: 46,
};
