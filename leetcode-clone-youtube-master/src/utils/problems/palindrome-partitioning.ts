import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: backtrack over every prefix of the remaining suffix,
// only recursing into prefixes that are themselves palindromes.
function isPalindrome(s: string, lo: number, hi: number): boolean {
	while (lo < hi) {
		if (s[lo] !== s[hi]) return false;
		lo++;
		hi--;
	}
	return true;
}

function referencePartition(s: string): string[][] {
	const result: string[][] = [];
	const path: string[] = [];

	function backtrack(start: number) {
		if (start === s.length) {
			result.push([...path]);
			return;
		}
		for (let end = start; end < s.length; end++) {
			if (isPalindrome(s, start, end)) {
				path.push(s.slice(start, end + 1));
				backtrack(end + 1);
				path.pop();
			}
		}
	}
	backtrack(0);
	return result;
}

// The order of the partitions themselves doesn't matter, but the order of
// the pieces *within* a partition is significant (they must read left to
// right), so only the outer list is sorted here.
function normalize(partitions: string[][]): string[][] {
	return [...partitions].sort((a, b) => a.join("|").localeCompare(b.join("|")));
}

export const palindromePartitioningHandler = (fn: any) => {
	try {
		const tests: string[] = ["aab", "a", "aa", "aabb", "racecar"];

		for (const s of tests) {
			const expected = normalize(referencePartition(s));
			const result = normalize(fn(s));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from palindromePartitioningHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePalindromePartitioningJS = `function partition(s) {
  // Write your code here
};`;

export const palindromePartitioning: Problem = {
	id: "palindrome-partitioning",
	title: "154. Palindrome Partitioning",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, split it into one or more contiguous pieces such that every
    piece is a palindrome. Return every possible way to partition <code>s</code> this way.
  </p>
  <p class='mt-3'>
    Each partition is a list of the pieces in order from left to right. You may return the list of
    partitions in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "aab"`,
			outputText: `[["a","a","b"],["aa","b"]]`,
		},
		{
			id: 1,
			inputText: `s = "a"`,
			outputText: `[["a"]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 16</code></li>
  <li class='mt-2'><code>s</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodePalindromePartitioningJS,
	handlerFunction: palindromePartitioningHandler,
	starterFunctionName: "function partition(",
	order: 154,
};
