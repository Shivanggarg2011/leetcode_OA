import assert from "assert";
import { Problem } from "../types/problem";

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val: number) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

function buildTree(values: Array<number | null>): TreeNode | null {
	if (values.length === 0 || values[0] === null) return null;
	const root = new TreeNode(values[0] as number);
	const queue: TreeNode[] = [root];
	let i = 1;
	while (queue.length > 0 && i < values.length) {
		const node = queue.shift() as TreeNode;
		if (i < values.length) {
			const leftVal = values[i++];
			if (leftVal !== null && leftVal !== undefined) {
				node.left = new TreeNode(leftVal);
				queue.push(node.left);
			}
		}
		if (i < values.length) {
			const rightVal = values[i++];
			if (rightVal !== null && rightVal !== undefined) {
				node.right = new TreeNode(rightVal);
				queue.push(node.right);
			}
		}
	}
	return root;
}

function referenceKthSmallest(root: TreeNode | null, k: number): number {
	const values: number[] = [];
	function inorder(node: TreeNode | null) {
		if (node === null) return;
		inorder(node.left);
		values.push(node.val);
		inorder(node.right);
	}
	inorder(root);
	return values[k - 1];
}

export const kthSmallestElementInABstHandler = (fn: any) => {
	try {
		const tests: Array<{ tree: Array<number | null>; k: number }> = [
			{ tree: [3, 1, 4, null, 2], k: 1 },
			{ tree: [5, 3, 6, 2, 4, null, null, 1], k: 3 },
			{ tree: [1], k: 1 },
			{ tree: [2, 1, 3], k: 2 },
			{ tree: [5, 3, 6, 2, 4, null, null, 1], k: 6 },
			{ tree: [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13], k: 4 },
		];
		for (const test of tests) {
			const expected = referenceKthSmallest(buildTree(test.tree), test.k);
			const result = fn(buildTree(test.tree), test.k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kthSmallestElementInABstHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKthSmallestElementInABstJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function kthSmallestElementInABst(root, k) {
  // Write your code here
};`;

export const kthSmallestElementInABst: Problem = {
	id: "kth-smallest-element-in-a-bst",
	title: "116. Kth Smallest Element in a BST",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary search tree and an integer <code>k</code>, return the
    <code>k</code>th smallest value among all the node values in the tree (<code>k</code> is
    1-indexed, so <code>k = 1</code> means the smallest value).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,1,4,null,2], k = 1`,
			outputText: `1`,
			explanation: "The sorted node values are [1,2,3,4], so the 1st smallest is 1.",
		},
		{
			id: 1,
			inputText: `root = [5,3,6,2,4,null,null,1], k = 3`,
			outputText: `3`,
			explanation: "The sorted node values are [1,2,3,4,5,6], so the 3rd smallest is 3.",
		},
		{
			id: 2,
			inputText: `root = [1], k = 1`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is <code>n</code>.</li>
<li class='mt-2'><code>1 <= k <= n <= 10^4</code></li>
<li class='mt-2'><code>0 <= Node.val <= 10^4</code></li>`,
	starterCode: starterCodeKthSmallestElementInABstJS,
	handlerFunction: kthSmallestElementInABstHandler,
	starterFunctionName: "function kthSmallestElementInABst(",
	order: 116,
};
