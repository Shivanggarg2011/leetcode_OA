import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: track each rider's active check-in, and accumulate
// total travel time + trip count per (start, end) station pair.
class ReferenceUndergroundSystem {
	private checkIns: Map<number, { station: string; time: number }>;
	private trips: Map<string, { totalTime: number; count: number }>;

	constructor() {
		this.checkIns = new Map();
		this.trips = new Map();
	}

	checkIn(id: number, stationName: string, t: number): void {
		this.checkIns.set(id, { station: stationName, time: t });
	}

	checkOut(id: number, stationName: string, t: number): void {
		const start = this.checkIns.get(id)!;
		this.checkIns.delete(id);
		const key = `${start.station}->${stationName}`;
		const duration = t - start.time;
		const entry = this.trips.get(key) || { totalTime: 0, count: 0 };
		entry.totalTime += duration;
		entry.count += 1;
		this.trips.set(key, entry);
	}

	getAverageTime(startStation: string, endStation: string): number {
		const key = `${startStation}->${endStation}`;
		const entry = this.trips.get(key)!;
		return entry.totalTime / entry.count;
	}
}

function approxEqual(a: number, b: number): boolean {
	return Math.abs(a - b) < 1e-5;
}

export const designUndergroundSystemHandler = (fn: any) => {
	try {
		const ops = [
			"checkIn",
			"checkIn",
			"checkIn",
			"checkOut",
			"checkOut",
			"checkOut",
			"getAverageTime",
			"checkIn",
			"checkOut",
			"getAverageTime",
			"checkIn",
			"checkOut",
			"getAverageTime",
		];
		const args: any[][] = [
			[45, "Leyton", 3],
			[32, "Paradise", 8],
			[27, "Leyton", 10],
			[45, "Waterloo", 15],
			[27, "Waterloo", 20],
			[32, "Cambridge", 22],
			["Paradise", "Cambridge"],
			[10, "Leyton", 24],
			[10, "Waterloo", 38],
			["Leyton", "Waterloo"],
			[5, "Leyton", 40],
			[5, "Waterloo", 50],
			["Leyton", "Waterloo"],
		];

		const obj = fn();
		const ref = new ReferenceUndergroundSystem();

		for (let i = 0; i < ops.length; i++) {
			const op = ops[i];
			const arg = args[i];
			const result = (obj as any)[op](...arg);
			const expected = (ref as any)[op](...arg);
			if (op === "getAverageTime") {
				assert.equal(approxEqual(result, expected), true);
			} else {
				// checkIn / checkOut don't return anything meaningful; just make
				// sure calling them doesn't throw.
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from designUndergroundSystemHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignUndergroundSystemJS = `function UndergroundSystem() {
  // Write your code here.
  // Return an object exposing "checkIn", "checkOut", and "getAverageTime" methods.
  return {
    checkIn: function(id, stationName, t) {

    },
    checkOut: function(id, stationName, t) {

    },
    getAverageTime: function(startStation, endStation) {

    }
  };
};`;

export const designUndergroundSystem: Problem = {
	id: "design-underground-system",
	title: "276. Design Underground System",
	problemStatement: `<p class='mt-3'>
    Design a system to track customer travel times between stations on an underground railway.
  </p>
  <p class='mt-3'>
    <code>checkIn(id, stationName, t)</code> &mdash; a customer with card <code>id</code> checks
    in at <code>stationName</code> at time <code>t</code>. A customer can only be checked into one
    station at a time.
  </p>
  <p class='mt-3'>
    <code>checkOut(id, stationName, t)</code> &mdash; the same customer checks out at
    <code>stationName</code> at time <code>t</code>.
  </p>
  <p class='mt-3'>
    <code>getAverageTime(startStation, endStation)</code> &mdash; returns the average time it has
    taken customers to travel from <code>startStation</code> to <code>endStation</code>, averaged
    over every completed trip between those two stations so far.
  </p>
  <p class='mt-3'>
    You may assume calls to <code>checkIn</code> and <code>checkOut</code> are always consistent
    (a customer checks in before checking out), and <code>getAverageTime</code> is only called for
    a pair of stations that has at least one completed trip.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `checkIn(45,"Leyton",3); checkIn(32,"Paradise",8); checkOut(45,"Waterloo",15); getAverageTime("Leyton","Waterloo")`,
			outputText: `null, null, null, 12.00000`,
			explanation: "Customer 45 traveled from Leyton to Waterloo in 15 - 3 = 12 time units.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= id, t <= 10^6</code></li>
  <li class='mt-2'><code>1 <= stationName.length <= 10</code></li>
  <li class='mt-2'>All calls are consistent, and timestamps for a given id are strictly increasing.</li>
  <li class='mt-2'>At most <code>2 * 10^4</code> calls total will be made.</li>`,
	starterCode: starterCodeDesignUndergroundSystemJS,
	handlerFunction: designUndergroundSystemHandler,
	starterFunctionName: "function UndergroundSystem(",
	order: 276,
};
