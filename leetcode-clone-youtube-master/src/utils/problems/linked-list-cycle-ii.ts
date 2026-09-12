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

// reference solution: Floyd's cycle detection extended to find the entry node of the cycle
function referenceDetectCycle(head: ListNode | null): ListNode | null {
	let slow = head;
	let fast = head;
	while (fast !== null && fast.next !== null) {
		slow = slow!.next;
		fast = fast.next.next;
		if (slow === fast) {
			let ptr = head;
			while (ptr !== slow) {
				ptr = ptr!.next;
				slow = slow!.next;
			}
			return ptr;
		}
	}
	return null;
}

export const linkedListCycleIiHandler = (fn: any) => {
	try {
		const tests: { values: number[]; pos: number }[] = [
			{ values: [3, 2, 0, -4], pos: 1 },
			{ values: [1, 2], pos: 0 },
			{ values: [1], pos: -1 },
			{ values: [], pos: -1 },
			{ values: [1, 2, 3], pos: -1 },
		];
		// The same list instance is passed to both the reference solution and the user's function so
		// that the returned node objects can be compared by identity (as LeetCode itself effectively
		// does), instead of hand-typing an expected index.
		for (const { values, pos } of tests) {
			const list = createLinkedListWithCycle(values, pos);
			const expected = referenceDetectCycle(list);
			const result = fn(list);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from linkedListCycleIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLinkedListCycleIiJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// Do not edit function name
function detectCycle(head) {
  // Write your code here
};`;

export const linkedListCycleIi: Problem = {
	id: "linked-list-cycle-ii",
	title: "95. Linked List Cycle II",
	problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a linked list, return the node where the cycle begins, or
    <code>null</code> if there is no cycle.
  </p>
  <p class='mt-3'>
    There is a cycle in a linked list if, by repeatedly following the <code>next</code> pointer, you
    eventually visit a node again. Internally, this is described by a 0-indexed <code>pos</code> that
    represents the index of the node the tail connects to, or <code>-1</code> if there is no cycle. You
    are not given <code>pos</code> directly — only the list itself.
  </p>
  <p class='mt-3'>Try to solve it using <code>O(1)</code> extra memory.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [3,2,0,-4], the tail connects to index 1 (0-indexed)",
			outputText: "the node with value 2",
		},
		{
			id: 1,
			inputText: "head = [1,2], the tail connects to index 0",
			outputText: "the node with value 1",
		},
		{
			id: 2,
			inputText: "head = [1], no cycle",
			outputText: "null",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-10^5 <= Node.val <= 10^5</code></li>`,
	starterCode: starterCodeLinkedListCycleIiJS,
	handlerFunction: linkedListCycleIiHandler,
	starterFunctionName: "function detectCycle(",
	order: 95,
};
