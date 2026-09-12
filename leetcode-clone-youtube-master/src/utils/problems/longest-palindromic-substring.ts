import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: expand around each center (odd and even length).
function referenceLongestPalindrome(s: string): string {
	if (s.length === 0) return "";
	let start = 0;
	let end = 0;

	function expand(l: number, r: number): [number, number] {
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			l--;
			r++;
		}
		return [l + 1, r - 1];
	}

	for (let i = 0; i < s.length; i++) {
		const [l1, r1] = expand(i, i);
		if (r1 - l1 > end - start) {
			start = l1;
			end = r1;
		}
		const [l2, r2] = expand(i, i + 1);
		if (r2 - l2 > end - start) {
			start = l2;
			end = r2;
		}
	}

	return s.slice(start, end + 1);
}

function isPalindrome(str: string): boolean {
	let l = 0;
	let r = str.length - 1;
	while (l < r) {
		if (str[l] !== str[r]) return false;
		l++;
		r--;
	}
	return true;
}

export const longestPalindromicSubstringHandler = (fn: any) => {
	try {
		const tests: string[] = ["babad", "cbbd", "a", "ac", "forgeeksskeegfor", "aaaa"];
		for (const s of tests) {
			const expected = referenceLongestPalindrome(s);
			const result = fn(s);
			// Multiple maximal-length palindromic substrings can be valid, so
			// check the result is a genuine palindromic substring of s with the
			// same (optimal) length, rather than requiring an exact string match.
			assert.equal(typeof result, "string");
			assert.ok(s.includes(result), `"${result}" is not a substring of "${s}"`);
			assert.ok(isPalindrome(result), `"${result}" is not a palindrome`);
			assert.equal(result.length, expected.length);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestPalindromicSubstringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestPalindromicSubstringJS = `function longestPalindrome(s) {
  // Write your code here
};`;

export const longestPalindromicSubstring: Problem = {
	id: "longest-palindromic-substring",
	title: "195. Longest Palindromic Substring",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return the longest substring of <code>s</code> that reads the same
    forwards and backwards (a <strong>palindrome</strong>).
  </p>
  <p class='mt-3'>
    If there is more than one longest palindromic substring, you may return any one of them.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "babad"`,
			outputText: `"bab"`,
			explanation: `"aba" is also a valid answer since it has the same length.`,
		},
		{
			id: 1,
			inputText: `s = "cbbd"`,
			outputText: `"bb"`,
		},
		{
			id: 2,
			inputText: `s = "a"`,
			outputText: `"a"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 1000</code></li>
  <li class='mt-2'><code>s</code> consists only of digits and English letters.</li>`,
	starterCode: starterCodeLongestPalindromicSubstringJS,
	handlerFunction: longestPalindromicSubstringHandler,
	starterFunctionName: "function longestPalindrome(",
	order: 195,
};
