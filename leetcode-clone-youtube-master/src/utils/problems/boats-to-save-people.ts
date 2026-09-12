import assert from "assert";
import { Problem } from "../types/problem";

export const boatsToSavePeopleHandler = (fn: any) => {
	try {
		function referenceSolution(people: number[], limit: number): number {
			const sorted = [...people].sort((a, b) => a - b);
			let lo = 0;
			let hi = sorted.length - 1;
			let boats = 0;
			while (lo <= hi) {
				if (sorted[lo] + sorted[hi] <= limit) {
					lo++;
				}
				hi--;
				boats++;
			}
			return boats;
		}

		const tests: [number[], number][] = [
			[[1, 2], 3],
			[[3, 2, 2, 1], 3],
			[[3, 5, 3, 4], 5],
			[[5, 1, 4, 2], 6],
			[[1, 1, 1, 1], 2],
		];

		for (const [people, limit] of tests) {
			const expected = referenceSolution(people, limit);
			const result = fn([...people], limit);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from boatsToSavePeopleHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBoatsToSavePeopleJS = `function numRescueBoats(people, limit) {
  // Write your code here
};`;

export const boatsToSavePeople: Problem = {
	id: "boats-to-save-people",
	title: "43. Boats to Save People",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>people</code> where <code>people[i]</code> is the weight of the
    <code>i</code>-th person, and an integer <code>limit</code> denoting the maximum weight a single
    boat can carry.
  </p>
  <p class='mt-3'>
    Each boat carries at most two people at once, as long as the sum of their weights does not exceed
    <code>limit</code>. Return the minimum number of boats needed to carry everyone across.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "people = [1,2], limit = 3",
			outputText: "1",
			explanation: "One boat carries both people (1 + 2 <= 3).",
		},
		{
			id: 1,
			inputText: "people = [3,2,2,1], limit = 3",
			outputText: "3",
			explanation: "One boat carries [1,2], another carries [2], and another carries [3].",
		},
		{
			id: 2,
			inputText: "people = [3,5,3,4], limit = 5",
			outputText: "4",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= people.length <= 5 * 10^4</code></li>
  <li class='mt-2'><code>1 <= people[i] <= limit <= 3 * 10^4</code></li>`,
	starterCode: starterCodeBoatsToSavePeopleJS,
	handlerFunction: boatsToSavePeopleHandler,
	starterFunctionName: "function numRescueBoats(",
	order: 43,
};
