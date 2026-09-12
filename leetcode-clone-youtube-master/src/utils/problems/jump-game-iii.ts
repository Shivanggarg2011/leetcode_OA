import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(arr: number[], start: number): boolean {
	const n = arr.length;
	const visited = new Array(n).fill(false);
	const queue = [start];
	visited[start] = true;
	while (queue.length) {
		const i = queue.shift() as number;
		if (arr[i] === 0) return true;
		for (const next of [i + arr[i], i - arr[i]]) {
			if (next >= 0 && next < n && !visited[next]) {
				visited[next] = true;
				queue.push(next);
			}
		}
	}
	return false;
}

export const jumpGameIiiHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[4, 2, 3, 0, 3, 1, 2], 5],
			[[4, 2, 3, 0, 3, 1, 2], 0],
			[[3, 0, 2, 1, 2], 2],
			[[0], 0],
			[[1, 0], 0],
		];
		for (const [arr, start] of tests) {
			const expected = referenceSolution(arr, start);
			const result = fn(arr, start);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from jumpGameIiiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeJumpGameIiiJS = `function canReach(arr, start) {
  // Write your code here
};`;

export const jumpGameIii: Problem = {
	id: "jump-game-iii",
	title: "237. Jump Game III",
	problemStatement: `<p class='mt-3'>
    You are given a zero-indexed array of non-negative integers <code>arr</code> and a starting index
    <code>start</code>.
  </p>
  <p class='mt-3'>
    When you are at index <code>i</code>, you can jump to either <code>i + arr[i]</code> or
    <code>i - arr[i]</code>, provided that the resulting index stays within the bounds of the array. Jumping
    outside the array bounds or beyond, is not allowed.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if you can reach any index in <code>arr</code> whose value is <code>0</code>,
    starting from <code>start</code>. Otherwise, return <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "arr = [4,2,3,0,3,1,2], start = 5",
			outputText: "true",
			explanation: "Index 5 -> index 4 -> index 1 -> index 3, which has value 0.",
		},
		{
			id: 1,
			inputText: "arr = [3,0,2,1,2], start = 2",
			outputText: "false",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= arr.length <= 5 * 10^4</code></li>
<li class='mt-2'><code>0 <= arr[i] < arr.length</code></li>
<li class='mt-2'><code>0 <= start < arr.length</code></li>`,
	starterCode: starterCodeJumpGameIiiJS,
	handlerFunction: jumpGameIiiHandler,
	starterFunctionName: "function canReach(",
	order: 237,
};
