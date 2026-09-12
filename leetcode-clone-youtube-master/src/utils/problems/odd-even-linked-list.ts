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

// reference solution: walk two chains at once (odd-indexed and even-indexed, 1-indexed), then splice
// the even chain onto the end of the odd chain
function referenceOddEvenList(head: ListNode | null): ListNode | null {
	if (head === null || head.next === null) return head;
	let odd: ListNode = head;
	let even: ListNode = head.next;
	const evenHead = even;
	while (even !== null && even.next !== null) {
		odd.next = even.next;
		odd = odd.next;
		even.next = odd.next;
		even = even.next!;
	}
	odd.next = evenHead;
	return head;
}

export const oddEvenLinkedListHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 3, 4, 5],
			[2, 1, 3, 5, 6, 4, 7],
			[],
			[1],
			[1, 2],
		];
		for (const values of tests) {
			const expected = getListValues(referenceOddEvenList(createLinkedList(values)));
			const result = getListValues(fn(createLinkedList(values)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from oddEvenLinkedListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeOddEvenLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function oddEvenList(head) {
  // Write your code here
};`;

export const oddEvenLinkedList: Problem = {
	id: "odd-even-linked-list",
	title: "104. Odd Even Linked List",
	problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a singly linked list, group all the nodes at
    <strong>odd</strong> positions together followed by the nodes at <strong>even</strong> positions,
    and return the reordered list.
  </p>
  <p class='mt-3'>
    Positions are <strong>1-indexed</strong> (the first node is odd, the second is even, and so on).
    Preserve the relative order of the nodes within each group.
  </p>
  <p class='mt-3'>
    You must solve it in <code>O(1)</code> extra space and <code>O(n)</code> time, only rewiring
    existing nodes (not creating new ones).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,4,5]",
			outputText: "[1,3,5,2,4]",
		},
		{
			id: 1,
			inputText: "head = [2,1,3,5,6,4,7]",
			outputText: "[2,3,6,7,1,5,4]",
		},
		{
			id: 2,
			inputText: "head = [1]",
			outputText: "[1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-10^6 <= Node.val <= 10^6</code></li>`,
	starterCode: starterCodeOddEvenLinkedListJS,
	handlerFunction: oddEvenLinkedListHandler,
	starterFunctionName: "function oddEvenList(",
	order: 104,
};
