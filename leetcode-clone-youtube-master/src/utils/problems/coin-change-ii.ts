import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: bottom-up unbounded knapsack DP counting combinations
// (coin order does not matter, so iterate coins in the outer loop).
function referenceChange(amount: number, coins: number[]): number {
	const dp = new Array(amount + 1).fill(0);
	dp[0] = 1;
	for (const coin of coins) {
		for (let a = coin; a <= amount; a++) {
			dp[a] += dp[a - coin];
		}
	}
	return dp[amount];
}

export const coinChangeIiHandler = (fn: any) => {
	try {
		const tests: [number, number[]][] = [
			[5, [1, 2, 5]],
			[3, [2]],
			[10, [10]],
			[0, []],
			[4, [1, 2]],
		];
		for (const [amount, coins] of tests) {
			const expected = referenceChange(amount, coins);
			const result = fn(amount, [...coins]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from coinChangeIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCoinChangeIiJS = `function change(amount, coins) {
  // Write your code here
};`;

export const coinChangeIi: Problem = {
	id: "coin-change-ii",
	title: "199. Coin Change II",
	problemStatement: `<p class='mt-3'>
    You are given an integer <code>amount</code> and an array <code>coins</code> representing
    different coin denominations. You have an infinite number of coins of each denomination.
  </p>
  <p class='mt-3'>
    Return the <strong>number of distinct combinations</strong> of coins that sum up to
    <code>amount</code>. Two combinations are the same if they use the same coins with the same
    counts, regardless of order. If no combination makes up <code>amount</code>, return
    <code>0</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `amount = 5, coins = [1,2,5]`,
			outputText: `4`,
			explanation: "5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.",
		},
		{
			id: 1,
			inputText: `amount = 3, coins = [2]`,
			outputText: `0`,
		},
		{
			id: 2,
			inputText: `amount = 10, coins = [10]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= coins.length <= 300</code></li>
  <li class='mt-2'><code>1 <= coins[i] <= 5000</code></li>
  <li class='mt-2'>All values in <code>coins</code> are unique.</li>
  <li class='mt-2'><code>0 <= amount <= 5000</code></li>`,
	starterCode: starterCodeCoinChangeIiJS,
	handlerFunction: coinChangeIiHandler,
	starterFunctionName: "function change(",
	order: 199,
};
