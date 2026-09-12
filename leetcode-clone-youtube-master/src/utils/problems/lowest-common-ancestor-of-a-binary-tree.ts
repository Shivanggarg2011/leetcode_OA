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
	const found = findNodeOrNull(root, val);
	if (found === null) throw new Error(`Value ${val} not found in tree`);
	return found;
}
function findNodeOrNull(root: TreeNode | null, val: number): TreeNode | null {
	if (root === null) return null;
	if (root.val === val) return root;
	return findNodeOrNull(root.left, val) || findNodeOrNull(root.right, val);
}

function referenceLCA(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
	if (root === null || root === p || root === q) return root;
	const left = referenceLCA(root.left, p, q);
	const right = referenceLCA(root.right, p, q);
	if (left !== null && right !== null) return root;
	return left !== null ? left : right;
}

export const lowestCommonAncestorOfABinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<{ tree: Array<number | null>; p: number; q: number }> = [
			{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 1 },
			{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 4 },
			{ tree: [1, 2], p: 1, q: 2 },
			{ tree: [1, 2, 3, 4, 5, 6, 7], p: 4, q: 5 },
			{ tree: [1, 2, 3, 4, 5, 6, 7], p: 4, q: 7 },
			{ tree: [5, 3, 8, 1, 4, 7, 9], p: 1, q: 9 },
		];
		for (const test of tests) {
			const treeForExpected = buildTree(test.tree);
			const expected = (referenceLCA(
				treeForExpected,
				findNode(treeForExpected, test.p),
				findNode(treeForExpected, test.q)
			) as TreeNode).val;

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
		console.log("Error from lowestCommonAncestorOfABinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLowestCommonAncestorOfABinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function lowestCommonAncestorOfABinaryTree(root, p, q) {
  // Write your code here
  // p and q are nodes that already exist within root's tree (not necessarily a BST).
  // Return the node that is their lowest common ancestor.
};`;

export const lowestCommonAncestorOfABinaryTree: Problem = {
	id: "lowest-common-ancestor-of-a-binary-tree",
	title: "121. Lowest Common Ancestor of a Binary Tree",
	problemStatement: `<p class='mt-3'>
    You are given the <code>root</code> of a general binary tree (not necessarily a search tree),
    along with two of its nodes, <code>p</code> and <code>q</code>. Return the lowest common ancestor
    (LCA) of <code>p</code> and <code>q</code>.
  </p>
  <p class='mt-3'>
    The lowest common ancestor of two nodes is the deepest node that has both of them as descendants
    (a node counts as a descendant of itself, so if <code>p</code> is an ancestor of <code>q</code>,
    <code>p</code> itself is the answer).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4`,
			outputText: `5`,
			explanation: "5 is an ancestor of 4 (4 is 5's right child), so 5 is the LCA.",
		},
		{
			id: 2,
			inputText: `root = [1,2], p = 1, q = 2`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[2, 10^5]</code>.</li>
<li class='mt-2'><code>-10^9 <= Node.val <= 10^9</code></li>
<li class='mt-2'>All node values are unique, and <code>p</code> and <code>q</code> are both valid nodes already present in the tree.</li>`,
	starterCode: starterCodeLowestCommonAncestorOfABinaryTreeJS,
	handlerFunction: lowestCommonAncestorOfABinaryTreeHandler,
	starterFunctionName: "function lowestCommonAncestorOfABinaryTree(",
	order: 121,
};
