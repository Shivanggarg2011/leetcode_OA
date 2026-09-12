import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: bottom-up unbounded knapsack DP for minimum coins.
function referenceCoinChange(coins: number[], amount: number): number {
	const dp = new Array(amount + 1).fill(Infinity);
	dp[0] = 0;
	for (let a = 1; a <= amount; a++) {
		for (const coin of coins) {
			if (coin <= a && dp[a - coin] + 1 < dp[a]) {
				dp[a] = dp[a - coin] + 1;
			}
		}
	}
	return dp[amount] === Infinity ? -1 : dp[amount];
}

export const coinChangeHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 5], 11],
			[[2], 3],
			[[1], 0],
			[[1, 3, 4, 5], 7],
			[[186, 419, 83, 408], 6249],
		];
		for (const [coins, amount] of tests) {
			const expected = referenceCoinChange(coins, amount);
			const result = fn([...coins], amount);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from coinChangeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCoinChangeJS = `function coinChange(coins, amount) {
  // Write your code here
};`;

export const coinChange: Problem = {
	id: "coin-change",
	title: "198. Coin Change",
	problemStatement: `<p class='mt-3'>
    You are given an array of integers <code>coins</code> representing coin denominations, and an
    integer <code>amount</code> representing a target sum of money.
  </p>
  <p class='mt-3'>
    Return the <strong>fewest number of coins</strong> needed to make up <code>amount</code>, using
    any number of coins of each denomination. If it's impossible to make <code>amount</code> with the
    given coins, return <code>-1</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `coins = [1,2,5], amount = 11`,
			outputText: `3`,
			explanation: "11 = 5 + 5 + 1, using 3 coins.",
		},
		{
			id: 1,
			inputText: `coins = [2], amount = 3`,
			outputText: `-1`,
			explanation: "3 cannot be made using only coins of value 2.",
		},
		{
			id: 2,
			inputText: `coins = [1], amount = 0`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= coins.length <= 12</code></li>
  <li class='mt-2'><code>1 <= coins[i] <= 2^31 - 1</code></li>
  <li class='mt-2'><code>0 <= amount <= 10^4</code></li>`,
	starterCode: starterCodeCoinChangeJS,
	handlerFunction: coinChangeHandler,
	starterFunctionName: "function coinChange(",
	order: 198,
};
