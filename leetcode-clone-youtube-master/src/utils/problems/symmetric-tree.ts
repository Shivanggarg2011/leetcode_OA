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

function referenceIsSymmetric(root: TreeNode | null): boolean {
	function isMirror(a: TreeNode | null, b: TreeNode | null): boolean {
		if (a === null && b === null) return true;
		if (a === null || b === null) return false;
		if (a.val !== b.val) return false;
		return isMirror(a.left, b.right) && isMirror(a.right, b.left);
	}
	if (root === null) return true;
	return isMirror(root.left, root.right);
}

export const symmetricTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 2, 3, 4, 4, 3],
			[1, 2, 2, null, 3, null, 3],
			[],
			[1],
			[1, 2, 2],
			[1, 2, 2, 3, null, null, 3],
		];
		for (const test of tests) {
			const expected = referenceIsSymmetric(buildTree(test));
			const result = fn(buildTree(test));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from symmetricTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSymmetricTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function symmetricTree(root) {
  // Write your code here
};`;

export const symmetricTree: Problem = {
	id: "symmetric-tree",
	title: "124. Symmetric Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, check whether it is a mirror image of itself around
    its center (that is, symmetric).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,2,3,4,4,3]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `root = [1,2,2,null,3,null,3]`,
			outputText: `false`,
			explanation: "The extra node 3 appears on the inside of the right subtree but not mirrored on the left.",
		},
		{
			id: 2,
			inputText: `root = []`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 1000]</code>.</li>
<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeSymmetricTreeJS,
	handlerFunction: symmetricTreeHandler,
	starterFunctionName: "function symmetricTree(",
	order: 124,
};
