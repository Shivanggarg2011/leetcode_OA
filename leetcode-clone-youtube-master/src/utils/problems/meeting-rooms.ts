import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(intervals: number[][]): boolean {
	const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i][0] < sorted[i - 1][1]) return false;
	}
	return true;
}

export const meetingRoomsHandler = (fn: any) => {
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
			[[1, 5]],
			[
				[1, 10],
				[2, 3],
				[4, 5],
			],
		];
		for (const intervals of tests) {
			const expected = referenceSolution(intervals);
			const result = fn(intervals);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from meetingRoomsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMeetingRoomsJS = `function canAttendMeetings(intervals) {
  // Write your code here
};`;

export const meetingRooms: Problem = {
	id: "meeting-rooms",
	title: "244. Meeting Rooms",
	problemStatement: `<p class='mt-3'>
    You are given an array of meeting time intervals <code>intervals</code>, where
    <code>intervals[i] = [start_i, end_i]</code>.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if a single person could attend every meeting in the list without any two
    meetings overlapping in time, or <code>false</code> otherwise.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "intervals = [[0,30],[5,10],[15,20]]",
			outputText: "false",
			explanation: "[0,30] overlaps with both [5,10] and [15,20].",
		},
		{
			id: 1,
			inputText: "intervals = [[7,10],[2,4]]",
			outputText: "true",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= intervals.length <= 10^4</code></li>
<li class='mt-2'><code>0 <= start_i < end_i <= 10^6</code></li>`,
	starterCode: starterCodeMeetingRoomsJS,
	handlerFunction: meetingRoomsHandler,
	starterFunctionName: "function canAttendMeetings(",
	order: 244,
};
