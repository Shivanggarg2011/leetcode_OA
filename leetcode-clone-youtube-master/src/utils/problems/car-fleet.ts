import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sort by starting position (descending, closest to target first),
// compute time to reach target for each car, and count fleets using a monotonic stack of times
function referenceCarFleet(target: number, position: number[], speed: number[]): number {
	const cars = position
		.map((p, i) => [p, speed[i]])
		.sort((a, b) => b[0] - a[0]);

	const stack: number[] = [];
	for (const [p, s] of cars) {
		const time = (target - p) / s;
		if (stack.length === 0 || time > stack[stack.length - 1]) {
			stack.push(time);
		}
		// otherwise this car catches up to the fleet ahead and merges (does not form a new fleet)
	}
	return stack.length;
}

export const carFleetHandler = (fn: any) => {
	try {
		const tests: [number, number[], number[]][] = [
			[12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
			[10, [3], [3]],
			[100, [0, 2, 4], [4, 2, 1]],
			[10, [0, 4, 2], [2, 1, 3]],
			[20, [3, 5, 7], [5, 5, 5]],
		];
		for (const [target, position, speed] of tests) {
			const expected = referenceCarFleet(target, [...position], [...speed]);
			const result = fn(target, [...position], [...speed]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from carFleetHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCarFleetJS = `function carFleet(target, position, speed) {
  // Write your code here
};`;

export const carFleet: Problem = {
	id: "car-fleet",
	title: "67. Car Fleet",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> cars traveling to the same destination on a one-lane road, located at
    coordinate <code>target</code>.
  </p>
  <p class='mt-3'>
    You are given two arrays, <code>position</code> and <code>speed</code>, both of length
    <code>n</code>, where <code>position[i]</code> is the starting position of the <code>i</code>-th
    car and <code>speed[i]</code> is its speed. All cars move toward <code>target</code> and never
    change speed on their own.
  </p>
  <p class='mt-3'>
    If a car catches up to the car in front of it, they travel together as a single
    <strong>fleet</strong> at the speed of the slower (front) car, from then on staying together.
  </p>
  <p class='mt-3'>
    Return the <strong>number of distinct fleets</strong> that arrive at the destination.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
			outputText: "3",
			explanation: "The cars starting at 10 and 8 merge into one fleet, the car at 0 travels alone, and the cars at 5 and 3 merge into another fleet.",
		},
		{
			id: 1,
			inputText: "target = 10, position = [3], speed = [3]",
			outputText: "1",
		},
		{
			id: 2,
			inputText: "target = 100, position = [0,2,4], speed = [4,2,1]",
			outputText: "1",
			explanation: "All three cars eventually merge into a single fleet before reaching the target.",
		},
	],
	constraints: `<li class='mt-2'><code>n == position.length == speed.length</code></li>
<li class='mt-2'><code>1 <= n <= 10^5</code></li>
<li class='mt-2'><code>0 < target <= 10^6</code></li>
<li class='mt-2'><code>0 <= position[i] < target</code></li>
<li class='mt-2'>All values of <code>position</code> are unique</li>
<li class='mt-2'><code>0 < speed[i] <= 10^6</code></li>`,
	starterCode: starterCodeCarFleetJS,
	handlerFunction: carFleetHandler,
	starterFunctionName: "function carFleet(",
	order: 67,
};
