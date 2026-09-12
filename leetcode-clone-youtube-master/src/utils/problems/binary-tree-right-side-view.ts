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

function referenceRightSideView(root: TreeNode | null): number[] {
	if (root === null) return [];
	const result: number[] = [];
	let queue: TreeNode[] = [root];
	while (queue.length > 0) {
		const nextQueue: TreeNode[] = [];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i];
			if (i === queue.length - 1) result.push(node.val);
			if (node.left !== null) nextQueue.push(node.left);
			if (node.right !== null) nextQueue.push(node.right);
		}
		queue = nextQueue;
	}
	return result;
}

export const binaryTreeRightSideViewHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 3, null, 5, null, 4],
			[1, null, 3],
			[],
			[1, 2, 3, 4],
			[1, 2],
			[5, 3, 8, 1, 4, 7, 9],
		];
		for (const test of tests) {
			const expected = referenceRightSideView(buildTree(test));
			const result = fn(buildTree(test));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreeRightSideViewHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreeRightSideViewJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function binaryTreeRightSideView(root) {
  // Write your code here
};`;

export const binaryTreeRightSideView: Problem = {
	id: "binary-tree-right-side-view",
	title: "113. Binary Tree Right Side View",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, imagine yourself standing on the right side of it.
    Return the values of the nodes you can see, ordered from the top level down to the bottom level.
  </p>
  <p class='mt-3'>
    In other words, for every level of the tree, take the rightmost node's value.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,3,null,5,null,4]`,
			outputText: `[1,3,4]`,
			explanation: "Level 0 has only 1. Level 1's rightmost node is 3. Level 2 contains 5 (child of 2) and 4 (child of 3); the rightmost is 4.",
		},
		{
			id: 1,
			inputText: `root = [1,null,3]`,
			outputText: `[1,3]`,
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeBinaryTreeRightSideViewJS,
	handlerFunction: binaryTreeRightSideViewHandler,
	starterFunctionName: "function binaryTreeRightSideView(",
	order: 113,
};
