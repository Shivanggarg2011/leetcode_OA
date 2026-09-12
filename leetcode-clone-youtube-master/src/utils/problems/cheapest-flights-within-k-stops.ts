import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Bellman-Ford limited to k + 1 edge relaxations.
function referenceFindCheapestPrice(
	n: number,
	flights: number[][],
	src: number,
	dst: number,
	k: number
): number {
	let dist = new Array(n).fill(Infinity);
	dist[src] = 0;
	for (let i = 0; i <= k; i++) {
		const temp = [...dist];
		for (const [u, v, w] of flights) {
			if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
				temp[v] = dist[u] + w;
			}
		}
		dist = temp;
	}
	return dist[dst] === Infinity ? -1 : dist[dst];
}

export const cheapestFlightsWithinKStopsHandler = (fn: any) => {
	try {
		const tests: [number, number[][], number, number, number][] = [
			[4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1],
			[3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1],
			[3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0],
			[3, [[0, 1, 100], [1, 2, 100]], 0, 2, 0],
			[2, [[0, 1, 100]], 0, 1, 0],
		];
		for (const [n, flights, src, dst, k] of tests) {
			const expected = referenceFindCheapestPrice(n, flights, src, dst, k);
			const result = fn(n, flights, src, dst, k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from cheapestFlightsWithinKStopsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCheapestFlightsWithinKStopsJS = `function findCheapestPrice(n, flights, src, dst, k) {
  // Write your code here
};`;

export const cheapestFlightsWithinKStops: Problem = {
	id: "cheapest-flights-within-k-stops",
	title: "183. Cheapest Flights Within K Stops",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> cities numbered from <code>0</code> to <code>n - 1</code>, connected by
    flights given as <code>flights[i] = [from_i, to_i, price_i]</code>, meaning there is a flight
    from city <code>from_i</code> to city <code>to_i</code> costing <code>price_i</code>.
  </p>
  <p class='mt-3'>
    Given <code>src</code>, <code>dst</code>, and <code>k</code>, return <em>the cheapest price</em>
    to travel from <code>src</code> to <code>dst</code> using at most <code>k</code> stops
    (intermediate cities), or <code>-1</code> if no such route exists.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1`,
			outputText: `700`,
			explanation: "Route 0 -> 1 -> 3 costs 100 + 600 = 700 using at most 1 stop.",
		},
		{
			id: 1,
			inputText: `n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1`,
			outputText: `200`,
		},
		{
			id: 2,
			inputText: `n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0`,
			outputText: `500`,
			explanation: "With 0 stops allowed, only the direct flight 0 -> 2 can be used.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 100</code></li>
  <li class='mt-2'><code>0 <= flights.length <= (n * (n - 1)) / 2</code></li>
  <li class='mt-2'><code>0 <= from_i, to_i < n</code></li>
  <li class='mt-2'><code>1 <= price_i <= 10^4</code></li>
  <li class='mt-2'><code>0 <= src, dst, k < n</code></li>
  <li class='mt-2'><code>src != dst</code></li>`,
	starterCode: starterCodeCheapestFlightsWithinKStopsJS,
	handlerFunction: cheapestFlightsWithinKStopsHandler,
	starterFunctionName: "function findCheapestPrice(",
	order: 183,
};
