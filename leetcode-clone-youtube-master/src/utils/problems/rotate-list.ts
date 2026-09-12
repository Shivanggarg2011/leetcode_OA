import assert from "assert";
import { Problem } from "../types/problem";

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val: number) {
		this.val = val;
		this.next = null;
	}
}

function arrayToList(values: number[]): ListNode | null {
	if (values.length === 0) return null;
	const head = new ListNode(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		current.next = new ListNode(values[i]);
		current = current.next;
	}
	return head;
}

function listToArray(head: ListNode | null): number[] {
	const values: number[] = [];
	let current = head;
	while (current !== null) {
		values.push(current.val);
		current = current.next;
	}
	return values;
}

function referenceRotateRight(head: ListNode | null, k: number): ListNode | null {
	if (head === null || head.next === null) return head;
	let length = 1;
	let tail = head;
	while (tail.next !== null) {
		tail = tail.next;
		length++;
	}
	const shift = k % length;
	if (shift === 0) return head;
	tail.next = head; // make circular
	let stepsToNewTail = length - shift - 1;
	let newTail = head;
	while (stepsToNewTail > 0) {
		newTail = newTail.next as ListNode;
		stepsToNewTail--;
	}
	const newHead = newTail.next as ListNode;
	newTail.next = null;
	return newHead;
}

export const rotateListHandler = (fn: any) => {
	try {
		const tests: Array<{ values: number[]; k: number }> = [
			{ values: [1, 2, 3, 4, 5], k: 2 },
			{ values: [0, 1, 2], k: 4 },
			{ values: [1], k: 0 },
			{ values: [], k: 0 },
			{ values: [1, 2], k: 1 },
			{ values: [1, 2, 3], k: 3 },
		];
		for (const test of tests) {
			const expected = listToArray(
				referenceRotateRight(arrayToList(test.values), test.k)
			);
			const result = listToArray(fn(arrayToList(test.values), test.k));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from rotateListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRotateListJS = `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function rotateList(head, k) {
  // Write your code here
};`;

export const rotateList: Problem = {
	id: "rotate-list",
	title: "106. Rotate List",
	problemStatement: `<p class='mt-3'>
    You are given the <code>head</code> of a singly linked list and an integer <code>k</code>.
    Rotate the list to the right by <code>k</code> places, and return the new head.
  </p>
  <p class='mt-3'>
    Rotating to the right by one place moves the last node of the list to the front, shifting every
    other node one position to the right. <code>k</code> can be larger than the length of the list, in
    which case it should effectively be taken modulo the list length.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `head = [1,2,3,4,5], k = 2`,
			outputText: `[4,5,1,2,3]`,
			explanation: "Rotating right once gives [5,1,2,3,4]; rotating again gives [4,5,1,2,3].",
		},
		{
			id: 1,
			inputText: `head = [0,1,2], k = 4`,
			outputText: `[2,0,1]`,
			explanation: "Since the list has length 3, k = 4 behaves the same as k = 1.",
		},
		{
			id: 2,
			inputText: `head = [], k = 0`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 500]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>
<li class='mt-2'><code>0 <= k <= 2 * 10^9</code></li>`,
	starterCode: starterCodeRotateListJS,
	handlerFunction: rotateListHandler,
	starterFunctionName: "function rotateList(",
	order: 106,
};
