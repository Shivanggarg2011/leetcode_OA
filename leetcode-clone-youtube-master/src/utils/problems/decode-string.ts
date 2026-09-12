import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: stack of {count, string-so-far} frames
function referenceDecodeString(s: string): string {
	const countStack: number[] = [];
	const stringStack: string[] = [];
	let current = "";
	let num = 0;

	for (const ch of s) {
		if (ch >= "0" && ch <= "9") {
			num = num * 10 + Number(ch);
		} else if (ch === "[") {
			countStack.push(num);
			stringStack.push(current);
			num = 0;
			current = "";
		} else if (ch === "]") {
			const repeat = countStack.pop()!;
			const prev = stringStack.pop()!;
			current = prev + current.repeat(repeat);
		} else {
			current += ch;
		}
	}
	return current;
}

export const decodeStringHandler = (fn: any) => {
	try {
		const tests: string[] = [
			"3[a]2[bc]",
			"3[a2[c]]",
			"2[abc]3[cd]ef",
			"abc",
			"2[b3[a]]",
			"10[a]",
		];
		for (const s of tests) {
			const expected = referenceDecodeString(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from decodeStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDecodeStringJS = `function decodeString(s) {
  // Write your code here
};`;

export const decodeString: Problem = {
	id: "decode-string",
	title: "72. Decode String",
	problemStatement: `<p class='mt-3'>
    Given an encoded string <code>s</code>, return its decoded string.
  </p>
  <p class='mt-3'>
    The encoding rule is <code>k[encoded_string]</code>, meaning the <code>encoded_string</code>
    inside the square brackets is repeated exactly <code>k</code> times. <code>k</code> is guaranteed
    to be a positive integer.
  </p>
  <p class='mt-3'>
    You may assume the input string is always valid and does not contain extra spaces; square
    brackets are well-formed and nesting is allowed, e.g. <code>3[a2[c]]</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "3[a]2[bc]"`,
			outputText: `"aaabcbc"`,
		},
		{
			id: 1,
			inputText: `s = "3[a2[c]]"`,
			outputText: `"accaccacc"`,
		},
		{
			id: 2,
			inputText: `s = "2[abc]3[cd]ef"`,
			outputText: `"abcabccdcdcdef"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 30</code></li>
<li class='mt-2'><code>s</code> consists of lowercase English letters, digits, and square brackets <code>[]</code></li>
<li class='mt-2'>The decoded output will have length at most <code>3 * 10^5</code></li>`,
	starterCode: starterCodeDecodeStringJS,
	handlerFunction: decodeStringHandler,
	starterFunctionName: "function decodeString(",
	order: 72,
};
