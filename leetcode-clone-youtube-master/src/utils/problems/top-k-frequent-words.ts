import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count occurrences, then sort by frequency (descending)
// breaking ties alphabetically, and take the first k. The tie-break rule is
// part of the spec, so the output order is fully determined.
function referenceTopKFrequentWords(words: string[], k: number): string[] {
	const counts = new Map<string, number>();
	for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);
	return Array.from(counts.entries())
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.slice(0, k)
		.map((entry) => entry[0]);
}

export const topKFrequentWordsHandler = (fn: any) => {
	try {
		const tests: [string[], number][] = [
			[["i", "love", "leetcode", "i", "love", "coding"], 2],
			[["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4],
			[["a", "aa", "aaa"], 1],
			[["a", "ab", "ac", "ad", "ac", "ab", "a"], 3],
			[["good", "good", "good", "great", "great", "great"], 2],
		];

		for (const [words, k] of tests) {
			const expected = referenceTopKFrequentWords([...words], k);
			const result = fn([...words], k);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from topKFrequentWordsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTopKFrequentWordsJS = `function topKFrequent(words, k) {
  // Write your code here
};`;

export const topKFrequentWords: Problem = {
	id: "top-k-frequent-words",
	title: "144. Top K Frequent Words",
	problemStatement: `<p class='mt-3'>
    Given an array of strings <code>words</code> and an integer <code>k</code>, return the
    <code>k</code> most frequent strings.
  </p>
  <p class='mt-3'>
    Order the result by frequency from highest to lowest. If two words have the same frequency,
    order them lexicographically (alphabetically ascending).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `words = ["i","love","leetcode","i","love","coding"], k = 2`,
			outputText: `["i","love"]`,
			explanation: "\"i\" and \"love\" both occur twice, which is more than any other word, and \"i\" comes before \"love\" alphabetically.",
		},
		{
			id: 1,
			inputText: `words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4`,
			outputText: `["the","is","sunny","day"]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= words.length <= 500</code></li>
  <li class='mt-2'><code>1 <= words[i].length <= 10</code></li>
  <li class='mt-2'><code>words[i]</code> consists of lowercase English letters.</li>
  <li class='mt-2'><code>k</code> is between <code>1</code> and the number of distinct words.</li>`,
	starterCode: starterCodeTopKFrequentWordsJS,
	handlerFunction: topKFrequentWordsHandler,
	starterFunctionName: "function topKFrequent(",
	order: 144,
};
