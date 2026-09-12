import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: stack; pop when the current character matches the top
function referenceRemoveDuplicates(s: string): string {
	const stack: string[] = [];
	for (const ch of s) {
		if (stack.length > 0 && stack[stack.length - 1] === ch) {
			stack.pop();
		} else {
			stack.push(ch);
		}
	}
	return stack.join("");
}

export const removeAllAdjacentDuplicatesInStringHandler = (fn: any) => {
	try {
		const tests: string[] = ["abbaca", "azxxzy", "aaaaaaaa", "a", "abcdef", "aabbccddccbbaa"];
		for (const s of tests) {
			const expected = referenceRemoveDuplicates(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeAllAdjacentDuplicatesInStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveAllAdjacentDuplicatesInStringJS = `function removeDuplicates(s) {
  // Write your code here
};`;

export const removeAllAdjacentDuplicatesInString: Problem = {
	id: "remove-all-adjacent-duplicates-in-string",
	title: "73. Remove All Adjacent Duplicates In String",
	problemStatement: `<p class='mt-3'>
    You are given a string <code>s</code> consisting of lowercase English letters. A
    <strong>duplicate removal</strong> operation picks two <strong>adjacent and equal</strong>
    letters and removes both of them.
  </p>
  <p class='mt-3'>
    Repeatedly perform duplicate removal operations on <code>s</code> until no more can be made.
    Return the final resulting string. It is guaranteed the answer is unique.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "abbaca"`,
			outputText: `"ca"`,
			explanation: `Removing "bb" gives "aaca". Removing "aa" gives "ca".`,
		},
		{
			id: 1,
			inputText: `s = "azxxzy"`,
			outputText: `"ay"`,
			explanation: `Removing "xx" gives "azzy", then removing "zz" gives "ay".`,
		},
		{
			id: 2,
			inputText: `s = "aaaaaaaa"`,
			outputText: `""`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^5</code></li>
<li class='mt-2'><code>s</code> consists only of lowercase English letters</li>`,
	starterCode: starterCodeRemoveAllAdjacentDuplicatesInStringJS,
	handlerFunction: removeAllAdjacentDuplicatesInStringHandler,
	starterFunctionName: "function removeDuplicates(",
	order: 73,
};
