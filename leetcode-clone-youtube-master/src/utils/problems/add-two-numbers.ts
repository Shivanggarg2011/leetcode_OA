import assert from "assert";
import { Problem } from "../types/problem";

// JS doesn't have a built in LinkedList class, so we'll create a small one
class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number) {
		this.val = val;
		this.next = null;
	}
}

function createLinkedList(values: number[]): ListNode | null {
	if (values.length === 0) return null;
	const head = new ListNode(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		const node = new ListNode(values[i]);
		current.next = node;
		current = node;
	}
	return head;
}

function getListValues(head: ListNode | null): number[] {
	const values: number[] = [];
	let current = head;
	while (current !== null) {
		values.push(current.val);
		current = current.next;
	}
	return values;
}

// reference solution: simulate grade-school addition, digit by digit (both lists store digits with the
// least-significant digit first), carrying over into the next digit as needed
function referenceAddTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	const dummy = new ListNode(0);
	let tail = dummy;
	let carry = 0;
	let p1: ListNode | null = l1;
	let p2: ListNode | null = l2;
	while (p1 !== null || p2 !== null || carry !== 0) {
		const sum = (p1 ? p1.val : 0) + (p2 ? p2.val : 0) + carry;
		carry = Math.floor(sum / 10);
		tail.next = new ListNode(sum % 10);
		tail = tail.next;
		if (p1) p1 = p1.next;
		if (p2) p2 = p2.next;
	}
	return dummy.next;
}

export const addTwoNumbersHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[2, 4, 3], [5, 6, 4]],
			[[0], [0]],
			[[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]],
			[[5], [5]],
			[[1, 8], [0]],
		];
		for (const [a, b] of tests) {
			const expected = getListValues(referenceAddTwoNumbers(createLinkedList(a), createLinkedList(b)));
			const result = getListValues(fn(createLinkedList(a), createLinkedList(b)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from addTwoNumbersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeAddTwoNumbersJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function addTwoNumbers(l1, l2) {
  // Write your code here
};`;

export const addTwoNumbers: Problem = {
	id: "add-two-numbers",
	title: "99. Add Two Numbers",
	problemStatement: `<p class='mt-3'>
    You are given two non-empty linked lists, <code>l1</code> and <code>l2</code>, each representing a
    non-negative integer. The digits are stored in <strong>reverse order</strong> (the head node holds
    the least significant digit), and each node holds a single digit.
  </p>
  <p class='mt-3'>
    Add the two numbers together and return the sum as a new linked list, using the same reversed-digit
    format. You may assume neither number has leading zeros, except the number <code>0</code> itself.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "l1 = [2,4,3], l2 = [5,6,4]",
			outputText: "[7,0,8]",
			explanation: "342 + 465 = 807, which is represented in reverse order as [7,0,8].",
		},
		{
			id: 1,
			inputText: "l1 = [0], l2 = [0]",
			outputText: "[0]",
		},
		{
			id: 2,
			inputText: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
			outputText: "[8,9,9,9,0,0,0,1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in each list is in the range <code>[1, 100]</code>.</li>
<li class='mt-2'><code>0 <= Node.val <= 9</code></li>
<li class='mt-2'>Neither number has leading zeros, except for the number <code>0</code> itself.</li>`,
	starterCode: starterCodeAddTwoNumbersJS,
	handlerFunction: addTwoNumbersHandler,
	starterFunctionName: "function addTwoNumbers(",
	order: 99,
};
