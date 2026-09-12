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

// Canonical nested-array serialization used to compare tree shapes/values exactly.
function serializeTree(node: TreeNode | null): any {
	if (node === null) return null;
	return [node.val, serializeTree(node.left), serializeTree(node.right)];
}

function referenceInvert(root: TreeNode | null): TreeNode | null {
	if (root === null) return null;
	const left = referenceInvert(root.left);
	const right = referenceInvert(root.right);
	root.left = right;
	root.right = left;
	return root;
}

export const invertBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[4, 2, 7, 1, 3, 6, 9],
			[2, 1, 3],
			[],
			[1],
			[1, 2, null, 3],
			[5, 3, 8, 1, 4, 7, 9, null, 2],
		];
		for (const test of tests) {
			const expected = serializeTree(referenceInvert(buildTree(test)));
			const result = serializeTree(fn(buildTree(test)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from invertBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeInvertBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function invertBinaryTree(root) {
  // Write your code here
};`;

export const invertBinaryTree: Problem = {
	id: "invert-binary-tree",
	title: "109. Invert Binary Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, invert the tree (swap every left child with its
    corresponding right child, all the way down), and return its root.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [4,2,7,1,3,6,9]`,
			outputText: `[4,7,2,9,6,3,1]`,
			explanation: "Every left/right child pair is swapped at every level.",
		},
		{
			id: 1,
			inputText: `root = [2,1,3]`,
			outputText: `[2,3,1]`,
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeInvertBinaryTreeJS,
	handlerFunction: invertBinaryTreeHandler,
	starterFunctionName: "function invertBinaryTree(",
	order: 109,
};
