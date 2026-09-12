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

function referenceIsBalanced(root: TreeNode | null): boolean {
	function height(node: TreeNode | null): number {
		if (node === null) return 0;
		const leftHeight = height(node.left);
		if (leftHeight === -1) return -1;
		const rightHeight = height(node.right);
		if (rightHeight === -1) return -1;
		if (Math.abs(leftHeight - rightHeight) > 1) return -1;
		return 1 + Math.max(leftHeight, rightHeight);
	}
	return height(root) !== -1;
}

export const balancedBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[3, 9, 20, null, null, 15, 7],
			[1, 2, 2, 3, 3, null, null, 4, 4],
			[],
			[1],
			[1, 2, null, 3, null, 4],
			[1, 2, 3, 4, 5, 6, 7],
		];
		for (const test of tests) {
			const expected = referenceIsBalanced(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from balancedBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBalancedBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function balancedBinaryTree(root) {
  // Write your code here
};`;

export const balancedBinaryTree: Problem = {
	id: "balanced-binary-tree",
	title: "122. Balanced Binary Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, determine whether it is height-balanced.
  </p>
  <p class='mt-3'>
    A binary tree is height-balanced if, for every node in the tree, the heights of its left and right
    subtrees differ by no more than <code>1</code>. This must hold for every single node, not just the
    root.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,9,20,null,null,15,7]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `root = [1,2,2,3,3,null,null,4,4]`,
			outputText: `false`,
			explanation: "The subtree rooted at the first 2 has left height 2 and right height 0, a difference greater than 1.",
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-10^4 <= Node.val <= 10^4</code></li>`,
	starterCode: starterCodeBalancedBinaryTreeJS,
	handlerFunction: balancedBinaryTreeHandler,
	starterFunctionName: "function balancedBinaryTree(",
	order: 122,
};
