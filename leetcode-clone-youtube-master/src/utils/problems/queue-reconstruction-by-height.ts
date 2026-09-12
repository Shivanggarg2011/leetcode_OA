import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(people: number[][]): number[][] {
	const sorted = [...people].sort((a, b) => (b[0] !== a[0] ? b[0] - a[0] : a[1] - b[1]));
	const result: number[][] = [];
	for (const p of sorted) {
		result.splice(p[1], 0, p);
	}
	return result;
}

export const queueReconstructionByHeightHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[7, 0],
				[4, 4],
				[7, 1],
				[5, 0],
				[6, 1],
				[5, 2],
			],
			[
				[6, 0],
				[5, 0],
				[4, 0],
				[3, 2],
				[2, 2],
				[1, 4],
			],
			[[1, 0]],
			[
				[3, 0],
				[2, 0],
				[1, 0],
			],
		];
		for (const people of tests) {
			const expected = referenceSolution(people);
			const result = fn(people);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from queueReconstructionByHeightHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeQueueReconstructionByHeightJS = `function reconstructQueue(people) {
  // Write your code here
};`;

export const queueReconstructionByHeight: Problem = {
	id: "queue-reconstruction-by-height",
	title: "236. Queue Reconstruction by Height",
	problemStatement: `<p class='mt-3'>
    You are given an array of people attending a queue, <code>people</code>, where
    <code>people[i] = [h_i, k_i]</code> means the <code>i</code>-th person has height <code>h_i</code>, and
    there are exactly <code>k_i</code> other people in front of them who have a height greater than or equal
    to <code>h_i</code>.
  </p>
  <p class='mt-3'>
    Reconstruct and return the queue, represented as an array of the same <code>[h, k]</code> pairs in the
    valid order, such that every person's <code>k</code> value is satisfied.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
			outputText: "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
		},
		{
			id: 1,
			inputText: "people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
			outputText: "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= people.length <= 2000</code></li>
<li class='mt-2'><code>0 <= h_i <= 10^6</code></li>
<li class='mt-2'><code>0 <= k_i < people.length</code></li>`,
	starterCode: starterCodeQueueReconstructionByHeightJS,
	handlerFunction: queueReconstructionByHeightHandler,
	starterFunctionName: "function reconstructQueue(",
	order: 236,
};
