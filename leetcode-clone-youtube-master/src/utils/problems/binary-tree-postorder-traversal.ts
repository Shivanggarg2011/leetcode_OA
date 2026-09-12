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

// Builds a binary tree from a level-order array (LeetCode style), where
// `null` marks a missing child.
function buildTree(values: Array<number | null>): TreeNode | null {
	if (values.length === 0 || values[0] === null) return null;
	const root = new TreeNode(values[0] as number);
	const queue: TreeNode[] = [root];
	let i = 1;
	while (i < values.length && queue.length > 0) {
		const node = queue.shift()!;
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

// Reference solution: classic left -> right -> node postorder recursion.
function referencePostorder(root: TreeNode | null): number[] {
	const result: number[] = [];
	function helper(node: TreeNode | null) {
		if (!node) return;
		helper(node.left);
		helper(node.right);
		result.push(node.val);
	}
	helper(root);
	return result;
}

export const binaryTreePostorderTraversalHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, null, 2, 3],
			[],
			[1],
			[1, 2, 3, 4, 5],
			[5, 4, 6, null, null, 3, 7],
			[1, 2, 3, 4, null, null, 5, null, null, null, 6],
		];
		for (const values of tests) {
			const expected = referencePostorder(buildTree(values));
			const result = fn(buildTree(values));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreePostorderTraversalHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreePostorderTraversalJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function postorderTraversal(root) {
  // Write your code here
};`;

export const binaryTreePostorderTraversal: Problem = {
	id: "binary-tree-postorder-traversal",
	title: "130. Binary Tree Postorder Traversal",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the values of its nodes using a
    <strong>postorder traversal</strong>.
  </p>
  <p class='mt-3'>
    A postorder traversal visits a node's <strong>left</strong> subtree, then its
    <strong>right</strong> subtree, and finally the node itself.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `root = [1,null,2,3]`,
			outputText: `[3,2,1]`,
			explanation: "Node 1 has no left child and a right child 2, which itself has a left child 3.",
		},
		{
			id: 1,
			inputText: `root = []`,
			outputText: `[]`,
		},
		{
			id: 2,
			inputText: `root = [1]`,
			outputText: `[1]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>
  <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeBinaryTreePostorderTraversalJS,
	handlerFunction: binaryTreePostorderTraversalHandler,
	starterFunctionName: "function postorderTraversal(",
	order: 130,
};
