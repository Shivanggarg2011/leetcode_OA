import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: monotonic stack of [price, span] pairs
class ReferenceStockSpanner {
	private stack: [number, number][] = [];

	next(price: number): number {
		let span = 1;
		while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
			span += this.stack.pop()![1];
		}
		this.stack.push([price, span]);
		return span;
	}
}

function runNextCalls(instance: any, prices: number[]): number[] {
	return prices.map((price) => instance.next(price));
}

export const onlineStockSpanHandler = (fn: any) => {
	try {
		const priceSequences: number[][] = [
			[100, 80, 60, 70, 60, 75, 85],
			[31, 41, 48, 59, 79],
			[10, 10, 10, 10],
			[1, 2, 3, 4, 5],
			[5, 4, 3, 2, 1],
		];

		for (const prices of priceSequences) {
			const refInstance = new ReferenceStockSpanner();
			const userInstance = new fn();
			const expected = runNextCalls(refInstance, prices);
			const result = runNextCalls(userInstance, prices);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from onlineStockSpanHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeOnlineStockSpanJS = `class StockSpanner {
  constructor() {
    // Write your code here
  }

  next(price) {
    // Write your code here
  }
}`;

export const onlineStockSpan: Problem = {
	id: "online-stock-span",
	title: "76. Online Stock Span",
	problemStatement: `<p class='mt-3'>
    Design an algorithm that collects the daily price of a stock and returns the
    <strong>span</strong> of that stock's price for the current day.
  </p>
  <p class='mt-3'>
    The span of the stock's price on a given day is the maximum number of consecutive days
    (starting from that day and going backward, including today) for which the price was less than
    or equal to today's price.
  </p>
  <p class='mt-3'>
    Implement the <code>StockSpanner</code> class:
  </p>
  <ul class='mt-2'>
    <li class='mt-2'><code>StockSpanner()</code> initializes the object.</li>
    <li class='mt-2'><code>next(price)</code> feeds in today's stock price and returns the span for today.</li>
  </ul>`,
	examples: [
		{
			id: 0,
			inputText:
				`["StockSpanner","next","next","next","next","next","next","next"]\n[[],[100],[80],[60],[70],[60],[75],[85]]`,
			outputText: `[null,1,1,1,2,1,4,6]`,
		},
		{
			id: 1,
			inputText: `["StockSpanner","next","next","next"]\n[[],[10],[10],[10]]`,
			outputText: `[null,1,2,3]`,
			explanation: "Each price is equal to the previous ones, so the span grows by 1 each call.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= price <= 10^5</code></li>
<li class='mt-2'>At most <code>10^4</code> calls will be made to <code>next</code></li>`,
	starterCode: starterCodeOnlineStockSpanJS,
	handlerFunction: onlineStockSpanHandler,
	starterFunctionName: "class StockSpanner {",
	order: 76,
};
