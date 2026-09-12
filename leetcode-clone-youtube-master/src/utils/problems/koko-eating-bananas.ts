import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: binary search over eating speed, checking feasibility with total hours needed
function referenceMinEatingSpeed(piles: number[], h: number): number {
	let lo = 1;
	let hi = Math.max(...piles);
	const hoursNeeded = (speed: number) => piles.reduce((acc, p) => acc + Math.ceil(p / speed), 0);
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (hoursNeeded(mid) <= h) hi = mid;
		else lo = mid + 1;
	}
	return lo;
}

export const kokoEatingBananasHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[3, 6, 7, 11], 8],
			[[30, 11, 23, 4, 20], 5],
			[[30, 11, 23, 4, 20], 6],
			[[1, 1, 1, 1], 4],
			[[312884469, 312884470], 2],
			[[5], 1],
		];
		for (const [piles, h] of tests) {
			const expected = referenceMinEatingSpeed(piles, h);
			const result = fn([...piles], h);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kokoEatingBananasHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKokoEatingBananasJS = `function minEatingSpeed(piles, h) {
  // Write your code here
};`;

export const kokoEatingBananas: Problem = {
	id: "koko-eating-bananas",
	title: "85. Koko Eating Bananas",
	problemStatement: `<p class='mt-3'>
    Koko loves bananas. There are <code>piles</code> of bananas, with <code>piles[i]</code> bananas in
    the <code>i</code>-th pile. The guards have gone and will come back in <code>h</code> hours.
  </p>
  <p class='mt-3'>
    Koko decides on an eating speed of <code>k</code> bananas per hour. Each hour, she chooses one pile
    and eats <code>k</code> bananas from it. If the pile has fewer than <code>k</code> bananas, she eats
    all of them and does not eat any more bananas during that hour.
  </p>
  <p class='mt-3'>
    Koko wants to eat as slowly as possible while still finishing all the piles before the guards
    return. Return the <strong>minimum</strong> integer eating speed <code>k</code> such that she can
    eat all the bananas within <code>h</code> hours.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "piles = [3,6,7,11], h = 8",
			outputText: "4",
		},
		{
			id: 1,
			inputText: "piles = [30,11,23,4,20], h = 5",
			outputText: "30",
		},
		{
			id: 2,
			inputText: "piles = [30,11,23,4,20], h = 6",
			outputText: "23",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= piles.length <= 10^4</code></li>
<li class='mt-2'><code>piles.length <= h <= 10^9</code></li>
<li class='mt-2'><code>1 <= piles[i] <= 10^9</code></li>`,
	starterCode: starterCodeKokoEatingBananasJS,
	handlerFunction: kokoEatingBananasHandler,
	starterFunctionName: "function minEatingSpeed(",
	order: 85,
};
