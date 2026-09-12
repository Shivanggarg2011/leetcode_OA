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

function referenceHasPathSum(root: TreeNode | null, targetSum: number): boolean {
	if (root === null) return false;
	if (root.left === null && root.right === null) {
		return root.val === targetSum;
	}
	const remaining = targetSum - root.val;
	return (
		referenceHasPathSum(root.left, remaining) || referenceHasPathSum(root.right, remaining)
	);
}

export const pathSumHandler = (fn: any) => {
	try {
		const tests: Array<{ tree: Array<number | null>; target: number }> = [
			{ tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], target: 22 },
			{ tree: [1, 2, 3], target: 5 },
			{ tree: [], target: 0 },
			{ tree: [1, 2], target: 1 },
			{ tree: [1], target: 1 },
			{ tree: [-2, null, -3], target: -5 },
		];
		for (const test of tests) {
			const expected = referenceHasPathSum(buildTree(test.tree), test.target);
			const result = fn(buildTree(test.tree), test.target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from pathSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePathSumJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function pathSum(root, targetSum) {
  // Write your code here
};`;

export const pathSum: Problem = {
	id: "path-sum",
	title: "125. Path Sum",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return
    <code>true</code> if the tree has a root-to-leaf path such that the sum of the values along that
    path equals <code>targetSum</code>. Otherwise return <code>false</code>.
  </p>
  <p class='mt-3'>
    A leaf is a node with no children. A path must start at the root and end at a leaf (it cannot
    stop partway).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22`,
			outputText: `true`,
			explanation: "The path 5 -> 4 -> 11 -> 2 sums to 22.",
		},
		{
			id: 1,
			inputText: `root = [1,2,3], targetSum = 5`,
			outputText: `false`,
			explanation: "No root-to-leaf path (1->2 sums to 3, 1->3 sums to 4) equals 5.",
		},
		{
			id: 2,
			inputText: `root = [], targetSum = 0`,
			outputText: `false`,
			explanation: "An empty tree has no root-to-leaf paths at all.",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-1000 <= Node.val <= 1000</code></li>
<li class='mt-2'><code>-1000 <= targetSum <= 1000</code></li>`,
	starterCode: starterCodePathSumJS,
	handlerFunction: pathSumHandler,
	starterFunctionName: "function pathSum(",
	order: 125,
};
