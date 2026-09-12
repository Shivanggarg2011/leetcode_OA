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

function referencePreorder(root: TreeNode | null): number[] {
	const values: number[] = [];
	function dfs(node: TreeNode | null) {
		if (node === null) return;
		values.push(node.val);
		dfs(node.left);
		dfs(node.right);
	}
	dfs(root);
	return values;
}

export const binaryTreePreorderTraversalHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, null, 2, 3],
			[],
			[1],
			[1, 2],
			[1, null, 2, null, 3],
			[5, 3, 8, 1, 4, 7, 9],
		];
		for (const test of tests) {
			const expected = referencePreorder(buildTree(test));
			const result = fn(buildTree(test));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreePreorderTraversalHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreePreorderTraversalJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function binaryTreePreorderTraversal(root) {
  // Write your code here
};`;

export const binaryTreePreorderTraversal: Problem = {
	id: "binary-tree-preorder-traversal",
	title: "129. Binary Tree Preorder Traversal",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the values of its nodes visited by a
    <strong>preorder</strong> traversal (the node itself, then its left subtree, then its right
    subtree).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,null,2,3]`,
			outputText: `[1,2,3]`,
			explanation: "Visit node 1 first, then its right subtree [2,3] preorder gives 2 then 3.",
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
	starterCode: starterCodeBinaryTreePreorderTraversalJS,
	handlerFunction: binaryTreePreorderTraversalHandler,
	starterFunctionName: "function binaryTreePreorderTraversal(",
	order: 129,
};
