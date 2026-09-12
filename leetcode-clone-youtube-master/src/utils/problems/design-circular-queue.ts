import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a fixed-size array with front/count tracking.
class ReferenceCircularQueue {
	private data: number[];
	private capacity: number;
	private front: number;
	private count: number;

	constructor(k: number) {
		this.data = new Array(k).fill(0);
		this.capacity = k;
		this.front = 0;
		this.count = 0;
	}

	enQueue(value: number): boolean {
		if (this.count === this.capacity) return false;
		const rear = (this.front + this.count) % this.capacity;
		this.data[rear] = value;
		this.count++;
		return true;
	}

	deQueue(): boolean {
		if (this.count === 0) return false;
		this.front = (this.front + 1) % this.capacity;
		this.count--;
		return true;
	}

	Front(): number {
		if (this.count === 0) return -1;
		return this.data[this.front];
	}

	Rear(): number {
		if (this.count === 0) return -1;
		const rear = (this.front + this.count - 1) % this.capacity;
		return this.data[rear];
	}

	isEmpty(): boolean {
		return this.count === 0;
	}

	isFull(): boolean {
		return this.count === this.capacity;
	}
}

export const designCircularQueueHandler = (fn: any) => {
	try {
		const runTest = (k: number, ops: string[], args: any[][]) => {
			const obj = fn(k);
			const ref = new ReferenceCircularQueue(k);
			for (let i = 0; i < ops.length; i++) {
				const op = ops[i];
				const arg = args[i];
				const result = (obj as any)[op](...arg);
				const expected = (ref as any)[op](...arg);
				assert.equal(result, expected);
			}
		};

		runTest(
			3,
			["enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"],
			[[1], [2], [3], [4], [], [], [], [4], []]
		);

		runTest(
			2,
			["enQueue", "deQueue", "enQueue", "enQueue", "isFull", "Front", "deQueue", "isEmpty"],
			[[1], [], [2], [3], [], [], [], []]
		);

		runTest(1, ["enQueue", "isFull", "Front", "Rear", "deQueue", "isEmpty"], [[7], [], [], [], [], []]);

		return true;
	} catch (error: any) {
		console.log("Error from designCircularQueueHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignCircularQueueJS = `function MyCircularQueue(k) {
  // Write your code here.
  // Return an object exposing "enQueue", "deQueue", "Front", "Rear",
  // "isEmpty", and "isFull" methods.
  return {
    enQueue: function(value) {

    },
    deQueue: function() {

    },
    Front: function() {

    },
    Rear: function() {

    },
    isEmpty: function() {

    },
    isFull: function() {

    }
  };
};`;

export const designCircularQueue: Problem = {
	id: "design-circular-queue",
	title: "275. Design Circular Queue",
	problemStatement: `<p class='mt-3'>
    Design a fixed-size circular queue (ring buffer) that supports the following operations:
  </p>
  <p class='mt-3'>
    <code>MyCircularQueue(k)</code> &mdash; initializes the queue with maximum size <code>k</code>.
  </p>
  <p class='mt-3'>
    <code>enQueue(value)</code> &mdash; inserts <code>value</code> at the rear; returns
    <code>true</code> if it succeeded, <code>false</code> if the queue was full.
  </p>
  <p class='mt-3'>
    <code>deQueue()</code> &mdash; removes the item from the front; returns <code>true</code> if
    it succeeded, <code>false</code> if the queue was empty.
  </p>
  <p class='mt-3'>
    <code>Front()</code> &mdash; returns the item at the front, or <code>-1</code> if empty.
  </p>
  <p class='mt-3'>
    <code>Rear()</code> &mdash; returns the item at the rear, or <code>-1</code> if empty.
  </p>
  <p class='mt-3'>
    <code>isEmpty()</code> / <code>isFull()</code> &mdash; return whether the queue is currently
    empty or full.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `MyCircularQueue(3); enQueue(1); enQueue(2); enQueue(3); enQueue(4); Rear(); isFull(); deQueue(); enQueue(4); Rear()`,
			outputText: `null, true, true, true, false, 3, true, true, true, 4`,
			explanation: "The queue holds at most 3 elements, so the fourth enQueue(4) fails until a slot is freed.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= k <= 1000</code></li>
  <li class='mt-2'><code>0 <= value <= 1000</code></li>
  <li class='mt-2'>At most <code>3000</code> calls will be made to the queue's operations.</li>`,
	starterCode: starterCodeDesignCircularQueueJS,
	handlerFunction: designCircularQueueHandler,
	starterFunctionName: "function MyCircularQueue(",
	order: 275,
};
