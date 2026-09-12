import assert from "assert";
import { Problem } from "../types/problem";

function referenceCompareVersion(version1: string, version2: string): number {
	const parts1 = version1.split(".");
	const parts2 = version2.split(".");
	const len = Math.max(parts1.length, parts2.length);

	for (let i = 0; i < len; i++) {
		const num1 = i < parts1.length ? parseInt(parts1[i], 10) : 0;
		const num2 = i < parts2.length ? parseInt(parts2[i], 10) : 0;
		if (num1 > num2) return 1;
		if (num1 < num2) return -1;
	}
	return 0;
}

export const compareVersionNumbersHandler = (fn: any) => {
	try {
		const tests: { v1: string; v2: string }[] = [
			{ v1: "1.01", v2: "1.001" },
			{ v1: "1.0", v2: "1.0.0" },
			{ v1: "0.1", v2: "1.1" },
			{ v1: "1.0.1", v2: "1" },
			{ v1: "7.5.2.4", v2: "7.5.3" },
			{ v1: "1.0.0.0.0", v2: "1" },
		];

		for (const test of tests) {
			const expected = referenceCompareVersion(test.v1, test.v2);
			const result = fn(test.v1, test.v2);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from compareVersionNumbersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCompareVersionNumbersJS = `// Do not edit function name
function compareVersion(version1, version2) {
  // Write your code here
};`;

export const compareVersionNumbers: Problem = {
	id: "compare-version-numbers",
	title: "295. Compare Version Numbers",
	problemStatement: `<p class='mt-3'>
    A version number is a string containing one or more revisions, each made up of digits, separated by dots
    <code>'.'</code>. Each revision's numeric value is formed by dropping any leading zeros; a revision that is
    missing entirely (past the end of a shorter version string) is treated as <code>0</code>.
  </p>
  <p class='mt-3'>
    Given two version strings <code>version1</code> and <code>version2</code>, compare them by their revisions in
    order. Return <code>-1</code> if <code>version1 &lt; version2</code>, <code>1</code> if
    <code>version1 &gt; version2</code>, and <code>0</code> if they are equal.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `version1 = "1.01", version2 = "1.001"`,
			outputText: `0`,
			explanation: "Ignoring leading zeros, revision 2 of both versions is 1, so they are equal.",
		},
		{
			id: 1,
			inputText: `version1 = "1.0", version2 = "1.0.0"`,
			outputText: `0`,
			explanation: "version2's missing third revision is treated as 0.",
		},
		{
			id: 2,
			inputText: `version1 = "0.1", version2 = "1.1"`,
			outputText: `-1`,
			explanation: "The first revision 0 is less than 1.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= version1.length, version2.length <= 500</code></li>
  <li class='mt-2'>Each version string consists of digits and dots <code>'.'</code>.</li>
  <li class='mt-2'>Every revision contains at least one digit, and the numeric value of every revision fits in a
    32-bit integer.</li>`,
	starterCode: starterCodeCompareVersionNumbersJS,
	handlerFunction: compareVersionNumbersHandler,
	starterFunctionName: "function compareVersion(",
	order: 295,
};
