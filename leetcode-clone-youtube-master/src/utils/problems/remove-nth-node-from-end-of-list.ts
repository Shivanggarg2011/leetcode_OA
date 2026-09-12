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

// reference solution: two pointers kept n apart so the slower one lands right before the node to remove
function referenceRemoveNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	const dummy = new ListNode(0);
	dummy.next = head;
	let fast: ListNode | null = dummy;
	let slow: ListNode | null = dummy;
	for (let i = 0; i < n; i++) {
		fast = fast!.next;
	}
	while (fast!.next !== null) {
		fast = fast!.next;
		slow = slow!.next;
	}
	slow!.next = slow!.next!.next;
	return dummy.next;
}

export const removeNthNodeFromEndOfListHandler = (fn: any) => {
	try {
		const tests: { values: number[]; n: number }[] = [
			{ values: [1, 2, 3, 4, 5], n: 2 },
			{ values: [1], n: 1 },
			{ values: [1, 2], n: 1 },
			{ values: [1, 2], n: 2 },
			{ values: [1, 2, 3], n: 3 },
		];
		for (const { values, n } of tests) {
			const expected = getListValues(referenceRemoveNthFromEnd(createLinkedList(values), n));
			const result = getListValues(fn(createLinkedList(values), n));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeNthNodeFromEndOfListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveNthNodeFromEndOfListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function removeNthFromEnd(head, n) {
  // Write your code here
};`;

export const removeNthNodeFromEndOfList: Problem = {
	id: "remove-nth-node-from-end-of-list",
	title: "97. Remove Nth Node From End of List",
	problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a linked list, remove the <code>n</code>-th node from the
    <strong>end</strong> of the list, and return its head.
  </p>
  <p class='mt-3'>Try to solve it in one pass through the list.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,4,5], n = 2",
			outputText: "[1,2,3,5]",
		},
		{
			id: 1,
			inputText: "head = [1], n = 1",
			outputText: "[]",
		},
		{
			id: 2,
			inputText: "head = [1,2], n = 1",
			outputText: "[1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is <code>sz</code>.</li>
<li class='mt-2'><code>1 <= sz <= 30</code></li>
<li class='mt-2'><code>0 <= Node.val <= 100</code></li>
<li class='mt-2'><code>1 <= n <= sz</code></li>`,
	starterCode: starterCodeRemoveNthNodeFromEndOfListJS,
	handlerFunction: removeNthNodeFromEndOfListHandler,
	starterFunctionName: "function removeNthFromEnd(",
	order: 97,
};
