import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: standard binary search against the provided isBadVersion oracle
function referenceFirstBadVersion(isBadVersion: (v: number) => boolean, n: number): number {
	let lo = 1;
	let hi = n;
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if (isBadVersion(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
}

export const firstBadVersionHandler = (fn: any) => {
	try {
		const tests: { n: number; firstBad: number }[] = [
			{ n: 5, firstBad: 4 },
			{ n: 1, firstBad: 1 },
			{ n: 2000000000, firstBad: 1702766719 },
			{ n: 10, firstBad: 1 },
			{ n: 3, firstBad: 3 },
		];
		for (const { n, firstBad } of tests) {
			const isBadVersion = (version: number) => version >= firstBad;
			const expected = referenceFirstBadVersion(isBadVersion, n);
			const result = fn(isBadVersion, n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from firstBadVersionHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFirstBadVersionJS = `// isBadVersion(version) is provided and returns true if the given version is bad
function firstBadVersion(isBadVersion, n) {
  // Write your code here
};`;

export const firstBadVersion: Problem = {
	id: "first-bad-version",
	title: "90. First Bad Version",
	problemStatement: `<p class='mt-3'>
    You are the release manager for a product and have <code>n</code> versions numbered from
    <code>1</code> to <code>n</code>, released in order. At some point a version was flagged bad, and
    every version after it is also bad (since it was built on top of the bad version).
  </p>
  <p class='mt-3'>
    You are given a function <code>isBadVersion(version)</code> that returns <code>true</code> if the
    given version is bad. Implement a function that finds and returns the <strong>first</strong> bad
    version, while calling <code>isBadVersion</code> as few times as possible.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "n = 5, firstBadVersion = 4",
			outputText: "4",
			explanation: "Calling isBadVersion(3) returns false and isBadVersion(4) returns true, so 4 is the first bad version.",
		},
		{
			id: 1,
			inputText: "n = 1, firstBadVersion = 1",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 2^31 - 1</code></li>
<li class='mt-2'><code>1 <= firstBadVersion <= n</code></li>`,
	starterCode: starterCodeFirstBadVersionJS,
	handlerFunction: firstBadVersionHandler,
	starterFunctionName: "function firstBadVersion(",
	order: 90,
};
