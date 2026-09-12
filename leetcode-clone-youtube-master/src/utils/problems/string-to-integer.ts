import assert from "assert";
import { Problem } from "../types/problem";

function referenceMyAtoi(s: string): number {
	const INT_MAX = 2147483647;
	const INT_MIN = -2147483648;
	let i = 0;
	const n = s.length;

	while (i < n && s[i] === " ") i++;

	let sign = 1;
	if (i < n && (s[i] === "+" || s[i] === "-")) {
		if (s[i] === "-") sign = -1;
		i++;
	}

	let num = 0;
	while (i < n && s[i] >= "0" && s[i] <= "9") {
		num = num * 10 + (s.charCodeAt(i) - "0".charCodeAt(0));
		i++;
		if (sign * num >= INT_MAX) return INT_MAX;
		if (sign * num <= INT_MIN) return INT_MIN;
	}

	return sign * num;
}

export const stringToIntegerHandler = (fn: any) => {
	try {
		const tests: string[] = [
			"42",
			"   -42",
			"4193 with words",
			"words and 987",
			"-91283472332",
			"3.14159",
			"   +0 123",
			"",
			"   ",
			"2147483648",
		];

		for (const s of tests) {
			const expected = referenceMyAtoi(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from stringToIntegerHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeStringToIntegerJS = `// Do not edit function name
function myAtoi(s) {
  // Write your code here
};`;

export const stringToInteger: Problem = {
	id: "string-to-integer",
	title: "293. String to Integer (atoi)",
	problemStatement: `<p class='mt-3'>
    Implement a function <code>myAtoi(s)</code> that converts a string to a 32-bit signed integer, following the
    same general algorithm as the C/C++ <code>atoi</code> function:
  </p>
  <li class='mt-2'>Skip any leading whitespace characters.</li>
  <li class='mt-2'>An optional <code>'+'</code> or <code>'-'</code> sign may follow, determining the result's sign
    (assume positive if absent).</li>
  <li class='mt-2'>Read in as many consecutive digit characters as possible to form the numeric value; stop at the
    first non-digit character (or the end of the string). If no digits were read, the result is <code>0</code>.</li>
  <li class='mt-2'>Clamp the result so it fits within the 32-bit signed integer range
    <code>[-2^31, 2^31 - 1]</code>. Values below the range become <code>-2^31</code>, and values above become
    <code>2^31 - 1</code>.</li>
  <p class='mt-3'>Return the resulting integer.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "42"`,
			outputText: `42`,
		},
		{
			id: 1,
			inputText: `s = "   -42"`,
			outputText: `-42`,
			explanation: "Leading whitespace is skipped, then the sign and digits are read.",
		},
		{
			id: 2,
			inputText: `s = "4193 with words"`,
			outputText: `4193`,
			explanation: "Digit reading stops as soon as a non-digit character is found.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length <= 200</code></li>
  <li class='mt-2'><code>s</code> consists of English letters, digits, spaces, <code>'+'</code>, <code>'-'</code>,
    and <code>'.'</code>.</li>`,
	starterCode: starterCodeStringToIntegerJS,
	handlerFunction: stringToIntegerHandler,
	starterFunctionName: "function myAtoi(",
	order: 293,
};
