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

function referenceIsValidBST(root: TreeNode | null): boolean {
	function validate(node: TreeNode | null, lower: number, upper: number): boolean {
		if (node === null) return true;
		if (node.val <= lower || node.val >= upper) return false;
		return validate(node.left, lower, node.val) && validate(node.right, node.val, upper);
	}
	return validate(root, -Infinity, Infinity);
}

export const validateBinarySearchTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[2, 1, 3],
			[5, 1, 4, null, null, 3, 6],
			[],
			[1],
			[5, 4, 6, null, null, 3, 7],
			[10, 5, 15, null, null, 6, 20],
		];
		for (const test of tests) {
			const expected = referenceIsValidBST(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from validateBinarySearchTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidateBinarySearchTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function validateBinarySearchTree(root) {
  // Write your code here
};`;

export const validateBinarySearchTree: Problem = {
	id: "validate-binary-search-tree",
	title: "115. Validate Binary Search Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, determine whether it is a valid binary search tree
    (BST).
  </p>
  <p class='mt-3'>
    A tree is a valid BST when, for every node, every value in that node's left subtree is strictly
    less than the node's value, every value in that node's right subtree is strictly greater than the
    node's value, and both subtrees are themselves valid BSTs.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [2,1,3]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `root = [5,1,4,null,null,3,6]`,
			outputText: `false`,
			explanation: "The root's right child is 4, whose left child is 3 — but 3 must be greater than 5 to be valid in the right subtree, and it isn't.",
		},
		{
			id: 2,
			inputText: `root = [1]`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-2^31 <= Node.val <= 2^31 - 1</code></li>`,
	starterCode: starterCodeValidateBinarySearchTreeJS,
	handlerFunction: validateBinarySearchTreeHandler,
	starterFunctionName: "function validateBinarySearchTree(",
	order: 115,
};
