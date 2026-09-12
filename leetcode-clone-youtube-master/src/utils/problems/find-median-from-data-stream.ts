import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: keep every number seen so far in sorted order (via
// binary-search insertion) and read the median directly from the middle.
class ReferenceMedianFinder {
	nums: number[] = [];

	addNum(num: number): void {
		let lo = 0;
		let hi = this.nums.length;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (this.nums[mid] < num) lo = mid + 1;
			else hi = mid;
		}
		this.nums.splice(lo, 0, num);
	}

	findMedian(): number {
		const n = this.nums.length;
		if (n === 0) return 0;
		if (n % 2 === 1) return this.nums[(n - 1) / 2];
		return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;
	}
}

type Op = { method: "addNum" | "findMedian"; arg?: number };

export const findMedianFromDataStreamHandler = (fn: any) => {
	try {
		const scripts: Op[][] = [
			[
				{ method: "addNum", arg: 1 },
				{ method: "addNum", arg: 2 },
				{ method: "findMedian" },
				{ method: "addNum", arg: 3 },
				{ method: "findMedian" },
			],
			[
				{ method: "addNum", arg: 6 },
				{ method: "findMedian" },
				{ method: "addNum", arg: 10 },
				{ method: "addNum", arg: 2 },
				{ method: "findMedian" },
				{ method: "addNum", arg: 6 },
				{ method: "addNum", arg: 5 },
				{ method: "findMedian" },
			],
			[
				{ method: "addNum", arg: -1 },
				{ method: "addNum", arg: -2 },
				{ method: "addNum", arg: -3 },
				{ method: "findMedian" },
				{ method: "addNum", arg: -4 },
				{ method: "addNum", arg: -5 },
				{ method: "findMedian" },
			],
		];

		for (const script of scripts) {
			const userFinder = new fn();
			const refFinder = new ReferenceMedianFinder();
			const userResults: any[] = [];
			const refResults: any[] = [];
			for (const step of script) {
				if (step.method === "addNum") {
					userFinder.addNum(step.arg!);
					refFinder.addNum(step.arg!);
					userResults.push(undefined);
					refResults.push(undefined);
				} else {
					userResults.push(userFinder.findMedian());
					refResults.push(refFinder.findMedian());
				}
			}
			assert.deepStrictEqual(userResults, refResults);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findMedianFromDataStreamHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindMedianFromDataStreamJS = `class MedianFinder {
  constructor() {
    // Write your code here
  }

  addNum(num) {
    // Write your code here
  }

  findMedian() {
    // Write your code here
  }
};`;

export const findMedianFromDataStream: Problem = {
	id: "find-median-from-data-stream",
	title: "143. Find Median from Data Stream",
	problemStatement: `<p class='mt-3'>
    Design a data structure that supports adding integers from a stream one at a time and querying
    the median of all elements seen so far.
  </p>
  <p class='mt-3'>
    Implement the <code>MedianFinder</code> class:
  </p>
  <p class='mt-3'>
    <code>addNum(num)</code> adds <code>num</code> to the running data stream.
  </p>
  <p class='mt-3'>
    <code>findMedian()</code> returns the median of all elements seen so far. If the number of
    elements is even, the median is the average of the two middle values.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]`,
			outputText: `[null, null, null, 1.5, null, 2.0]`,
		},
	],
	constraints: `<li class='mt-2'><code>-10^5 <= num <= 10^5</code></li>
  <li class='mt-2'>There will be at least one element before <code>findMedian</code> is called.</li>
  <li class='mt-2'>At most <code>5 * 10^4</code> calls in total will be made to <code>addNum</code> and <code>findMedian</code>.</li>`,
	starterCode: starterCodeFindMedianFromDataStreamJS,
	handlerFunction: findMedianFromDataStreamHandler,
	starterFunctionName: "class MedianFinder {",
	order: 143,
};
