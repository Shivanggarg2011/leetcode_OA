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

function referenceSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
	if (p === null && q === null) return true;
	if (p === null || q === null) return false;
	if (p.val !== q.val) return false;
	return referenceSameTree(p.left, q.left) && referenceSameTree(p.right, q.right);
}

export const sameTreeHandler = (fn: any) => {
	try {
		const tests: Array<{ p: Array<number | null>; q: Array<number | null> }> = [
			{ p: [1, 2, 3], q: [1, 2, 3] },
			{ p: [1, 2], q: [1, null, 2] },
			{ p: [1, 2, 1], q: [1, 1, 2] },
			{ p: [], q: [] },
			{ p: [1], q: [] },
			{ p: [1, null, 2, 3], q: [1, null, 2, 3] },
		];
		for (const test of tests) {
			const expected = referenceSameTree(buildTree(test.p), buildTree(test.q));
			const result = fn(buildTree(test.p), buildTree(test.q));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from sameTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSameTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function sameTree(p, q) {
  // Write your code here
};`;

export const sameTree: Problem = {
	id: "same-tree",
	title: "108. Same Tree",
	problemStatement: `<p class='mt-3'>
    Given the roots of two binary trees, <code>p</code> and <code>q</code>, write a function to check
    if they are the same tree.
  </p>
  <p class='mt-3'>
    Two binary trees are considered the same if they are structurally identical and the nodes have
    the same values at every corresponding position.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `p = [1,2,3], q = [1,2,3]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `p = [1,2], q = [1,null,2]`,
			outputText: `false`,
			explanation: "The single child is on different sides, so the trees differ structurally.",
		},
		{
			id: 2,
			inputText: `p = [1,2,1], q = [1,1,2]`,
			outputText: `false`,
			explanation: "The values at the second level are in different positions.",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in each tree is in the range <code>[0, 100]</code>.</li>
<li class='mt-2'><code>-10^4 <= Node.val <= 10^4</code></li>`,
	starterCode: starterCodeSameTreeJS,
	handlerFunction: sameTreeHandler,
	starterFunctionName: "function sameTree(",
	order: 108,
};
