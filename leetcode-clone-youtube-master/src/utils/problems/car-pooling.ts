import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(trips: number[][], capacity: number): boolean {
	const events: number[][] = [];
	for (const [num, from, to] of trips) {
		events.push([from, num]);
		events.push([to, -num]);
	}
	events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
	let cur = 0;
	for (const [, delta] of events) {
		cur += delta;
		if (cur > capacity) return false;
	}
	return true;
}

export const carPoolingHandler = (fn: any) => {
	try {
		const tests: [number[][], number][] = [
			[
				[
					[2, 1, 5],
					[3, 3, 7],
				],
				4,
			],
			[
				[
					[2, 1, 5],
					[3, 3, 7],
				],
				5,
			],
			[
				[
					[9, 0, 1],
					[3, 3, 7],
				],
				4,
			],
			[[[2, 1, 5]], 3],
			[
				[
					[3, 2, 7],
					[3, 7, 9],
					[8, 3, 9],
				],
				11,
			],
		];
		for (const [trips, capacity] of tests) {
			const expected = referenceSolution(trips, capacity);
			const result = fn(trips, capacity);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from carPoolingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCarPoolingJS = `function carPooling(trips, capacity) {
  // Write your code here
};`;

export const carPooling: Problem = {
	id: "car-pooling",
	title: "249. Car Pooling",
	problemStatement: `<p class='mt-3'>
    Your car has a fixed number of empty seats given by <code>capacity</code>. You are given a list of trips,
    <code>trips</code>, where <code>trips[i] = [numPassengers_i, from_i, to_i]</code> means that
    <code>numPassengers_i</code> passengers must be picked up at road position <code>from_i</code> and dropped
    off at road position <code>to_i</code> (all positions are non-negative, and the car only ever travels in
    one direction of increasing position).
  </p>
  <p class='mt-3'>
    Return <code>true</code> if it is possible to pick up and drop off every trip's passengers without ever
    exceeding <code>capacity</code> at any point along the route, otherwise return <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "trips = [[2,1,5],[3,3,7]], capacity = 4",
			outputText: "false",
			explanation: "Between positions 3 and 5, both trips overlap, requiring 2 + 3 = 5 seats.",
		},
		{
			id: 1,
			inputText: "trips = [[2,1,5],[3,3,7]], capacity = 5",
			outputText: "true",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= trips.length <= 1000</code></li>
<li class='mt-2'><code>1 <= numPassengers_i <= 100</code></li>
<li class='mt-2'><code>0 <= from_i < to_i <= 1000</code></li>
<li class='mt-2'><code>1 <= capacity <= 10^5</code></li>`,
	starterCode: starterCodeCarPoolingJS,
	handlerFunction: carPoolingHandler,
	starterFunctionName: "function carPooling(",
	order: 249,
};
