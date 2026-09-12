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

// Canonical nested-array serialization used only to compare tree shapes/values in tests.
function treeToComparable(node: TreeNode | null): any {
	if (node === null) return null;
	return [node.val, treeToComparable(node.left), treeToComparable(node.right)];
}

function collectNodes(node: TreeNode | null, into: Set<TreeNode>): void {
	if (node === null) return;
	into.add(node);
	collectNodes(node.left, into);
	collectNodes(node.right, into);
}

// A straightforward, clearly-correct preorder-based serialize/deserialize round trip.
function referenceRoundTrip(root: TreeNode | null): TreeNode | null {
	function serialize(node: TreeNode | null): string {
		if (node === null) return "#";
		return `${node.val},${serialize(node.left)},${serialize(node.right)}`;
	}
	function deserialize(data: string): TreeNode | null {
		const tokens = data.split(",");
		let pos = 0;
		function build(): TreeNode | null {
			const token = tokens[pos++];
			if (token === "#") return null;
			const node = new TreeNode(parseInt(token, 10));
			node.left = build();
			node.right = build();
			return node;
		}
		return build();
	}
	return deserialize(serialize(root));
}

export const serializeAndDeserializeBinaryTreeHandler = (fn: any) => {
	try {
		const tests: Array<Array<number | null>> = [
			[1, 2, 3, null, null, 4, 5],
			[],
			[1],
			[1, 2],
			[5, 4, 7, 3, null, 2, null, -1, null, 9],
			[1, null, 2, null, 3, null, 4],
		];
		for (const test of tests) {
			const expected = treeToComparable(referenceRoundTrip(buildTree(test)));
			const result = treeToComparable(fn(buildTree(test)));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from serializeAndDeserializeBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSerializeAndDeserializeBinaryTreeJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function serializeAndDeserializeBinaryTree(root) {
  // Write your code here.
  // Encode 'root' into a string of your own format (serialize), then decode
  // that string back into a new tree with the same structure and values
  // (deserialize), and return the root of the reconstructed tree.
};`;

export const serializeAndDeserializeBinaryTree: Problem = {
	id: "serialize-and-deserialize-binary-tree",
	title: "119. Serialize and Deserialize Binary Tree",
	problemStatement: `<p class='mt-3'>
    Serialization is the process of converting an in-memory data structure into a sequence of bits or
    text so it can be stored or transmitted, and deserialization is the reverse process of rebuilding
    the structure from that representation.
  </p>
  <p class='mt-3'>
    Design a way to serialize a binary tree into a string and deserialize that string back into a
    binary tree with the exact same structure and node values as the original. There is no
    restriction on the format you choose for the string, as long as your own serializer and
    deserializer agree with each other.
  </p>
  <p class='mt-3'>
    For this exercise, implement a single function that takes the <code>root</code> of a tree,
    serializes it, immediately deserializes that string back into a brand new tree, and returns the
    root of that reconstructed tree (it should be equal in shape and values to the original,
    demonstrating that your serialize/deserialize pair works correctly together).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [1,2,3,null,null,4,5]`,
			outputText: `[1,2,3,null,null,4,5]`,
			explanation: "The reconstructed tree must have the exact same shape and values as the input.",
		},
		{
			id: 1,
			inputText: `root = []`,
			outputText: `[]`,
		},
		{
			id: 2,
			inputText: `root = [1]`,
			outputText: `[1]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li>
<li class='mt-2'><code>-1000 <= Node.val <= 1000</code></li>`,
	starterCode: starterCodeSerializeAndDeserializeBinaryTreeJS,
	handlerFunction: serializeAndDeserializeBinaryTreeHandler,
	starterFunctionName: "function serializeAndDeserializeBinaryTree(",
	order: 119,
};
