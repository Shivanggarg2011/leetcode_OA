import assert from "assert";
import { Problem } from "../types/problem";

// A simple graph node: a value and a list of neighboring nodes.
class GraphNode {
	val: number;
	neighbors: GraphNode[];

	constructor(val: number) {
		this.val = val;
		this.neighbors = [];
	}
}

// Builds a graph from an adjacency list where index i (0-based) holds the
// list of neighbor *values* (1-based) for node with value i + 1. Returns the
// node with value 1, or null for an empty graph.
function buildGraph(adjList: number[][]): GraphNode | null {
	if (adjList.length === 0) return null;
	const nodes: GraphNode[] = adjList.map((_, i) => new GraphNode(i + 1));
	adjList.forEach((neighbors, i) => {
		nodes[i].neighbors = neighbors.map((val) => nodes[val - 1]);
	});
	return nodes[0];
}

// Reference solution: BFS clone using a map from original node to its clone.
function referenceCloneGraph(node: GraphNode | null): GraphNode | null {
	if (!node) return null;
	const clones = new Map<GraphNode, GraphNode>();
	clones.set(node, new GraphNode(node.val));
	const queue: GraphNode[] = [node];

	while (queue.length > 0) {
		const current = queue.shift()!;
		for (const neighbor of current.neighbors) {
			if (!clones.has(neighbor)) {
				clones.set(neighbor, new GraphNode(neighbor.val));
				queue.push(neighbor);
			}
			clones.get(current)!.neighbors.push(clones.get(neighbor)!);
		}
	}

	return clones.get(node)!;
}

// Converts a graph (reached from `start`) into a sorted adjacency map keyed
// by node value, so two structurally-identical graphs compare equal
// regardless of neighbor list order or node identity.
function graphToAdjacencyMap(start: GraphNode | null): Record<number, number[]> {
	const map: Record<number, number[]> = {};
	if (!start) return map;
	const visited = new Set<GraphNode>([start]);
	const queue: GraphNode[] = [start];
	while (queue.length > 0) {
		const current = queue.shift()!;
		map[current.val] = current.neighbors.map((n) => n.val).sort((a, b) => a - b);
		for (const neighbor of current.neighbors) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor);
				queue.push(neighbor);
			}
		}
	}
	return map;
}

export const cloneGraphHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[2, 4],
				[1, 3],
				[2, 4],
				[1, 3],
			],
			[[]],
			[],
			[[2], [1]],
		];
		for (const adjList of tests) {
			const original = buildGraph(adjList);
			const expectedClone = referenceCloneGraph(original);
			const resultClone = fn(original);

			const expectedMap = graphToAdjacencyMap(expectedClone);
			const resultMap = graphToAdjacencyMap(resultClone);
			assert.deepStrictEqual(resultMap, expectedMap);

			// The clone must be a genuinely different node from the original
			// (when the graph is non-empty).
			if (original) {
				assert.notEqual(resultClone, original);
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from cloneGraphHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCloneGraphJS = `/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * }
 */
function cloneGraph(node) {
  // Write your code here
};`;

export const cloneGraph: Problem = {
	id: "clone-graph",
	title: "164. Clone Graph",
	problemStatement: `<p class='mt-3'>
    You are given a reference to a node in a <strong>connected</strong>, undirected graph. Every
    node has an integer <code>val</code> and a list <code>neighbors</code> of the nodes it directly
    connects to.
  </p>
  <p class='mt-3'>
    Return a <strong>deep copy</strong> (a completely new set of nodes) of the graph, preserving the
    same structure and connections as the original.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `adjList = [[2,4],[1,3],[2,4],[1,3]]`,
			outputText: `[[2,4],[1,3],[2,4],[1,3]]`,
			explanation: "Node 1's neighbors are 2 and 4, node 2's neighbors are 1 and 3, and so on. The clone must reproduce the same adjacency using new node objects.",
		},
		{
			id: 1,
			inputText: `adjList = [[]]`,
			outputText: `[[]]`,
			explanation: "A single node with no neighbors.",
		},
		{
			id: 2,
			inputText: `adjList = []`,
			outputText: `[]`,
			explanation: "An empty graph; the input node is null.",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes is in the range <code>[0, 100]</code>.</li>
  <li class='mt-2'><code>1 <= Node.val <= 100</code> and every <code>Node.val</code> is unique.</li>
  <li class='mt-2'>The graph has no repeated edges and no self-loops.</li>`,
	starterCode: starterCodeCloneGraphJS,
	handlerFunction: cloneGraphHandler,
	starterFunctionName: "function cloneGraph(",
	order: 164,
};
