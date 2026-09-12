import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Dijkstra's algorithm from node k.
function referenceNetworkDelayTime(times: number[][], n: number, k: number): number {
	const graph = new Map<number, [number, number][]>();
	for (let i = 1; i <= n; i++) graph.set(i, []);
	for (const [u, v, w] of times) graph.get(u)!.push([v, w]);

	const dist = new Map<number, number>();
	for (let i = 1; i <= n; i++) dist.set(i, Infinity);
	dist.set(k, 0);

	const visited = new Set<number>();
	while (visited.size < n) {
		let u = -1;
		let best = Infinity;
		for (const [node, d] of dist) {
			if (!visited.has(node) && d < best) {
				best = d;
				u = node;
			}
		}
		if (u === -1) break;
		visited.add(u);
		for (const [v, w] of graph.get(u)!) {
			if (dist.get(u)! + w < dist.get(v)!) dist.set(v, dist.get(u)! + w);
		}
	}

	let max = 0;
	for (const [, d] of dist) {
		if (d === Infinity) return -1;
		max = Math.max(max, d);
	}
	return max;
}

export const networkDelayTimeHandler = (fn: any) => {
	try {
		const tests: [number[][], number, number][] = [
			[[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2],
			[[[1, 2, 1]], 2, 1],
			[[[1, 2, 1]], 2, 2],
			[[[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1],
			[[[1, 2, 1], [2, 1, 3]], 2, 2],
			[[], 1, 1],
		];
		for (const [times, n, k] of tests) {
			const expected = referenceNetworkDelayTime(times, n, k);
			const result = fn(times, n, k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from networkDelayTimeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNetworkDelayTimeJS = `function networkDelayTime(times, n, k) {
  // Write your code here
};`;

export const networkDelayTime: Problem = {
	id: "network-delay-time",
	title: "182. Network Delay Time",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> network nodes labeled from <code>1</code> to <code>n</code>. You are
    given a list of travel times as directed edges <code>times[i] = (u, v, w)</code>, meaning a
    signal sent from node <code>u</code> reaches node <code>v</code> after <code>w</code> time units.
  </p>
  <p class='mt-3'>
    A signal is sent from a starting node <code>k</code>. Return the minimum time it takes for the
    signal to reach <em>every</em> node in the network. If it is impossible for the signal to reach
    all <code>n</code> nodes, return <code>-1</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2`,
			outputText: `2`,
			explanation: "Node 2 reaches node 1 and 3 after 1 unit, and node 4 after 2 units.",
		},
		{
			id: 1,
			inputText: `times = [[1,2,1]], n = 2, k = 1`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `times = [[1,2,1]], n = 2, k = 2`,
			outputText: `-1`,
			explanation: "Node 2 has no outgoing edge, so node 1 can never be reached.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 100</code></li>
  <li class='mt-2'><code>0 <= times.length <= 6000</code></li>
  <li class='mt-2'><code>1 <= u, v <= n</code>, and <code>u != v</code></li>
  <li class='mt-2'><code>0 <= w <= 100</code></li>
  <li class='mt-2'><code>1 <= k <= n</code></li>`,
	starterCode: starterCodeNetworkDelayTimeJS,
	handlerFunction: networkDelayTimeHandler,
	starterFunctionName: "function networkDelayTime(",
	order: 182,
};
