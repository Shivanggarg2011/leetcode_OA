import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(prices: number[]): number {
	const n = prices.length;
	if (n === 0) return 0;
	let buy1 = -prices[0];
	let sell1 = 0;
	let buy2 = -prices[0];
	let sell2 = 0;
	for (let i = 1; i < n; i++) {
		buy1 = Math.max(buy1, -prices[i]);
		sell1 = Math.max(sell1, buy1 + prices[i]);
		buy2 = Math.max(buy2, sell1 - prices[i]);
		sell2 = Math.max(sell2, buy2 + prices[i]);
	}
	return sell2;
}

export const bestTimeToBuyAndSellStockIiiHandler = (fn: any) => {
	try {
		const tests = [
			[3, 3, 5, 0, 0, 3, 1, 4],
			[1, 2, 3, 4, 5],
			[7, 6, 4, 3, 1],
			[1],
			[1, 2, 4, 2, 5, 7, 2, 4, 9, 0],
		];
		for (const prices of tests) {
			const expected = referenceSolution(prices);
			const result = fn(prices);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimeToBuyAndSellStockIiiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimeToBuyAndSellStockIiiJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStockIii: Problem = {
	id: "best-time-to-buy-and-sell-stock-iii",
	title: "217. Best Time to Buy and Sell Stock III",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>-th day.
  </p>
  <p class='mt-3'>
    Find the maximum profit you can achieve. You may complete <strong>at most two transactions</strong>.
  </p>
  <p class='mt-3'>
    Note that you cannot engage in multiple transactions simultaneously (you must sell the stock before you buy again).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `prices = [3,3,5,0,0,3,1,4]`,
			outputText: `6`,
			explanation: "Buy at 0, sell at 3 (profit 3), then buy at 1, sell at 4 (profit 3). Total profit = 6.",
		},
		{
			id: 1,
			inputText: `prices = [1,2,3,4,5]`,
			outputText: `4`,
			explanation: "Buy at 1, sell at 5. Only one transaction is needed to maximize profit.",
		},
		{
			id: 2,
			inputText: `prices = [7,6,4,3,1]`,
			outputText: `0`,
			explanation: "Prices only fall, so no transaction is made and the max profit is 0.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li>
  <li class='mt-2'><code>0 <= prices[i] <= 1000</code></li>`,
	starterCode: starterCodeBestTimeToBuyAndSellStockIiiJS,
	handlerFunction: bestTimeToBuyAndSellStockIiiHandler,
	starterFunctionName: "function maxProfit(",
	order: 217,
};
