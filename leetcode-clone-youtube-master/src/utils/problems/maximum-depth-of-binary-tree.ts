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

// Builds a binary tree from a level-order array (LeetCode style, `null` for missing children).
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

function referenceMaxDepth(root: TreeNode | null): number {
	if (root === null) return 0;
	return 1 + Math.max(referenceMaxDepth(root.left), referenceMaxDepth(root.right));
}

export const maximumDepthOfBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[3, 9, 20, null, null, 15, 7],
			[],
			[1],
			[1, null, 2, null, 3],
			[1, 2, 3, 4, 5, null, 6, 7],
			[5, 4, null, 3, null, 2, null, 1],
		];
		for (const test of tests) {
			const expected = referenceMaxDepth(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximumDepthOfBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximumDepthOfBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function maximumDepthOfBinaryTree(root) {
  // Write your code here
};`;

export const maximumDepthOfBinaryTree: Problem = {
	id: "maximum-depth-of-binary-tree",
	title: "107. Maximum Depth of Binary Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return its maximum depth.
  </p>
  <p class='mt-3'>
    A binary tree's maximum depth is the number of nodes along the longest path from the root node
    down to the farthest leaf node. An empty tree (<code>root = null</code>) has a depth of
    <code>0</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,9,20,null,null,15,7]`,
			outputText: `3`,
			explanation: "The longest path goes root -> 20 -> 15 (or 7), which is 3 nodes deep.",
		},
		{
			id: 1,
			inputText: `root = [1,null,2]`,
			outputText: `2`,
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeMaximumDepthOfBinaryTreeJS,
	handlerFunction: maximumDepthOfBinaryTreeHandler,
	starterFunctionName: "function maximumDepthOfBinaryTree(",
	order: 107,
};
