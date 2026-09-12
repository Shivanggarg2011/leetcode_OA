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

// reference solution: find the middle, reverse the second half, then weave the two halves together
function referenceReorderList(head: ListNode | null): void {
	if (head === null || head.next === null) return;
	let slow = head;
	let fast = head;
	while (fast.next !== null && fast.next.next !== null) {
		slow = slow.next!;
		fast = fast.next.next;
	}
	let second: ListNode | null = slow.next;
	slow.next = null;
	let prev: ListNode | null = null;
	while (second !== null) {
		const next: ListNode | null = second.next;
		second.next = prev;
		prev = second;
		second = next;
	}
	let first: ListNode | null = head;
	second = prev;
	while (second !== null) {
		const firstNext: ListNode | null = first!.next;
		const secondNext: ListNode | null = second.next;
		first!.next = second;
		second.next = firstNext!;
		first = firstNext;
		second = secondNext;
	}
}

export const reorderListHandler = (fn: any) => {
	try {
		const tests: number[][] = [[1, 2, 3, 4], [1, 2, 3, 4, 5], [1], [1, 2], [1, 2, 3]];
		for (const values of tests) {
			const refList = createLinkedList(values);
			referenceReorderList(refList);
			const expected = getListValues(refList);

			const userList = createLinkedList(values);
			fn(userList);
			const result = getListValues(userList);

			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reorderListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReorderListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name. Reorder the list in-place; do not return anything.
function reorderList(head) {
  // Write your code here
};`;

export const reorderList: Problem = {
	id: "reorder-list",
	title: "96. Reorder List",
	problemStatement: `<p class='mt-3'>
    You are given the head of a singly linked list containing nodes
    <code>L0 -> L1 -> ... -> Ln-1 -> Ln</code>.
  </p>
  <p class='mt-3'>
    Reorder the list in-place so it becomes
    <code>L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...</code>.
  </p>
  <p class='mt-3'>
    You may not modify the values in the list's nodes, only the nodes themselves may be rearranged. Do
    not return anything from your function; modify the list in place.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,4]",
			outputText: "[1,4,2,3]",
		},
		{
			id: 1,
			inputText: "head = [1,2,3,4,5]",
			outputText: "[1,5,2,4,3]",
		},
		{
			id: 2,
			inputText: "head = [1]",
			outputText: "[1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[1, 5 * 10^4]</code>.</li>
<li class='mt-2'><code>1 <= Node.val <= 1000</code></li>`,
	starterCode: starterCodeReorderListJS,
	handlerFunction: reorderListHandler,
	starterFunctionName: "function reorderList(",
	order: 96,
};
