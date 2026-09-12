import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: backtracking, trying 1-3 digit segments that form a
// valid 0-255 octet with no illegal leading zero (unless the segment is "0").
function referenceRestoreIpAddresses(s: string): string[] {
	const results: string[] = [];
	const parts: string[] = [];

	function isValidSegment(segment: string): boolean {
		if (segment.length === 0 || segment.length > 3) return false;
		if (segment.length > 1 && segment[0] === "0") return false;
		return Number(segment) <= 255;
	}

	function backtrack(start: number) {
		if (parts.length === 4) {
			if (start === s.length) results.push(parts.join("."));
			return;
		}
		for (let len = 1; len <= 3 && start + len <= s.length; len++) {
			const segment = s.slice(start, start + len);
			if (!isValidSegment(segment)) continue;
			parts.push(segment);
			backtrack(start + len);
			parts.pop();
		}
	}

	backtrack(0);
	return results;
}

function normalize(addresses: string[]): string[] {
	return [...addresses].sort();
}

export const restoreIpAddressesHandler = (fn: any) => {
	try {
		const tests: string[] = ["25525511135", "0000", "101023", "1111", "010010", "255255255255"];
		for (const s of tests) {
			const expected = normalize(referenceRestoreIpAddresses(s));
			const result = normalize(fn(s));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from restoreIpAddressesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRestoreIpAddressesJS = `function restoreIpAddresses(s) {
  // Write your code here
};`;

export const restoreIpAddresses: Problem = {
	id: "restore-ip-addresses",
	title: "160. Restore IP Addresses",
	problemStatement: `<p class='mt-3'>
    A valid IPv4 address is made of four numbers, each between <code>0</code> and <code>255</code>,
    separated by dots, and none of the numbers may have a leading zero (so <code>"0"</code> is fine
    but <code>"01"</code> is not).
  </p>
  <p class='mt-3'>
    Given a string <code>s</code> made only of digits, insert dots into <code>s</code> to form every
    possible valid IPv4 address that uses <strong>all</strong> the digits of <code>s</code>, each
    exactly once. Return the resulting addresses in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "25525511135"`,
			outputText: `["255.255.11.135","255.255.111.35"]`,
		},
		{
			id: 1,
			inputText: `s = "0000"`,
			outputText: `["0.0.0.0"]`,
		},
		{
			id: 2,
			inputText: `s = "101023"`,
			outputText: `["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 20</code></li>
  <li class='mt-2'><code>s</code> consists of digits only.</li>`,
	starterCode: starterCodeRestoreIpAddressesJS,
	handlerFunction: restoreIpAddressesHandler,
	starterFunctionName: "function restoreIpAddresses(",
	order: 160,
};
