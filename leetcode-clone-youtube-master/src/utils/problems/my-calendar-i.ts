import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(bookings: number[][]): boolean[] {
	const events: number[][] = [];
	const res: boolean[] = [];
	for (const [s, e] of bookings) {
		let ok = true;
		for (const [es, ee] of events) {
			if (s < ee && es < e) {
				ok = false;
				break;
			}
		}
		if (ok) events.push([s, e]);
		res.push(ok);
	}
	return res;
}

export const myCalendarIHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[10, 20],
				[15, 25],
				[20, 30],
			],
			[
				[5, 10],
				[10, 15],
			],
			[
				[1, 5],
				[2, 3],
				[4, 6],
			],
			[
				[0, 10],
				[10, 20],
				[5, 15],
			],
			[[1, 2]],
		];
		for (const bookings of tests) {
			const expected = referenceSolution(bookings);
			const result = fn(bookings);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from myCalendarIHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMyCalendarIJS = `function myCalendar(bookings) {
  // bookings is an array of [start, end] events, processed one at a time, in order.
  // Simulate booking each event on an initially-empty calendar and return an array of
  // booleans: true if that event could be booked without a double-booking (overlap with
  // any event already accepted), false if it had to be rejected. Two events overlap only
  // if they share more than just a touching endpoint.
  // Write your code here
};`;

export const myCalendarI: Problem = {
	id: "my-calendar-i",
	title: "247. My Calendar I",
	problemStatement: `<p class='mt-3'>
    Imagine a calendar that starts out empty. You are given a list <code>bookings</code> of events, where
    <code>bookings[i] = [start_i, end_i]</code>, presented in the order you must try to add them.
  </p>
  <p class='mt-3'>
    A new event can be added to the calendar only if it does not cause a <strong>double booking</strong>,
    meaning it does not overlap with any event already on the calendar. Two events
    <code>[s1, e1]</code> and <code>[s2, e2]</code> overlap only if <code>s1 < e2</code> and
    <code>s2 < e1</code> — touching at an endpoint (e.g. <code>[5,10]</code> and <code>[10,15]</code>) is
    fine.
  </p>
  <p class='mt-3'>
    Process the events in <code>bookings</code> in order: for each one, add it to the calendar if possible
    (permanently, affecting later checks), otherwise skip it. Return an array of booleans, one per event in
    <code>bookings</code>, indicating whether that event was successfully added.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "bookings = [[10,20],[15,25],[20,30]]",
			outputText: "[true,false,true]",
			explanation: "[15,25] overlaps the already-booked [10,20]. [20,30] only touches [10,20] at 20, so it's fine.",
		},
		{
			id: 1,
			inputText: "bookings = [[5,10],[10,15]]",
			outputText: "[true,true]",
			explanation: "The events only touch at 10, so both can be booked.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= bookings.length <= 1000</code></li>
<li class='mt-2'><code>0 <= start_i < end_i <= 10^9</code></li>`,
	starterCode: starterCodeMyCalendarIJS,
	handlerFunction: myCalendarIHandler,
	starterFunctionName: "function myCalendar(",
	order: 247,
};
