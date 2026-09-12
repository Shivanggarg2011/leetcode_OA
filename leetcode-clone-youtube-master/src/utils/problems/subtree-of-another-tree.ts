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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
	if (p === null && q === null) return true;
	if (p === null || q === null) return false;
	if (p.val !== q.val) return false;
	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function referenceIsSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (subRoot === null) return true;
	if (root === null) return false;
	if (isSameTree(root, subRoot)) return true;
	return referenceIsSubtree(root.left, subRoot) || referenceIsSubtree(root.right, subRoot);
}

export const subtreeOfAnotherTreeHandler = (fn: any) => {
	try {
		const tests: Array<{ root: Array<number | null>; sub: Array<number | null> }> = [
			{ root: [3, 4, 5, 1, 2], sub: [4, 1, 2] },
			{ root: [3, 4, 5, 1, 2, null, null, null, null, 0], sub: [4, 1, 2] },
			{ root: [1, 1], sub: [1] },
			{ root: [], sub: [] },
			{ root: [1, 2, 3], sub: [4] },
			{ root: [3, 4, 5, 1, 2], sub: [3, 4, 5, 1, 2] },
		];
		for (const test of tests) {
			const expected = referenceIsSubtree(buildTree(test.root), buildTree(test.sub));
			const result = fn(buildTree(test.root), buildTree(test.sub));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from subtreeOfAnotherTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubtreeOfAnotherTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function subtreeOfAnotherTree(root, subRoot) {
  // Write your code here
};`;

export const subtreeOfAnotherTree: Problem = {
	id: "subtree-of-another-tree",
	title: "110. Subtree of Another Tree",
	problemStatement: `<p class='mt-3'>
    Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return
    <code>true</code> if there is a node in <code>root</code> such that the subtree rooted at that
    node is identical in structure and values to the tree rooted at <code>subRoot</code>, and
    <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    A subtree of a tree is a node together with all of that node's descendants; it must match
    <code>subRoot</code> exactly (same shape, same values) &mdash; it is not enough for
    <code>subRoot</code> to merely appear somewhere as a partial match.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [3,4,5,1,2], subRoot = [4,1,2]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]`,
			outputText: `false`,
			explanation: "The node 4's subtree has an extra node 0, so it no longer matches subRoot exactly.",
		},
		{
			id: 2,
			inputText: `root = [1,2,3], subRoot = [4]`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in <code>root</code> is in the range <code>[0, 2000]</code>.</li>
<li class='mt-2'>The number of nodes in <code>subRoot</code> is in the range <code>[0, 1000]</code>.</li>
<li class='mt-2'><code>-10^4 <= Node.val <= 10^4</code></li>`,
	starterCode: starterCodeSubtreeOfAnotherTreeJS,
	handlerFunction: subtreeOfAnotherTreeHandler,
	starterFunctionName: "function subtreeOfAnotherTree(",
	order: 110,
};
