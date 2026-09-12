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

// reference solution: classic two-pointer merge of two sorted linked lists
function referenceMergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
	const dummy = new ListNode(0);
	let tail = dummy;
	while (list1 !== null && list2 !== null) {
		if (list1.val <= list2.val) {
			tail.next = list1;
			list1 = list1.next;
		} else {
			tail.next = list2;
			list2 = list2.next;
		}
		tail = tail.next;
	}
	tail.next = list1 !== null ? list1 : list2;
	return dummy.next;
}

export const mergeTwoSortedListsHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[1, 2, 4], [1, 3, 4]],
			[[], []],
			[[], [0]],
			[[5], [1, 2, 4]],
			[[1, 1, 1], [2, 2, 2]],
		];
		for (const [arr1, arr2] of tests) {
			const expected = getListValues(referenceMergeTwoLists(createLinkedList(arr1), createLinkedList(arr2)));
			const result = getListValues(fn(createLinkedList(arr1), createLinkedList(arr2)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from mergeTwoSortedListsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMergeTwoSortedListsJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function mergeTwoLists(list1, list2) {
  // Write your code here
};`;

export const mergeTwoSortedLists: Problem = {
	id: "merge-two-sorted-lists",
	title: "93. Merge Two Sorted Lists",
	problemStatement: `<p class='mt-3'>
    You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>, each
    sorted in non-decreasing order.
  </p>
  <p class='mt-3'>
    Merge the two lists into a single sorted linked list by splicing together the nodes of the first
    two lists, and return the head of the merged list.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "list1 = [1,2,4], list2 = [1,3,4]",
			outputText: "[1,1,2,3,4,4]",
		},
		{
			id: 1,
			inputText: "list1 = [], list2 = []",
			outputText: "[]",
		},
		{
			id: 2,
			inputText: "list1 = [], list2 = [0]",
			outputText: "[0]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>
<li class='mt-2'>Both <code>list1</code> and <code>list2</code> are sorted in non-decreasing order.</li>`,
	starterCode: starterCodeMergeTwoSortedListsJS,
	handlerFunction: mergeTwoSortedListsHandler,
	starterFunctionName: "function mergeTwoLists(",
	order: 93,
};
