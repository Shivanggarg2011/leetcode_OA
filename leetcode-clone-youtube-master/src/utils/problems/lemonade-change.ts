import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(bills: number[]): boolean {
	let five = 0;
	let ten = 0;
	for (const bill of bills) {
		if (bill === 5) {
			five++;
		} else if (bill === 10) {
			if (five === 0) return false;
			five--;
			ten++;
		} else {
			if (ten > 0 && five > 0) {
				ten--;
				five--;
			} else if (five >= 3) {
				five -= 3;
			} else {
				return false;
			}
		}
	}
	return true;
}

export const lemonadeChangeHandler = (fn: any) => {
	try {
		const tests = [
			[5, 5, 5, 10, 20],
			[5, 5, 10, 10, 20],
			[5, 5, 10],
			[10, 10],
			[5],
		];
		for (const bills of tests) {
			const expected = referenceSolution(bills);
			const result = fn(bills);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lemonadeChangeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLemonadeChangeJS = `function lemonadeChange(bills) {
  // Write your code here
};`;

export const lemonadeChange: Problem = {
	id: "lemonade-change",
	title: "234. Lemonade Change",
	problemStatement: `<p class='mt-3'>
    Each lemonade costs <code>$5</code>. Customers stand in a line and each buys exactly one lemonade, paying
    with either a <code>$5</code>, <code>$10</code>, or <code>$20</code> bill, given in order in the array
    <code>bills</code>.
  </p>
  <p class='mt-3'>
    You start with no change on hand. For each customer you must give back the correct change so that they
    net pay exactly <code>$5</code>. You can only use bills you've collected from previous customers to make
    change (assume you can produce as much change as you'd like from the bills you have on hand).
  </p>
  <p class='mt-3'>
    Return <code>true</code> if you can provide correct change to every customer, otherwise return
    <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "bills = [5,5,5,10,20]",
			outputText: "true",
		},
		{
			id: 1,
			inputText: "bills = [5,5,10,10,20]",
			outputText: "false",
			explanation: "By the last customer, you only have two $10 bills and no $5 bills to make $20 change.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= bills.length <= 10^5</code></li>
<li class='mt-2'><code>bills[i]</code> is <code>5</code>, <code>10</code>, or <code>20</code></li>`,
	starterCode: starterCodeLemonadeChangeJS,
	handlerFunction: lemonadeChangeHandler,
	starterFunctionName: "function lemonadeChange(",
	order: 234,
};
