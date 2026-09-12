import assert from "assert";
import { Problem } from "../types/problem";

// JS doesn't have a built in LinkedList class, so we'll create a small one with an extra random pointer
class RandomNode {
	val: number;
	next: RandomNode | null;
	random: RandomNode | null;

	constructor(val: number) {
		this.val = val;
		this.next = null;
		this.random = null;
	}
}

// pairs are [value, randomIndex | null], indices refer back into this same list
function createRandomList(pairs: [number, number | null][]): RandomNode | null {
	if (pairs.length === 0) return null;
	const nodes = pairs.map(([val]) => new RandomNode(val));
	for (let i = 0; i < nodes.length - 1; i++) {
		nodes[i].next = nodes[i + 1];
	}
	for (let i = 0; i < pairs.length; i++) {
		const randomIdx = pairs[i][1];
		nodes[i].random = randomIdx === null ? null : nodes[randomIdx];
	}
	return nodes[0];
}

// converts a random list back into an array of [value, randomIndex | null] pairs, independent of the
// actual object identities, so two structurally-equal copies compare equal
function serializeRandomList(head: RandomNode | null): [number, number | null][] {
	const nodes: RandomNode[] = [];
	let current = head;
	while (current !== null) {
		nodes.push(current);
		current = current.next;
	}
	const indexOf = new Map<RandomNode, number>();
	nodes.forEach((node, i) => indexOf.set(node, i));
	return nodes.map((node) => [node.val, node.random ? indexOf.get(node.random)! : null]);
}

// reference solution: map each original node to its clone, then wire up next/random in a second pass
function referenceCopyRandomList(head: RandomNode | null): RandomNode | null {
	if (head === null) return null;
	const map = new Map<RandomNode, RandomNode>();
	let current: RandomNode | null = head;
	while (current !== null) {
		map.set(current, new RandomNode(current.val));
		current = current.next;
	}
	current = head;
	while (current !== null) {
		const clone = map.get(current)!;
		clone.next = current.next ? map.get(current.next)! : null;
		clone.random = current.random ? map.get(current.random)! : null;
		current = current.next;
	}
	return map.get(head)!;
}

export const copyListWithRandomPointerHandler = (fn: any) => {
	try {
		const tests: [number, number | null][][] = [
			[
				[7, null],
				[13, 0],
				[11, 4],
				[10, 2],
				[1, 0],
			],
			[
				[1, 1],
				[2, 1],
			],
			[
				[3, null],
				[3, 0],
				[3, null],
			],
			[[1, null]],
			[],
		];
		for (const pairs of tests) {
			const original = createRandomList(pairs);
			const originalNodes = new Set<RandomNode>();
			for (let node = original; node !== null; node = node.next) originalNodes.add(node);

			const expected = serializeRandomList(referenceCopyRandomList(createRandomList(pairs)));
			const cloned = fn(original);
			const result = serializeRandomList(cloned);
			assert.deepStrictEqual(result, expected);

			// Must be an actual deep copy, not the same nodes (or the original list) handed back.
			for (let node = cloned; node !== null; node = node.next) {
				assert.ok(!originalNodes.has(node), "Expected a deep copy with new nodes, not the original list");
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from copyListWithRandomPointerHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCopyListWithRandomPointerJS = `
/**
 * Definition for a node with a random pointer.
 * function Node(val, next, random) {
 *     this.val = val;
 *     this.next = next;
 *     this.random = random;
 * }
 */
// Do not edit function name. Return the head of the deep-copied list.
function copyRandomList(head) {
  // Write your code here
};`;

export const copyListWithRandomPointer: Problem = {
	id: "copy-list-with-random-pointer",
	title: "98. Copy List with Random Pointer",
	problemStatement: `<p class='mt-3'>
    A linked list is given where each node has an extra <code>random</code> pointer, which could point
    to any node in the list, or to <code>null</code>.
  </p>
  <p class='mt-3'>
    Construct a <strong>deep copy</strong> of the list — the new list must consist of entirely new
    nodes, with each new node's value set to the corresponding original node's value. Both the
    <code>next</code> and <code>random</code> pointers of the new nodes should point to new nodes in
    the copied list, matching the structure of the original list. Return the head of the copied list.
  </p>
  <p class='mt-3'>
    Each node is represented for input/output as a pair <code>[val, random_index]</code>, where
    <code>random_index</code> is the index of the node that the <code>random</code> pointer points to
    (or <code>null</code> if it points to nothing).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
			outputText: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
		},
		{
			id: 1,
			inputText: "head = [[1,1],[2,1]]",
			outputText: "[[1,1],[2,1]]",
		},
		{
			id: 2,
			inputText: "head = [[3,null],[3,0],[3,null]]",
			outputText: "[[3,null],[3,0],[3,null]]",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= n <= 1000</code></li>
<li class='mt-2'><code>-10^4 <= Node.val <= 10^4</code></li>
<li class='mt-2'><code>Node.random</code> is <code>null</code> or points to some node in the linked list.</li>`,
	starterCode: starterCodeCopyListWithRandomPointerJS,
	handlerFunction: copyListWithRandomPointerHandler,
	starterFunctionName: "function copyRandomList(",
	order: 98,
};
