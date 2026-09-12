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

// reference solution: read the list into an array and check it reads the same forwards and backwards
function referenceIsPalindrome(head: ListNode | null): boolean {
	const values: number[] = [];
	let current = head;
	while (current !== null) {
		values.push(current.val);
		current = current.next;
	}
	for (let i = 0, j = values.length - 1; i < j; i++, j--) {
		if (values[i] !== values[j]) return false;
	}
	return true;
}

export const palindromeLinkedListHandler = (fn: any) => {
	try {
		const tests: number[][] = [[1, 2, 2, 1], [1, 2], [1], [], [1, 2, 3, 2, 1], [1, 1, 2]];
		for (const values of tests) {
			const expected = referenceIsPalindrome(createLinkedList(values));
			const result = fn(createLinkedList(values));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from palindromeLinkedListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePalindromeLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function isPalindrome(head) {
  // Write your code here
};`;

export const palindromeLinkedList: Problem = {
	id: "palindrome-linked-list",
	title: "103. Palindrome Linked List",
	problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a singly linked list, return <code>true</code> if it reads the same
    forwards and backwards (is a palindrome), or <code>false</code> otherwise.
  </p>
  <p class='mt-3'>Try to solve it in <code>O(n)</code> time and <code>O(1)</code> extra space.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,2,1]",
			outputText: "true",
		},
		{
			id: 1,
			inputText: "head = [1,2]",
			outputText: "false",
		},
		{
			id: 2,
			inputText: "head = [1]",
			outputText: "true",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 5 * 10^4]</code>.</li>
<li class='mt-2'><code>0 <= Node.val <= 9</code></li>`,
	starterCode: starterCodePalindromeLinkedListJS,
	handlerFunction: palindromeLinkedListHandler,
	starterFunctionName: "function isPalindrome(",
	order: 103,
};
