import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Tarjan's bridge-finding algorithm.
function referenceCriticalConnections(n: number, connections: number[][]): number[][] {
	const graph = new Map<number, number[]>();
	for (let i = 0; i < n; i++) graph.set(i, []);
	for (const [u, v] of connections) {
		graph.get(u)!.push(v);
		graph.get(v)!.push(u);
	}

	const disc = new Array(n).fill(-1);
	const low = new Array(n).fill(-1);
	let timer = 0;
	const bridges: number[][] = [];

	function dfs(u: number, parentEdge: number) {
		disc[u] = low[u] = timer++;
		for (const v of graph.get(u)!) {
			if (v === parentEdge) {
				continue;
			}
			if (disc[v] === -1) {
				dfs(v, u);
				low[u] = Math.min(low[u], low[v]);
				if (low[v] > disc[u]) bridges.push([u, v]);
			} else {
				low[u] = Math.min(low[u], disc[v]);
			}
		}
	}

	for (let i = 0; i < n; i++) {
		if (disc[i] === -1) dfs(i, -1);
	}

	return bridges;
}

// A bridge is an undirected edge; normalize direction and order so the
// comparison doesn't depend on which endpoint was discovered first.
function normalizeEdges(edges: number[][]): number[][] {
	return edges
		.map(([a, b]) => (a < b ? [a, b] : [b, a]))
		.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
}

export const criticalConnectionsInANetworkHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[4, [[0, 1], [1, 2], [2, 0], [1, 3]]],
			[2, [[0, 1]]],
			[5, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]]],
			[6, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3]]],
			[1, []],
		];
		for (const [n, connections] of tests) {
			const expected = normalizeEdges(referenceCriticalConnections(n, connections));
			const result = normalizeEdges(fn(n, connections));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from criticalConnectionsInANetworkHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCriticalConnectionsInANetworkJS = `function criticalConnections(n, connections) {
  // Write your code here
};`;

export const criticalConnectionsInANetwork: Problem = {
	id: "critical-connections-in-a-network",
	title: "188. Critical Connections in a Network",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> servers numbered from <code>0</code> to <code>n - 1</code> connected by
    undirected server-to-server <code>connections</code>, forming a network. Each
    <code>connections[i] = [a, b]</code> represents a connection between servers <code>a</code> and
    <code>b</code>.
  </p>
  <p class='mt-3'>
    A <strong>critical connection</strong> (also called a bridge) is a connection that, if removed,
    would split the network into two or more disconnected components. Return all critical connections
    in the network, in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]`,
			outputText: `[[1,3]]`,
			explanation: "Removing 1-3 disconnects server 3 from the rest, so it's the only bridge.",
		},
		{
			id: 1,
			inputText: `n = 2, connections = [[0,1]]`,
			outputText: `[[0,1]]`,
		},
		{
			id: 2,
			inputText: `n = 1, connections = []`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 10^5</code></li>
  <li class='mt-2'><code>0 <= connections.length <= 10^5</code></li>
  <li class='mt-2'><code>connections[i].length == 2</code></li>
  <li class='mt-2'><code>0 <= a, b < n</code>, and <code>a != b</code></li>
  <li class='mt-2'>There are no repeated connections.</li>`,
	starterCode: starterCodeCriticalConnectionsInANetworkJS,
	handlerFunction: criticalConnectionsInANetworkHandler,
	starterFunctionName: "function criticalConnections(",
	order: 188,
};
