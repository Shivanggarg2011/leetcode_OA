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

function findNode(root: TreeNode | null, val: number): TreeNode {
	if (root === null) throw new Error(`Value ${val} not found in tree`);
	if (root.val === val) return root;
	const left = root.left !== null ? findNodeOrNull(root.left, val) : null;
	if (left !== null) return left;
	const right = root.right !== null ? findNodeOrNull(root.right, val) : null;
	if (right !== null) return right;
	throw new Error(`Value ${val} not found in tree`);
}
function findNodeOrNull(root: TreeNode | null, val: number): TreeNode | null {
	if (root === null) return null;
	if (root.val === val) return root;
	return findNodeOrNull(root.left, val) || findNodeOrNull(root.right, val);
}

function referenceLCA(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
	let current: TreeNode | null = root;
	while (current !== null) {
		if (p.val < current.val && q.val < current.val) {
			current = current.left;
		} else if (p.val > current.val && q.val > current.val) {
			current = current.right;
		} else {
			return current;
		}
	}
	throw new Error("LCA not found");
}

export const lowestCommonAncestorOfABinarySearchTreeHandler = (fn: any) => {
	try {
		const tests: Array<{ tree: Array<number | null>; p: number; q: number }> = [
			{ tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
			{ tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 },
			{ tree: [2, 1], p: 2, q: 1 },
			{ tree: [5, 3, 8, 1, 4, 7, 9], p: 1, q: 4 },
			{ tree: [5, 3, 8, 1, 4, 7, 9], p: 7, q: 9 },
			{ tree: [10, 5, 15, 3, 7, null, 18], p: 3, q: 7 },
		];
		for (const test of tests) {
			const treeForExpected = buildTree(test.tree);
			const expected = referenceLCA(
				treeForExpected as TreeNode,
				findNode(treeForExpected, test.p),
				findNode(treeForExpected, test.q)
			).val;

			const treeForResult = buildTree(test.tree);
			const resultNode = fn(
				treeForResult,
				findNode(treeForResult, test.p),
				findNode(treeForResult, test.q)
			);
			assert.equal(resultNode.val, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lowestCommonAncestorOfABinarySearchTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLowestCommonAncestorOfABinarySearchTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function lowestCommonAncestorOfABinarySearchTree(root, p, q) {
  // Write your code here
  // p and q are nodes that already exist within root's tree.
  // Return the node that is their lowest common ancestor.
};`;

export const lowestCommonAncestorOfABinarySearchTree: Problem = {
	id: "lowest-common-ancestor-of-a-binary-search-tree",
	title: "120. Lowest Common Ancestor of a Binary Search Tree",
	problemStatement: `<p class='mt-3'>
    You are given the <code>root</code> of a binary search tree, along with two of its nodes,
    <code>p</code> and <code>q</code>. Return the lowest common ancestor (LCA) of <code>p</code> and
    <code>q</code> in the tree.
  </p>
  <p class='mt-3'>
    The lowest common ancestor of two nodes is the deepest node in the tree that has both of them as
    descendants (a node is allowed to be a descendant of itself, so if <code>p</code> is an ancestor
    of <code>q</code>, then <code>p</code> itself is the answer).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8`,
			outputText: `6`,
			explanation: "6 is the split point where 2's branch and 8's branch diverge.",
		},
		{
			id: 1,
			inputText: `root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4`,
			outputText: `2`,
			explanation: "2 is an ancestor of 4, so 2 is its own lowest common ancestor with 4.",
		},
		{
			id: 2,
			inputText: `root = [2,1], p = 2, q = 1`,
			outputText: `2`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[2, 10^5]</code>.</li>
<li class='mt-2'><code>-10^9 <= Node.val <= 10^9</code></li>
<li class='mt-2'>All node values are unique, and <code>p</code> and <code>q</code> are both valid nodes already present in the tree.</li>`,
	starterCode: starterCodeLowestCommonAncestorOfABinarySearchTreeJS,
	handlerFunction: lowestCommonAncestorOfABinarySearchTreeHandler,
	starterFunctionName: "function lowestCommonAncestorOfABinarySearchTree(",
	order: 120,
};
