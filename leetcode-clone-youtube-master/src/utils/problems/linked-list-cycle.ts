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

// builds a list from values and, if pos >= 0, links the tail back to the node at index pos
function createLinkedListWithCycle(values: number[], pos: number): ListNode | null {
	if (values.length === 0) return null;
	const nodes: ListNode[] = values.map((v) => new ListNode(v));
	for (let i = 0; i < nodes.length - 1; i++) {
		nodes[i].next = nodes[i + 1];
	}
	if (pos >= 0) {
		nodes[nodes.length - 1].next = nodes[pos];
	}
	return nodes[0];
}

// reference solution: Floyd's cycle detection (fast/slow pointers)
function referenceHasCycle(head: ListNode | null): boolean {
	let slow = head;
	let fast = head;
	while (fast !== null && fast.next !== null) {
		slow = slow!.next;
		fast = fast.next.next;
		if (slow === fast) return true;
	}
	return false;
}

export const linkedListCycleHandler = (fn: any) => {
	try {
		const tests: { values: number[]; pos: number }[] = [
			{ values: [3, 2, 0, -4], pos: 1 },
			{ values: [1, 2], pos: 0 },
			{ values: [1], pos: -1 },
			{ values: [], pos: -1 },
			{ values: [1, 2, 3, 4, 5], pos: -1 },
		];
		for (const { values, pos } of tests) {
			const expected = referenceHasCycle(createLinkedListWithCycle(values, pos));
			const result = fn(createLinkedListWithCycle(values, pos));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from linkedListCycleHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLinkedListCycleJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// Do not edit function name
function hasCycle(head) {
  // Write your code here
};`;

export const linkedListCycle: Problem = {
	id: "linked-list-cycle",
	title: "94. Linked List Cycle",
	problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a linked list, determine whether the linked list has a cycle in it.
  </p>
  <p class='mt-3'>
    There is a cycle in a linked list if, by repeatedly following the <code>next</code> pointer, you
    eventually visit a node again. Return <code>true</code> if there is a cycle, or <code>false</code>
    otherwise. You should solve it using <code>O(1)</code> extra memory.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [3,2,0,-4], the tail connects to index 1 (0-indexed)",
			outputText: "true",
		},
		{
			id: 1,
			inputText: "head = [1,2], the tail connects to index 0",
			outputText: "true",
		},
		{
			id: 2,
			inputText: "head = [1], no cycle",
			outputText: "false",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-10^5 <= Node.val <= 10^5</code></li>`,
	starterCode: starterCodeLinkedListCycleJS,
	handlerFunction: linkedListCycleHandler,
	starterFunctionName: "function hasCycle(",
	order: 94,
};
