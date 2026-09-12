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

function referenceDiameter(root: TreeNode | null): number {
	let best = 0;
	function height(node: TreeNode | null): number {
		if (node === null) return 0;
		const leftHeight = height(node.left);
		const rightHeight = height(node.right);
		best = Math.max(best, leftHeight + rightHeight);
		return 1 + Math.max(leftHeight, rightHeight);
	}
	height(root);
	return best;
}

export const diameterOfBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 3, 4, 5],
			[1, 2],
			[],
			[1],
			[1, 2, 3, 4, 5, null, null, 6, 7],
			[1, 2, null, 3, null, 4, null, 5],
		];
		for (const test of tests) {
			const expected = referenceDiameter(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from diameterOfBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDiameterOfBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function diameterOfBinaryTree(root) {
  // Write your code here
};`;

export const diameterOfBinaryTree: Problem = {
	id: "diameter-of-binary-tree",
	title: "123. Diameter of Binary Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the length of its diameter.
  </p>
  <p class='mt-3'>
    The diameter of a binary tree is the length (measured in number of edges) of the longest path
    between any two nodes in the tree. This path may or may not pass through the root.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,3,4,5]`,
			outputText: `3`,
			explanation: "The longest path is 4 -> 2 -> 1 -> 3 (or 5 -> 2 -> 1 -> 3), which has 3 edges.",
		},
		{
			id: 1,
			inputText: `root = [1,2]`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeDiameterOfBinaryTreeJS,
	handlerFunction: diameterOfBinaryTreeHandler,
	starterFunctionName: "function diameterOfBinaryTree(",
	order: 123,
};
