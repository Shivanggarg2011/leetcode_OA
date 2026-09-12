import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution used to compute expected outputs for the handler tests.
function referenceSolution(triplets: number[][], target: number[]): boolean {
	let a = 0,
		b = 0,
		c = 0;
	for (const t of triplets) {
		if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
			a = Math.max(a, t[0]);
			b = Math.max(b, t[1]);
			c = Math.max(c, t[2]);
		}
	}
	return a === target[0] && b === target[1] && c === target[2];
}

export const mergeTripletsToFormTargetTripletHandler = (fn: any) => {
	try {
		const tests: [number[][], number[]][] = [
			[
				[
					[2, 5, 3],
					[1, 8, 4],
					[1, 7, 5],
				],
				[2, 7, 5],
			],
			[
				[
					[3, 4, 5],
					[4, 5, 6],
				],
				[3, 2, 5],
			],
			[
				[
					[2, 5, 3],
					[2, 3, 4],
					[1, 2, 5],
					[5, 2, 3],
				],
				[5, 5, 5],
			],
			[[[5, 5, 5]], [1, 1, 1]],
			[[[1, 1, 1]], [1, 1, 1]],
		];
		for (const [triplets, target] of tests) {
			const expected = referenceSolution(triplets, target);
			const result = fn(triplets, target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from mergeTripletsToFormTargetTripletHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMergeTripletsToFormTargetTripletJS = `function canFormTarget(triplets, target) {
  // Write your code here
};`;

export const mergeTripletsToFormTargetTriplet: Problem = {
	id: "merge-triplets-to-form-target-triplet",
	title: "231. Merge Triplets to Form Target Triplet",
	problemStatement: `<p class='mt-3'>
    You are given a 2D array <code>triplets</code>, where <code>triplets[i] = [a, b, c]</code> represents the
    <code>i</code>-th triplet. You are also given an array <code>target = [x, y, z]</code>.
  </p>
  <p class='mt-3'>
    You may pick any subset of the triplets (including none) and "merge" them together. Merging two triplets
    <code>[a, b, c]</code> and <code>[d, e, f]</code> produces a new triplet
    <code>[max(a,d), max(b,e), max(c,f)]</code>. You may perform this merge operation as many times as you like
    on any triplets currently available (the originals or previously merged results).
  </p>
  <p class='mt-3'>
    Return <code>true</code> if it is possible to obtain the triplet <code>target</code> as one of the merge
    results, otherwise return <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
			outputText: "true",
			explanation: "Merging the 1st and 3rd triplets gives [max(2,1), max(5,7), max(3,5)] = [2,7,5].",
		},
		{
			id: 1,
			inputText: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]",
			outputText: "false",
			explanation: "Every triplet has a coordinate exceeding the target, so no merge can avoid overshooting.",
		},
		{
			id: 2,
			inputText: "triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]",
			outputText: "true",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= triplets.length <= 10^5</code></li>
<li class='mt-2'>Each <code>triplets[i]</code> and <code>target</code> has exactly 3 integers.</li>
<li class='mt-2'><code>1 <= triplets[i][j], target[j] <= 1000</code></li>`,
	starterCode: starterCodeMergeTripletsToFormTargetTripletJS,
	handlerFunction: mergeTripletsToFormTargetTripletHandler,
	starterFunctionName: "function canFormTarget(",
	order: 231,
};
