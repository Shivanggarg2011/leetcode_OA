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

// reference solution: collect every value across all lists, sort, then rebuild as a single list
function referenceMergeKLists(lists: (ListNode | null)[]): ListNode | null {
	const values: number[] = [];
	for (const head of lists) {
		let current = head;
		while (current !== null) {
			values.push(current.val);
			current = current.next;
		}
	}
	values.sort((a, b) => a - b);
	return createLinkedList(values);
}

export const mergeKSortedListsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[1, 4, 5], [1, 3, 4], [2, 6]],
			[],
			[[]],
			[[1, 2, 3]],
			[[5], [1], [3]],
		];
		for (const arrays of tests) {
			const expected = getListValues(referenceMergeKLists(arrays.map(createLinkedList)));
			const result = getListValues(fn(arrays.map(createLinkedList)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from mergeKSortedListsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMergeKSortedListsJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name. lists is an array of list heads (each may be null).
function mergeKLists(lists) {
  // Write your code here
};`;

export const mergeKSortedLists: Problem = {
	id: "merge-k-sorted-lists",
	title: "100. Merge k Sorted Lists",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>lists</code> of <code>k</code> linked lists, where each linked list is
    sorted in ascending order.
  </p>
  <p class='mt-3'>Merge all the linked lists into one sorted linked list and return its head.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "lists = [[1,4,5],[1,3,4],[2,6]]",
			outputText: "[1,1,2,3,4,4,5,6]",
		},
		{
			id: 1,
			inputText: "lists = []",
			outputText: "[]",
		},
		{
			id: 2,
			inputText: "lists = [[]]",
			outputText: "[]",
		},
	],
	constraints: `<li class='mt-2'><code>k == lists.length</code></li>
<li class='mt-2'><code>0 <= k <= 10^4</code></li>
<li class='mt-2'><code>0 <= lists[i].length <= 500</code></li>
<li class='mt-2'><code>-10^4 <= lists[i][j] <= 10^4</code></li>
<li class='mt-2'>Each <code>lists[i]</code> is sorted in ascending order.</li>`,
	starterCode: starterCodeMergeKSortedListsJS,
	handlerFunction: mergeKSortedListsHandler,
	starterFunctionName: "function mergeKLists(",
	order: 100,
};
