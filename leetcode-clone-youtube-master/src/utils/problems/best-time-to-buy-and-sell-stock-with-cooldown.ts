import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(prices: number[]): number {
	const n = prices.length;
	if (n === 0) return 0;
	// hold[i]: max profit on day i while holding a stock
	// sold[i]: max profit on day i when we just sold (cooldown starts next day)
	// rest[i]: max profit on day i while not holding and not just sold
	let hold = -prices[0];
	let sold = 0;
	let rest = 0;
	for (let i = 1; i < n; i++) {
		const prevHold = hold;
		const prevSold = sold;
		const prevRest = rest;
		hold = Math.max(prevHold, prevRest - prices[i]);
		sold = prevHold + prices[i];
		rest = Math.max(prevRest, prevSold);
	}
	return Math.max(sold, rest);
}

export const bestTimeToBuyAndSellStockWithCooldownHandler = (fn: any) => {
	try {
		const tests = [
			[1, 2, 3, 0, 2],
			[1],
			[1, 2, 4],
			[6, 1, 3, 2, 4, 7],
			[1, 2, 3, 4, 5],
			[2, 1],
		];
		for (const prices of tests) {
			const expected = referenceSolution(prices);
			const result = fn(prices);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimeToBuyAndSellStockWithCooldownHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimeToBuyAndSellStockWithCooldownJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStockWithCooldown: Problem = {
	id: "best-time-to-buy-and-sell-stock-with-cooldown",
	title: "216. Best Time to Buy and Sell Stock with Cooldown",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>-th day.
  </p>
  <p class='mt-3'>
    Find the maximum profit you can achieve. You may complete as many transactions as you like (buy one and sell one share of the stock multiple times) subject to the following restrictions:
  </p>
  <p class='mt-3'>
    After you sell your stock, you cannot buy stock on the next day (i.e., a <strong>cooldown</strong> of one day is required). You may not engage in multiple transactions at the same time (you must sell the stock before you buy again).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `prices = [1,2,3,0,2]`,
			outputText: `3`,
			explanation: "Transactions: buy at 1, sell at 2, cooldown, buy at 0, sell at 2. Profit = 1 + 2 = 3.",
		},
		{
			id: 1,
			inputText: `prices = [1]`,
			outputText: `0`,
		},
		{
			id: 2,
			inputText: `prices = [1,2,4]`,
			outputText: `3`,
			explanation: "Buy at 1, sell at 4.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= prices.length <= 5000</code></li>
  <li class='mt-2'><code>0 <= prices[i] <= 1000</code></li>`,
	starterCode: starterCodeBestTimeToBuyAndSellStockWithCooldownJS,
	handlerFunction: bestTimeToBuyAndSellStockWithCooldownHandler,
	starterFunctionName: "function maxProfit(",
	order: 216,
};
