import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s: string): number[] {
	const last: Record<string, number> = {};
	for (let i = 0; i < s.length; i++) last[s[i]] = i;
	const result: number[] = [];
	let start = 0;
	let end = 0;
	for (let i = 0; i < s.length; i++) {
		end = Math.max(end, last[s[i]]);
		if (i === end) {
			result.push(end - start + 1);
			start = i + 1;
		}
	}
	return result;
}

export const partitionLabelsHandler = (fn: any) => {
	try {
		const tests = ["ababcbacadefegdehijhklij", "eccbbbbdec", "a", "abcabc", "caedbdedda"];
		for (const s of tests) {
			const expected = referenceSolution(s);
			const result = fn(s);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from partitionLabelsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePartitionLabelsJS = `function partitionLabels(s) {
  // Write your code here
};`;

export const partitionLabels: Problem = {
	id: "partition-labels",
	title: "239. Partition Labels",
	problemStatement: `<p class='mt-3'>
    You are given a string <code>s</code> consisting only of lowercase English letters. Split <code>s</code>
    into as many parts as possible so that each letter appears in at most one part, while using every
    character of <code>s</code> exactly once across the parts (each part is a contiguous substring).
  </p>
  <p class='mt-3'>
    Return an array of integers representing the size of each part, in the order the parts occur in
    <code>s</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "s = \"ababcbacadefegdehijhklij\"",
			outputText: "[9,7,8]",
			explanation: "The partitions are \"ababcbaca\", \"defegde\", \"hijhklij\".",
		},
		{
			id: 1,
			inputText: "s = \"eccbbbbdec\"",
			outputText: "[10]",
			explanation: "The whole string must be one part because 'e' appears both at the start and near the end.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 500</code></li>
<li class='mt-2'><code>s</code> consists of lowercase English letters</li>`,
	starterCode: starterCodePartitionLabelsJS,
	handlerFunction: partitionLabelsHandler,
	starterFunctionName: "function partitionLabels(",
	order: 239,
};
