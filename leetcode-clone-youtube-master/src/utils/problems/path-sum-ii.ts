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

function referencePathSumII(root: TreeNode | null, targetSum: number): number[][] {
	const result: number[][] = [];
	const path: number[] = [];
	function dfs(node: TreeNode | null, remaining: number) {
		if (node === null) return;
		path.push(node.val);
		if (node.left === null && node.right === null && node.val === remaining) {
			result.push(path.slice());
		} else {
			dfs(node.left, remaining - node.val);
			dfs(node.right, remaining - node.val);
		}
		path.pop();
	}
	dfs(root, targetSum);
	return result;
}

// Order of the discovered paths is not semantically important, only which paths were found,
// so normalize before comparing (sort each path's string form, then sort the outer list).
function normalize(paths: number[][]): string[] {
	return paths.map((p) => JSON.stringify(p)).sort();
}

export const pathSumIiHandler = (fn: any) => {
	try {
		const tests: Array<{ tree: Array<number | null>; target: number }> = [
			{
				tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1],
				target: 22,
			},
			{ tree: [1, 2, 3], target: 5 },
			{ tree: [1, 2], target: 0 },
			{ tree: [], target: 0 },
			{ tree: [1], target: 1 },
			{ tree: [-2, null, -3], target: -5 },
		];
		for (const test of tests) {
			const expected = normalize(referencePathSumII(buildTree(test.tree), test.target));
			const result = normalize(fn(buildTree(test.tree), test.target));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from pathSumIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePathSumIiJS = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function pathSumIi(root, targetSum) {
  // Write your code here
  // Return an array of all root-to-leaf paths (each an array of values)
  // whose values sum to targetSum.
};`;

export const pathSumIi: Problem = {
	id: "path-sum-ii",
	title: "126. Path Sum II",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return
    <strong>all</strong> root-to-leaf paths where the sum of the node values along the path equals
    <code>targetSum</code>. Each path should be returned as an array of the values visited, in order
    from root to leaf.
  </p>
  <p class='mt-3'>
    A leaf is a node with no children. If no such paths exist, return an empty array.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22`,
			outputText: `[[5,4,11,2],[5,8,4,5]]`,
			explanation: "5+4+11+2 = 22 and 5+8+4+5 = 22 are the only two root-to-leaf paths that sum to 22.",
		},
		{
			id: 1,
			inputText: `root = [1,2,3], targetSum = 5`,
			outputText: `[]`,
		},
		{
			id: 2,
			inputText: `root = [1,2], targetSum = 0`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-1000 <= Node.val <= 1000</code></li>
<li class='mt-2'><code>-1000 <= targetSum <= 1000</code></li>`,
	starterCode: starterCodePathSumIiJS,
	handlerFunction: pathSumIiHandler,
	starterFunctionName: "function pathSumIi(",
	order: 126,
};
