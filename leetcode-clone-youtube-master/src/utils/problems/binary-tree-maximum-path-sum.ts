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

function referenceMaxPathSum(root: TreeNode | null): number {
	let best = -Infinity;
	function gain(node: TreeNode | null): number {
		if (node === null) return 0;
		const leftGain = Math.max(gain(node.left), 0);
		const rightGain = Math.max(gain(node.right), 0);
		best = Math.max(best, node.val + leftGain + rightGain);
		return node.val + Math.max(leftGain, rightGain);
	}
	gain(root);
	return best;
}

export const binaryTreeMaximumPathSumHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 3],
			[-10, 9, 20, null, null, 15, 7],
			[-3],
			[2, -1],
			[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
			[-1, -2, -3],
		];
		for (const test of tests) {
			const expected = referenceMaxPathSum(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binaryTreeMaximumPathSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinaryTreeMaximumPathSumJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function binaryTreeMaximumPathSum(root) {
  // Write your code here
};`;

export const binaryTreeMaximumPathSum: Problem = {
	id: "binary-tree-maximum-path-sum",
	title: "118. Binary Tree Maximum Path Sum",
	problemStatement: `<p class='mt-3'>
    A <strong>path</strong> in a binary tree is any sequence of nodes where each pair of adjacent
    nodes in the sequence is connected by an edge, and no node appears more than once in the sequence.
    A path does not need to pass through the root, and it does not need to be a strictly downward
    path &mdash; it may go up through a node and back down into its other subtree.
  </p>
  <p class='mt-3'>
    The <strong>path sum</strong> of a path is the total of the node values along it. Given the
    <code>root</code> of a binary tree, return the maximum path sum of any non-empty path in the tree.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,3]`,
			outputText: `6`,
			explanation: "The best path is 2 -> 1 -> 3, with sum 2 + 1 + 3 = 6.",
		},
		{
			id: 1,
			inputText: `root = [-10,9,20,null,null,15,7]`,
			outputText: `42`,
			explanation: "The best path is 15 -> 20 -> 7, with sum 15 + 20 + 7 = 42.",
		},
		{
			id: 2,
			inputText: `root = [-3]`,
			outputText: `-3`,
			explanation: "With only one (negative) node, the best available path sum is that node's own value.",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li>
<li class='mt-2'><code>-1000 <= Node.val <= 1000</code></li>`,
	starterCode: starterCodeBinaryTreeMaximumPathSumJS,
	handlerFunction: binaryTreeMaximumPathSumHandler,
	starterFunctionName: "function binaryTreeMaximumPathSum(",
	order: 118,
};
