import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: since you can buy and sell as many times as you
// like, it's optimal to capture every single upward price movement.
function referenceMaxProfitII(prices: number[]): number {
	let profit = 0;
	for (let i = 1; i < prices.length; i++) {
		if (prices[i] > prices[i - 1]) {
			profit += prices[i] - prices[i - 1];
		}
	}
	return profit;
}

export const bestTimeToBuyAndSellStockIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[7, 1, 5, 3, 6, 4],
			[1, 2, 3, 4, 5],
			[7, 6, 4, 3, 1],
			[1],
			[1, 2],
			[3, 3, 5, 0, 0, 3, 1, 4],
		];
		for (const test of tests) {
			const expected = referenceMaxProfitII(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimeToBuyAndSellStockIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimeToBuyAndSellStockIiJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStockIi: Problem = {
	id: "best-time-to-buy-and-sell-stock-ii",
	title: "22. Best Time to Buy and Sell Stock II",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a
    given stock on day <code>i</code>.
  </p>
  <p class='mt-3'>
    Unlike the single-transaction version of this problem, you may buy and sell the stock as many
    times as you like, as long as you sell before buying again (you may hold at most one share at
    a time). Return the maximum total profit you can achieve.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `prices = [7,1,5,3,6,4]`,
			outputText: `7`,
			explanation: "Buy at 1, sell at 5 (profit 4). Buy at 3, sell at 6 (profit 3). Total = 7.",
		},
		{
			id: 1,
			inputText: `prices = [1,2,3,4,5]`,
			outputText: `4`,
			explanation: "Buy on day 1 and sell on day 5 to capture the whole climb.",
		},
		{
			id: 2,
			inputText: `prices = [7,6,4,3,1]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= prices.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
	starterCode: starterCodeBestTimeToBuyAndSellStockIiJS,
	handlerFunction: bestTimeToBuyAndSellStockIiHandler,
	starterFunctionName: "function maxProfit(",
	order: 22,
};
