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

// Mutates `root` in place, exactly like the classic in-place solution.
function referenceFlatten(root: TreeNode | null): void {
	let node = root;
	while (node !== null) {
		if (node.left !== null) {
			let rightmost = node.left;
			while (rightmost.right !== null) rightmost = rightmost.right;
			rightmost.right = node.right;
			node.right = node.left;
			node.left = null;
		}
		node = node.right;
	}
}

// Reads out the values by following `.right` only, verifying `.left` stays null throughout.
function flattenedToArray(root: TreeNode | null): number[] {
	const values: number[] = [];
	let node = root;
	while (node !== null) {
		if (node.left !== null) {
			throw new Error("left child should be null everywhere after flattening");
		}
		values.push(node.val);
		node = node.right;
	}
	return values;
}

export const flattenBinaryTreeToLinkedListHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 5, 3, 4, null, 6],
			[],
			[0],
			[1, 2],
			[1, null, 2],
			[1, 2, 3, 4, 5, null, 6, 7],
		];
		for (const test of tests) {
			const expectedTree = buildTree(test);
			referenceFlatten(expectedTree);
			const expected = flattenedToArray(expectedTree);

			const actualTree = buildTree(test);
			fn(actualTree);
			const result = flattenedToArray(actualTree);

			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from flattenBinaryTreeToLinkedListHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFlattenBinaryTreeToLinkedListJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function flattenBinaryTreeToLinkedList(root) {
  // Write your code here.
  // Flatten the tree in place into a "linked list" that follows the
  // preorder traversal order, using each node's right pointer to point to
  // the next node and leaving every left pointer set to null.
  // This function does not need to return anything.
};`;

export const flattenBinaryTreeToLinkedList: Problem = {
	id: "flatten-binary-tree-to-linked-list",
	title: "127. Flatten Binary Tree to Linked List",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, flatten it in place into a "linked list" shape:
  </p>
  <p class='mt-3'>
    The linked list should use the same <code>TreeNode</code> objects, following the order of a
    preorder traversal of the original tree. Every node's <code>left</code> pointer should become
    <code>null</code>, and every node's <code>right</code> pointer should point to the next node in
    that preorder sequence.
  </p>
  <p class='mt-3'>
    You should modify the tree in place; the function does not need to return anything.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,5,3,4,null,6]`,
			outputText: `[1,null,2,null,3,null,4,null,5,null,6]`,
			explanation: "The preorder traversal is 1,2,3,4,5,6, so the tree becomes a right-only chain in that order.",
		},
		{
			id: 1,
			inputText: `root = []`,
			outputText: `[]`,
		},
		{
			id: 2,
			inputText: `root = [0]`,
			outputText: `[0]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeFlattenBinaryTreeToLinkedListJS,
	handlerFunction: flattenBinaryTreeToLinkedListHandler,
	starterFunctionName: "function flattenBinaryTreeToLinkedList(",
	order: 127,
};
