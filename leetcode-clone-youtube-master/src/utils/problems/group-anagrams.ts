import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: group strings by their sorted-character signature.
function referenceGroupAnagrams(strs: string[]): string[][] {
	const groups = new Map<string, string[]>();
	for (const str of strs) {
		const key = str.split("").sort().join("");
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key)!.push(str);
	}
	return Array.from(groups.values());
}

// Normalize a grouping result so ordering (of groups, and within groups)
// doesn't cause a false failure: sort each inner group, then sort the
// outer list of groups by their joined contents.
function normalizeGroups(groups: string[][]): string[][] {
	return groups
		.map((group) => [...group].sort())
		.sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const groupAnagramsHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["eat", "tea", "tan", "ate", "nat", "bat"],
			[""],
			["a"],
			["ddddddddddg", "dgggggggggg"],
			["bdddddddddd", "bbbbbbbbbbc"],
			["abc", "cba", "bac", "foo", "oof"],
		];
		for (const test of tests) {
			const expected = normalizeGroups(referenceGroupAnagrams(test));
			const result = normalizeGroups(fn([...test]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from groupAnagramsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGroupAnagramsJS = `function groupAnagrams(strs) {
  // Write your code here
};`;

export const groupAnagrams: Problem = {
	id: "group-anagrams",
	title: "4. Group Anagrams",
	problemStatement: `<p class='mt-3'>
    Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together.
    You can return the groups in <strong>any order</strong>, and the strings within a group can be
    in any order too.
  </p>
  <p class='mt-3'>
    Two strings are anagrams of each other if one can be rearranged (using every letter exactly
    once) to form the other.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `strs = ["eat","tea","tan","ate","nat","bat"]`,
			outputText: `[["bat"],["nat","tan"],["ate","eat","tea"]]`,
		},
		{
			id: 1,
			inputText: `strs = [""]`,
			outputText: `[[""]]`,
		},
		{
			id: 2,
			inputText: `strs = ["a"]`,
			outputText: `[["a"]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= strs.length <= 10^4</code></li>
  <li class='mt-2'><code>0 <= strs[i].length <= 100</code></li>
  <li class='mt-2'><code>strs[i]</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodeGroupAnagramsJS,
	handlerFunction: groupAnagramsHandler,
	starterFunctionName: "function groupAnagrams(",
	order: 4,
};
