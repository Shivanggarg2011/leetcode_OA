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

function referenceLevelOrder(root: TreeNode | null): number[][] {
	if (root === null) return [];
	const result: number[][] = [];
	let queue: TreeNode[] = [root];
	while (queue.length > 0) {
		const level: number[] = [];
		const nextQueue: TreeNode[] = [];
		for (const node of queue) {
			level.push(node.val);
			if (node.left !== null) nextQueue.push(node.left);
			if (node.right !== null) nextQueue.push(node.right);
		}
		result.push(level);
		queue = nextQueue;
	}
	return result;
}

export const binaryTreeLevelOrderTraversalHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[3, 9, 20, null, null, 15, 7],
			[1],
			[],
			[1, 2, 3, 4, 5, 6, 7],
			[1, null, 2, null, 3],
			[5, 3, 8, 1, 4, 7, 9],
		];
		for (const test of tests) {
			const expected = referenceLevelOrder(buildTree(test));
			const result = fn(buildTree(test));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreeLevelOrderTraversalHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreeLevelOrderTraversalJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function binaryTreeLevelOrderTraversal(root) {
  // Write your code here
};`;

export const binaryTreeLevelOrderTraversal: Problem = {
	id: "binary-tree-level-order-traversal",
	title: "111. Binary Tree Level Order Traversal",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the values of its nodes grouped level by
    level, from top to bottom. Within each level, list the values from left to right.
  </p>
  <p class='mt-3'>
    The result should be an array of arrays &mdash; one inner array per level of the tree. An empty
    tree produces an empty result array.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,9,20,null,null,15,7]`,
			outputText: `[[3],[9,20],[15,7]]`,
		},
		{
			id: 1,
			inputText: `root = [1]`,
			outputText: `[[1]]`,
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>
<li class='mt-2'><code>-1000 <= Node.val <= 1000</code></li>`,
	starterCode: starterCodeBinaryTreeLevelOrderTraversalJS,
	handlerFunction: binaryTreeLevelOrderTraversalHandler,
	starterFunctionName: "function binaryTreeLevelOrderTraversal(",
	order: 111,
};
