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

function referenceCountGoodNodes(root: TreeNode | null): number {
	function dfs(node: TreeNode | null, maxSoFar: number): number {
		if (node === null) return 0;
		let count = node.val >= maxSoFar ? 1 : 0;
		const newMax = Math.max(maxSoFar, node.val);
		count += dfs(node.left, newMax);
		count += dfs(node.right, newMax);
		return count;
	}
	return dfs(root, -Infinity);
}

export const countGoodNodesInBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[3, 1, 4, 3, null, 1, 5],
			[3, 3, null, 4, 2],
			[1],
			[],
			[5, 4, 5, 1, 1, null, 5],
			[2, 1, 3],
		];
		for (const test of tests) {
			const expected = referenceCountGoodNodes(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from countGoodNodesInBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCountGoodNodesInBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function countGoodNodesInBinaryTree(root) {
  // Write your code here
};`;

export const countGoodNodesInBinaryTree: Problem = {
	id: "count-good-nodes-in-binary-tree",
	title: "114. Count Good Nodes in Binary Tree",
	problemStatement: `<p class='mt-3'>
    In a binary tree, a node <code>X</code> is called <strong>good</strong> if, on the path from the
    root to <code>X</code>, there is no node with a value greater than <code>X</code>'s value (the
    root itself always counts as good, since there are no nodes above it).
  </p>
  <p class='mt-3'>
    Given the <code>root</code> of a binary tree, return the number of good nodes in it.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,1,4,3,null,1,5]`,
			outputText: `4`,
			explanation: "Good nodes are 3 (root), 4, 5, and the second 3 (tied with the max seen so far, 3, still counts).",
		},
		{
			id: 1,
			inputText: `root = [3,3,null,4,2]`,
			outputText: `3`,
			explanation: "Good nodes are the root 3, the second 3, and 4. Node 2 is not good because its path already saw a 4.",
		},
		{
			id: 2,
			inputText: `root = [1]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[1, 10^5]</code>.</li>
<li class='mt-2'><code>-10^4 <= Node.val <= 10^4</code></li>`,
	starterCode: starterCodeCountGoodNodesInBinaryTreeJS,
	handlerFunction: countGoodNodesInBinaryTreeHandler,
	starterFunctionName: "function countGoodNodesInBinaryTree(",
	order: 114,
};
