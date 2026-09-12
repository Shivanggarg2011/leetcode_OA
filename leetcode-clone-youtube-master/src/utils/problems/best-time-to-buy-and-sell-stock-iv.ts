import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(k: number, prices: number[]): number {
	const n = prices.length;
	if (n === 0 || k === 0) return 0;
	if (k >= Math.floor(n / 2)) {
		// unlimited transactions case
		let profit = 0;
		for (let i = 1; i < n; i++) {
			if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
		}
		return profit;
	}
	const buy: number[] = new Array(k + 1).fill(-Infinity);
	const sell: number[] = new Array(k + 1).fill(0);
	for (let i = 0; i < n; i++) {
		for (let t = 1; t <= k; t++) {
			buy[t] = Math.max(buy[t], sell[t - 1] - prices[i]);
			sell[t] = Math.max(sell[t], buy[t] + prices[i]);
		}
	}
	return sell[k];
}

export const bestTimeToBuyAndSellStockIvHandler = (fn: any) => {
	try {
		const tests: [number, number[]][] = [
			[2, [2, 4, 1]],
			[2, [3, 2, 6, 5, 0, 3]],
			[1, [1, 2]],
			[0, [1, 2, 3]],
			[3, [1, 2, 3, 4, 5]],
		];
		for (const [k, prices] of tests) {
			const expected = referenceSolution(k, prices);
			const result = fn(k, prices);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimeToBuyAndSellStockIvHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimeToBuyAndSellStockIvJS = `function maxProfit(k, prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStockIv: Problem = {
	id: "best-time-to-buy-and-sell-stock-iv",
	title: "218. Best Time to Buy and Sell Stock IV",
	problemStatement: `<p class='mt-3'>
    You are given an integer <code>k</code> and an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>-th day.
  </p>
  <p class='mt-3'>
    Find the maximum profit you can achieve. You may complete <strong>at most</strong> <code>k</code> transactions: that is, you may buy at most <code>k</code> times and sell at most <code>k</code> times.
  </p>
  <p class='mt-3'>
    Note that you cannot engage in multiple transactions simultaneously (you must sell the stock before you buy again).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `k = 2, prices = [2,4,1]`,
			outputText: `2`,
			explanation: "Buy at 2, sell at 4, profit 2.",
		},
		{
			id: 1,
			inputText: `k = 2, prices = [3,2,6,5,0,3]`,
			outputText: `7`,
			explanation: "Buy at 2, sell at 6, profit 4. Then buy at 0, sell at 3, profit 3. Total profit = 7.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= k <= 100</code></li>
  <li class='mt-2'><code>0 <= prices.length <= 1000</code></li>
  <li class='mt-2'><code>0 <= prices[i] <= 1000</code></li>`,
	starterCode: starterCodeBestTimeToBuyAndSellStockIvJS,
	handlerFunction: bestTimeToBuyAndSellStockIvHandler,
	starterFunctionName: "function maxProfit(",
	order: 218,
};
