import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: track the lowest price seen so far while scanning
// left to right, and keep the best profit achievable by selling today.
function referenceMaxProfit(prices: number[]): number {
	let minPrice = Infinity;
	let maxProfit = 0;
	for (const price of prices) {
		if (price < minPrice) {
			minPrice = price;
		} else if (price - minPrice > maxProfit) {
			maxProfit = price - minPrice;
		}
	}
	return maxProfit;
}

export const bestTimeToBuyAndSellStockHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[7, 1, 5, 3, 6, 4],
			[7, 6, 4, 3, 1],
			[1, 2],
			[2, 1],
			[3, 3, 3, 3],
			[1, 2, 4, 2, 5, 7, 2, 4, 9, 0],
		];
		for (const test of tests) {
			const expected = referenceMaxProfit(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimeToBuyAndSellStockHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimeToBuyAndSellStockJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStock: Problem = {
	id: "best-time-to-buy-and-sell-stock",
	title: "21. Best Time to Buy and Sell Stock",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a
    given stock on day <code>i</code>.
  </p>
  <p class='mt-3'>
    You want to maximize your profit by choosing a single day to buy the stock and a
    <strong>different day in the future</strong> to sell it. Return the maximum profit you can
    achieve, or <code>0</code> if no profit is possible.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `prices = [7,1,5,3,6,4]`,
			outputText: `5`,
			explanation: "Buy on day 2 (price 1) and sell on day 5 (price 6), profit = 6 - 1 = 5.",
		},
		{
			id: 1,
			inputText: `prices = [7,6,4,3,1]`,
			outputText: `0`,
			explanation: "Prices only decrease, so no profit is possible.",
		},
		{
			id: 2,
			inputText: `prices = [1,2]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li>
  <li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
	starterCode: starterCodeBestTimeToBuyAndSellStockJS,
	handlerFunction: bestTimeToBuyAndSellStockHandler,
	starterFunctionName: "function maxProfit(",
	order: 21,
};
