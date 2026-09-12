import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][]): number {
	if (intervals.length === 0) return 0;
	const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
	const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
	let rooms = 0;
	let maxRooms = 0;
	let s = 0;
	let e = 0;
	while (s < starts.length) {
		if (starts[s] < ends[e]) {
			rooms++;
			s++;
		} else {
			rooms--;
			e++;
		}
		maxRooms = Math.max(maxRooms, rooms);
	}
	return maxRooms;
}

export const meetingRoomsIiHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[0, 30],
				[5, 10],
				[15, 20],
			],
			[
				[7, 10],
				[2, 4],
			],
			[],
			[
				[1, 5],
				[8, 9],
				[8, 9],
			],
			[
				[1, 10],
				[2, 7],
				[3, 19],
				[8, 12],
				[10, 20],
				[11, 30],
			],
		];
		for (const intervals of tests) {
			const expected = referenceSolution(intervals);
			const result = fn(intervals);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from meetingRoomsIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMeetingRoomsIiJS = `function minMeetingRooms(intervals) {
  // Write your code here
};`;

export const meetingRoomsIi: Problem = {
	id: "meeting-rooms-ii",
	title: "245. Meeting Rooms II",
	problemStatement: `<p class='mt-3'>
    You are given an array of meeting time intervals <code>intervals</code>, where
    <code>intervals[i] = [start_i, end_i]</code>.
  </p>
  <p class='mt-3'>
    Return the minimum number of conference rooms required so that all the meetings can be held without any
    two overlapping meetings sharing the same room.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[0,30],[5,10],[15,20]]",
			outputText: "2",
			explanation: "[5,10] and [15,20] can share a room after [0,30] frees it up, but [0,30] itself needs a second room while [5,10] runs.",
		},
		{
			id: 1,
			inputText: "intervals = [[7,10],[2,4]]",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= intervals.length <= 10^4</code></li>
<li class='mt-2'><code>0 <= start_i < end_i <= 10^6</code></li>`,
	starterCode: starterCodeMeetingRoomsIiJS,
	handlerFunction: meetingRoomsIiHandler,
	starterFunctionName: "function minMeetingRooms(",
	order: 245,
};
