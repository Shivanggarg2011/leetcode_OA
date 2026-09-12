import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Hierholzer's algorithm. Always greedily depart to the
// lexicographically smallest unused destination; if that leads to a dead
// end before using every ticket, backtracking (via the post-order
// construction below) still yields the lexicographically smallest full
// itinerary, since the answer here is provably unique.
function referenceFindItinerary(tickets: string[][]): string[] {
	const graph = new Map<string, string[]>();
	for (const [from, to] of tickets) {
		if (!graph.has(from)) graph.set(from, []);
		graph.get(from)!.push(to);
	}
	for (const destinations of graph.values()) {
		destinations.sort().reverse(); // pop() from the end gives smallest first
	}

	const route: string[] = [];

	function visit(airport: string) {
		const destinations = graph.get(airport);
		while (destinations && destinations.length > 0) {
			const next = destinations.pop()!;
			visit(next);
		}
		route.push(airport);
	}

	visit("JFK");
	return route.reverse();
}

export const reconstructItineraryHandler = (fn: any) => {
	try {
		const tests: string[][][] = [
			[
				["MUC", "LHR"],
				["JFK", "MUC"],
				["SFO", "SJC"],
				["LHR", "SFO"],
			],
			[
				["JFK", "SFO"],
				["JFK", "ATL"],
				["SFO", "ATL"],
				["ATL", "JFK"],
				["ATL", "SFO"],
			],
			[["JFK", "A"], ["A", "JFK"]],
			[
				["JFK", "KUL"],
				["JFK", "NRT"],
				["NRT", "JFK"],
			],
		];
		for (const tickets of tests) {
			const expected = referenceFindItinerary(tickets.map((t) => [...t]));
			const result = fn(tickets.map((t) => [...t]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reconstructItineraryHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReconstructItineraryJS = `function findItinerary(tickets) {
  // Write your code here
};`;

export const reconstructItinerary: Problem = {
	id: "reconstruct-itinerary",
	title: "176. Reconstruct Itinerary",
	problemStatement: `<p class='mt-3'>
    You are given a list of airline <code>tickets</code> where <code>tickets[i] = [from, to]</code>
    represents a flight departing from airport <code>from</code> and arriving at airport
    <code>to</code>. Reconstruct the itinerary, starting from <code>"JFK"</code>, that uses
    <strong>every</strong> ticket exactly once.
  </p>
  <p class='mt-3'>
    If more than one valid itinerary exists, return the one that is
    <strong>lexicographically smallest</strong> when read as a sequence of airport codes. You may
    assume all tickets form at least one valid itinerary that starts at <code>"JFK"</code> and uses
    every ticket.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`,
			outputText: `["JFK","MUC","LHR","SFO","SJC"]`,
		},
		{
			id: 1,
			inputText: `tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]`,
			outputText: `["JFK","ATL","JFK","SFO","ATL","SFO"]`,
			explanation: `Another itinerary ["JFK","SFO","ATL","JFK","ATL","SFO"] also uses every ticket, but is lexicographically larger.`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= tickets.length <= 300</code></li>
  <li class='mt-2'>Every airport code consists of three uppercase English letters.</li>
  <li class='mt-2'>All tickets, together, form at least one valid itinerary starting at <code>JFK</code>.</li>`,
	starterCode: starterCodeReconstructItineraryJS,
	handlerFunction: reconstructItineraryHandler,
	starterFunctionName: "function findItinerary(",
	order: 176,
};
