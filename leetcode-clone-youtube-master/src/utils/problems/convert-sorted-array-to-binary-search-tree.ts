import assert from "assert";
import { Problem } from "../types/problem";

export const convertSortedArrayToBinarySearchTreeHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[-10, -3, 0, 5, 9],
			[1, 3],
			[0],
			[1, 2, 3, 4, 5, 6, 7],
			[-5, -2, 0, 3, 8, 10, 15],
		];
		for (const nums of tests) {
			const root = fn([...nums]);

			// The tree returned may not be structurally identical to any single
			// "reference" tree since several balanced BSTs can represent the same
			// sorted array. Instead, verify the two properties the problem
			// requires: an in-order traversal reproduces the sorted input, and
			// the tree is height-balanced.
			const values: number[] = [];
			(function inorder(node: any) {
				if (!node) return;
				inorder(node.left);
				values.push(node.val);
				inorder(node.right);
			})(root);
			assert.deepStrictEqual(values, nums);

			function height(node: any): number {
				if (!node) return 0;
				const leftHeight = height(node.left);
				const rightHeight = height(node.right);
				if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
					return -1;
				}
				return Math.max(leftHeight, rightHeight) + 1;
			}
			assert.notEqual(height(root), -1);
		}
		return true;
	} catch (error: any) {
		console.log("Error from convertSortedArrayToBinarySearchTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeConvertSortedArrayToBinarySearchTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function sortedArrayToBST(nums) {
  // Write your code here
};`;

export const convertSortedArrayToBinarySearchTree: Problem = {
	id: "convert-sorted-array-to-binary-search-tree",
	title: "131. Convert Sorted Array to Binary Search Tree",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code> sorted in <strong>ascending order</strong>
    with no duplicate values. Build a <strong>height-balanced</strong> binary search tree from
    it and return its root.
  </p>
  <p class='mt-3'>
    A binary tree is <strong>height-balanced</strong> when, for every node, the heights of its
    left and right subtrees differ by no more than one. If multiple height-balanced trees are
    possible, returning any one of them is accepted.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [-10,-3,0,5,9]`,
			outputText: `[0,-3,9,-10,null,5]`,
			explanation: "This is one possible height-balanced BST; other arrangements are also accepted.",
		},
		{
			id: 1,
			inputText: `nums = [1,3]`,
			outputText: `[3,1]`,
			explanation: "[1,null,3] is also an accepted height-balanced BST.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
  <li class='mt-2'><code>nums</code> is sorted in strictly ascending order.</li>`,
	starterCode: starterCodeConvertSortedArrayToBinarySearchTreeJS,
	handlerFunction: convertSortedArrayToBinarySearchTreeHandler,
	starterFunctionName: "function sortedArrayToBST(",
	order: 131,
};
