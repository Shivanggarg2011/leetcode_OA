import assert from "assert";
import { Problem } from "../types/problem";

function referenceLengthOfLastWord(s: string): number {
	let i = s.length - 1;
	while (i >= 0 && s[i] === " ") i--;
	let length = 0;
	while (i >= 0 && s[i] !== " ") {
		length++;
		i--;
	}
	return length;
}

export const lengthOfLastWordHandler = (fn: any) => {
	try {
		const tests: string[] = [
			"Hello World",
			"   fly me   to   the moon  ",
			"luffy is still joyboy",
			"a",
			"   a   ",
			"day  ",
		];

		for (const s of tests) {
			const expected = referenceLengthOfLastWord(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lengthOfLastWordHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLengthOfLastWordJS = `// Do not edit function name
function lengthOfLastWord(s) {
  // Write your code here
};`;

export const lengthOfLastWord: Problem = {
	id: "length-of-last-word",
	title: "302. Length of Last Word",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code> consisting of words separated by one or more spaces, return the length of the
    <strong>last</strong> word in the string.
  </p>
  <p class='mt-3'>
    A word is a maximal substring of non-space characters. The string may contain leading or trailing spaces.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "Hello World"`,
			outputText: `5`,
		},
		{
			id: 1,
			inputText: `s = "   fly me   to   the moon  "`,
			outputText: `4`,
			explanation: "The last word is \"moon\", which has length 4.",
		},
		{
			id: 2,
			inputText: `s = "luffy is still joyboy"`,
			outputText: `6`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^4</code></li>
  <li class='mt-2'><code>s</code> consists of English letters and spaces <code>' '</code>.</li>
  <li class='mt-2'>There is at least one word in <code>s</code>.</li>`,
	starterCode: starterCodeLengthOfLastWordJS,
	handlerFunction: lengthOfLastWordHandler,
	starterFunctionName: "function lengthOfLastWord(",
	order: 302,
};
