import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(ratings: number[]): number {
	const n = ratings.length;
	const candies = new Array(n).fill(1);
	for (let i = 1; i < n; i++) {
		if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
	}
	for (let i = n - 2; i >= 0; i--) {
		if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
	}
	return candies.reduce((a: number, b: number) => a + b, 0);
}

export const candyHandler = (fn: any) => {
	try {
		const tests = [[1, 0, 2], [1, 2, 2], [1, 3, 4, 5, 2], [5], [3, 2, 1]];
		for (const ratings of tests) {
			const expected = referenceSolution(ratings);
			const result = fn(ratings);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from candyHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCandyJS = `function candy(ratings) {
  // Write your code here
};`;

export const candy: Problem = {
	id: "candy",
	title: "233. Candy",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> children standing in a line, each assigned a rating value given in the array
    <code>ratings</code>. You must give each child at least one candy.
  </p>
  <p class='mt-3'>
    Any child with a strictly higher rating than either of their immediate neighbors must receive more candies
    than that neighbor.
  </p>
  <p class='mt-3'>
    Return the minimum total number of candies you need to distribute to satisfy these requirements.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "ratings = [1,0,2]",
			outputText: "5",
			explanation: "You can distribute [2,1,2], for a total of 5 candies.",
		},
		{
			id: 1,
			inputText: "ratings = [1,2,2]",
			outputText: "4",
			explanation: "You can distribute [1,2,1]. The third child gets 1 candy since it isn't strictly greater than the second.",
		},
	],
	constraints: `<li class='mt-2'><code>n == ratings.length</code></li>
<li class='mt-2'><code>1 <= n <= 2 * 10^4</code></li>
<li class='mt-2'><code>0 <= ratings[i] <= 2 * 10^4</code></li>`,
	starterCode: starterCodeCandyJS,
	handlerFunction: candyHandler,
	starterFunctionName: "function candy(",
	order: 233,
};
