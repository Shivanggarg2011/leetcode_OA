import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: keep a count of every point added (points may repeat),
// then for count(), look for a diagonal partner sharing an x-coordinate and
// use the two possible axis-aligned squares it can complete.
class ReferenceDetectSquares {
	private pointCounts: Map<string, number>;
	private byX: Map<number, Map<number, number>>;

	constructor() {
		this.pointCounts = new Map();
		this.byX = new Map();
	}

	add(point: [number, number]): void {
		const [x, y] = point;
		const key = `${x},${y}`;
		this.pointCounts.set(key, (this.pointCounts.get(key) || 0) + 1);
		if (!this.byX.has(x)) this.byX.set(x, new Map());
		const col = this.byX.get(x)!;
		col.set(y, (col.get(y) || 0) + 1);
	}

	count(point: [number, number]): number {
		const [x, y] = point;
		let total = 0;
		const col = this.byX.get(x);
		if (!col) return 0;
		for (const [y2, countY2] of col.entries()) {
			if (y2 === y) continue;
			const side = Math.abs(y2 - y);
			for (const dx of [side, -side]) {
				const x3 = x + dx;
				const key3 = `${x3},${y}`;
				const key4 = `${x3},${y2}`;
				const count3 = this.pointCounts.get(key3) || 0;
				const count4 = this.pointCounts.get(key4) || 0;
				total += countY2 * count3 * count4;
			}
		}
		return total;
	}
}

export const detectSquaresHandler = (fn: any) => {
	try {
		const ops = ["add", "add", "add", "count", "count", "count"];
		const args: Array<[number, number]>[] = [
			[[3, 10]],
			[[11, 2]],
			[[3, 2]],
			[[11, 10]],
			[[14, 8]],
			[[3, 2]],
		];

		const obj = fn();
		const ref = new ReferenceDetectSquares();

		for (let i = 0; i < ops.length; i++) {
			const op = ops[i];
			const arg = args[i][0];
			if (op === "add") {
				obj.add(arg);
				ref.add(arg);
			} else {
				const result = obj.count(arg);
				const expected = ref.count(arg);
				assert.equal(result, expected);
			}
		}

		// A second, independent scenario to further exercise duplicate points.
		const obj2 = fn();
		const ref2 = new ReferenceDetectSquares();
		const ops2 = ["add", "add", "add", "add", "count", "count"];
		const args2: Array<[number, number]>[] = [
			[[0, 0]],
			[[0, 2]],
			[[2, 0]],
			[[2, 2]],
			[[0, 0]],
			[[1, 1]],
		];
		for (let i = 0; i < ops2.length; i++) {
			const op = ops2[i];
			const arg = args2[i][0];
			if (op === "add") {
				obj2.add(arg);
				ref2.add(arg);
			} else {
				const result = obj2.count(arg);
				const expected = ref2.count(arg);
				assert.equal(result, expected);
			}
		}

		return true;
	} catch (error: any) {
		console.log("Error from detectSquaresHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDetectSquaresJS = `function DetectSquares() {
  // Write your code here.
  // Return an object exposing "add" and "count" methods.
  return {
    add: function(point) {

    },
    count: function(point) {

    }
  };
};`;

export const detectSquares: Problem = {
	id: "detect-squares",
	title: "259. Detect Squares",
	problemStatement: `<p class='mt-3'>
    Design a data structure that supports adding points on a 2D plane and, given a query point,
    counting how many <strong>axis-aligned squares</strong> can be formed using that query point
    and three previously added points as the other three corners.
  </p>
  <p class='mt-3'>
    An axis-aligned square has all four sides either parallel to the x-axis or the y-axis. The
    same point may be added more than once, and each occurrence is treated as a distinct point
    when counting squares.
  </p>
  <p class='mt-3'>
    Implement:
  </p>
  <p class='mt-3'>
    <code>add(point)</code> &mdash; adds the 2D point <code>[x, y]</code> to the data structure.
  </p>
  <p class='mt-3'>
    <code>count(point)</code> &mdash; given <code>[x, y]</code>, returns the number of axis-aligned
    squares that can be formed with this point as one corner and three already-added points as the
    other corners.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `add([3,10]); add([11,2]); add([3,2]); count([11,10]); count([14,8]); count([3,2])`,
			outputText: `1, 0, 2`,
			explanation:
				"[11,10] completes exactly one square with [3,10], [11,2], [3,2]. [14,8] cannot form any square. [3,2] was added once but forms 2 squares counting the point itself as a corner combined with the others.",
		},
		{
			id: 1,
			inputText: `add([0,0]); add([0,2]); add([2,0]); add([2,2]); count([0,0]); count([1,1])`,
			outputText: `1, 0`,
			explanation: "[0,0],[0,2],[2,0],[2,2] form exactly one square. [1,1] is not a corner of any square here.",
		},
	],
	constraints: `<li class='mt-2'><code>point.length == 2</code></li>
  <li class='mt-2'><code>0 <= x, y <= 1000</code></li>
  <li class='mt-2'>At most <code>3000</code> calls total will be made to <code>add</code> and <code>count</code>.</li>`,
	starterCode: starterCodeDetectSquaresJS,
	handlerFunction: detectSquaresHandler,
	starterFunctionName: "function DetectSquares(",
	order: 259,
};
