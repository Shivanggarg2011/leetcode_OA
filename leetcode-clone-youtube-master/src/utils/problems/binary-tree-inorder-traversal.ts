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

function referenceInorder(root: TreeNode | null): number[] {
	const values: number[] = [];
	function dfs(node: TreeNode | null) {
		if (node === null) return;
		dfs(node.left);
		values.push(node.val);
		dfs(node.right);
	}
	dfs(root);
	return values;
}

export const binaryTreeInorderTraversalHandler = (fn: any) => {
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
			const expected = referenceInorder(buildTree(test));
			const result = fn(buildTree(test));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreeInorderTraversalHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreeInorderTraversalJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function binaryTreeInorderTraversal(root) {
  // Write your code here
};`;

export const binaryTreeInorderTraversal: Problem = {
	id: "binary-tree-inorder-traversal",
	title: "128. Binary Tree Inorder Traversal",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the values of its nodes visited by an
    <strong>inorder</strong> traversal (left subtree, then the node itself, then right subtree).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,null,2,3]`,
			outputText: `[1,3,2]`,
			explanation: "Visiting left (nothing), node 1, then right subtree [2,3] inorder gives 3 then 2.",
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
	starterCode: starterCodeBinaryTreeInorderTraversalJS,
	handlerFunction: binaryTreeInorderTraversalHandler,
	starterFunctionName: "function binaryTreeInorderTraversal(",
	order: 128,
};
