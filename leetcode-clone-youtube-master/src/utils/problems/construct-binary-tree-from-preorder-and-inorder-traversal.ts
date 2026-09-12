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

// Canonical nested-array serialization used to compare tree shapes/values exactly.
function serializeTree(node: TreeNode | null): any {
	if (node === null) return null;
	return [node.val, serializeTree(node.left), serializeTree(node.right)];
}

function referenceBuildTree(preorder: number[], inorder: number[]): TreeNode | null {
	const inorderIndex = new Map<number, number>();
	inorder.forEach((val, idx) => inorderIndex.set(val, idx));
	let preIdx = 0;

	function build(left: number, right: number): TreeNode | null {
		if (left > right) return null;
		const rootVal = preorder[preIdx++];
		const root = new TreeNode(rootVal);
		const mid = inorderIndex.get(rootVal) as number;
		root.left = build(left, mid - 1);
		root.right = build(mid + 1, right);
		return root;
	}

	return build(0, inorder.length - 1);
}

export const constructBinaryTreeFromPreorderAndInorderTraversalHandler = (fn: any) => {
	try {
		const tests: Array<{ preorder: number[]; inorder: number[] }> = [
			{ preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] },
			{ preorder: [-1], inorder: [-1] },
			{ preorder: [1, 2, 3], inorder: [3, 2, 1] },
			{ preorder: [1, 2, 4, 5, 3], inorder: [4, 2, 5, 1, 3] },
			{ preorder: [], inorder: [] },
			{ preorder: [1, 2], inorder: [2, 1] },
		];
		for (const test of tests) {
			const expected = serializeTree(
				referenceBuildTree(test.preorder.slice(), test.inorder.slice())
			);
			const result = serializeTree(fn(test.preorder.slice(), test.inorder.slice()));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log(
			"Error from constructBinaryTreeFromPreorderAndInorderTraversalHandler: ",
			error
		);
		throw new Error(error);
	}
};

const starterCodeConstructBinaryTreeFromPreorderAndInorderTraversalJS = `function constructBinaryTreeFromPreorderAndInorderTraversal(preorder, inorder) {
  // Write your code here
  // Return the root of the reconstructed binary tree
};`;

export const constructBinaryTreeFromPreorderAndInorderTraversal: Problem = {
	id: "construct-binary-tree-from-preorder-and-inorder-traversal",
	title: "117. Construct Binary Tree from Preorder and Inorder Traversal",
	problemStatement: `<p class='mt-3'>
    You are given two integer arrays, <code>preorder</code> and <code>inorder</code>, which represent
    the preorder and inorder traversals of the same binary tree, respectively. All node values in the
    tree are unique.
  </p>
  <p class='mt-3'>
    Build and return the root of the binary tree that produces exactly these two traversals.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]`,
			outputText: `[3,9,20,null,null,15,7]`,
			explanation: "3 is the root (first in preorder). In inorder, everything left of 3 (just 9) is the left subtree, and everything right (15,20,7) is the right subtree.",
		},
		{
			id: 1,
			inputText: `preorder = [-1], inorder = [-1]`,
			outputText: `[-1]`,
		},
		{
			id: 2,
			inputText: `preorder = [1,2,3], inorder = [3,2,1]`,
			outputText: `[1,2,null,3]`,
			explanation: "1 is the root; since inorder has 3,2 entirely before 1, the whole rest of the tree is a left-leaning chain.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= preorder.length <= 3000</code></li>
<li class='mt-2'><code>inorder.length == preorder.length</code></li>
<li class='mt-2'><code>-3000 <= preorder[i], inorder[i] <= 3000</code></li>
<li class='mt-2'>All values in <code>preorder</code> and <code>inorder</code> are unique.</li>
<li class='mt-2'><code>inorder</code> is guaranteed to be the inorder traversal of the same tree that <code>preorder</code> is the preorder traversal of.</li>`,
	starterCode: starterCodeConstructBinaryTreeFromPreorderAndInorderTraversalJS,
	handlerFunction: constructBinaryTreeFromPreorderAndInorderTraversalHandler,
	starterFunctionName:
		"function constructBinaryTreeFromPreorderAndInorderTraversal(",
	order: 117,
};
