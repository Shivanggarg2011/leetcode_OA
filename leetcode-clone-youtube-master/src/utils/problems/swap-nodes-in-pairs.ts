import assert from "assert";
import { Problem } from "../types/problem";

// Minimal singly linked list node used only inside this file.
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

// Clearly-correct reference implementation used to compute expected output.
function referenceSwapPairs(head: ListNode | null): ListNode | null {
	const dummy = new ListNode(0);
	dummy.next = head;
	let prev = dummy;
	while (prev.next !== null && prev.next.next !== null) {
		const first = prev.next;
		const second = first.next as ListNode;
		first.next = second.next;
		second.next = first;
		prev.next = second;
		prev = first;
	}
	return dummy.next;
}

export const swapNodesInPairsHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[],
			[1],
			[1, 2],
			[1, 2, 3],
			[1, 2, 3, 4],
			[1, 2, 3, 4, 5, 6],
		];
		for (const test of tests) {
			const expected = listToArray(referenceSwapPairs(arrayToList(test)));
			const result = listToArray(fn(arrayToList(test)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from swapNodesInPairsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSwapNodesInPairsJS = `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function swapNodesInPairs(head) {
  // Write your code here
};`;

export const swapNodesInPairs: Problem = {
	id: "swap-nodes-in-pairs",
	title: "105. Swap Nodes in Pairs",
	problemStatement: `<p class='mt-3'>
    You are given the <code>head</code> of a singly linked list. Swap every two adjacent nodes and
    return the head of the resulting list.
  </p>
  <p class='mt-3'>
    You must solve it by rearranging the existing nodes themselves &mdash; the value stored inside
    each node cannot be changed, only the links between nodes.
  </p>
  <p class='mt-3'>
    If the list has an odd number of nodes, the final node is left in place (it has no partner to
    swap with).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `head = [1,2,3,4]`,
			outputText: `[2,1,4,3]`,
			explanation: "Nodes 1 and 2 swap, then nodes 3 and 4 swap.",
		},
		{
			id: 1,
			inputText: `head = [1,2,3]`,
			outputText: `[2,1,3]`,
			explanation: "Nodes 1 and 2 swap; node 3 has no pair so it stays at the end.",
		},
		{
			id: 2,
			inputText: `head = []`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 100]</code>.</li>
<li class='mt-2'><code>0 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeSwapNodesInPairsJS,
	handlerFunction: swapNodesInPairsHandler,
	starterFunctionName: "function swapNodesInPairs(",
	order: 105,
};
