import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: binary search the ship capacity, checking feasibility via a greedy day count
function referenceShipWithinDays(weights: number[], days: number): number {
	let lo = Math.max(...weights);
	let hi = weights.reduce((a, b) => a + b, 0);
	const daysNeeded = (capacity: number) => {
		let requiredDays = 1;
		let current = 0;
		for (const w of weights) {
			if (current + w > capacity) {
				requiredDays++;
				current = w;
			} else {
				current += w;
			}
		}
		return requiredDays;
	};
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (daysNeeded(mid) <= days) hi = mid;
		else lo = mid + 1;
	}
	return lo;
}

export const capacityToShipPackagesWithinDDaysHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
			[[3, 2, 2, 4, 1, 4], 3],
			[[1, 2, 3, 1, 1], 4],
			[[5, 4, 3], 1],
			[[7, 2, 5, 10, 8], 2],
			[[1], 1],
		];
		for (const [weights, days] of tests) {
			const expected = referenceShipWithinDays(weights, days);
			const result = fn([...weights], days);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from capacityToShipPackagesWithinDDaysHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCapacityToShipPackagesWithinDDaysJS = `function shipWithinDays(weights, days) {
  // Write your code here
};`;

export const capacityToShipPackagesWithinDDays: Problem = {
	id: "capacity-to-ship-packages-within-d-days",
	title: "86. Capacity To Ship Packages Within D Days",
	problemStatement: `<p class='mt-3'>
    A conveyor belt has packages, given as an array <code>weights</code>, that must be shipped from one
    port to another within <code>days</code> days, in the same order that they appear in the array.
  </p>
  <p class='mt-3'>
    Each day, the ship loads packages (in order) onto itself, up to its maximum weight capacity, then
    departs. Once a package is loaded it cannot be split across days.
  </p>
  <p class='mt-3'>
    Return the <strong>least</strong> weight capacity of the ship that will allow all the packages to
    be shipped within <code>days</code> days.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
			outputText: "15",
			explanation: "With capacity 15: day1: 1,2,3,4,5 | day2: 6,7 | day3: 8,9 | day4: 10.",
		},
		{
			id: 1,
			inputText: "weights = [3,2,2,4,1,4], days = 3",
			outputText: "6",
		},
		{
			id: 2,
			inputText: "weights = [1,2,3,1,1], days = 4",
			outputText: "3",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= days <= weights.length <= 5 * 10^4</code></li>
<li class='mt-2'><code>1 <= weights[i] <= 500</code></li>`,
	starterCode: starterCodeCapacityToShipPackagesWithinDDaysJS,
	handlerFunction: capacityToShipPackagesWithinDDaysHandler,
	starterFunctionName: "function shipWithinDays(",
	order: 86,
};
