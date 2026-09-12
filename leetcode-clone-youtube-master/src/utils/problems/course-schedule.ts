import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: detect a cycle in the prerequisite graph via DFS
// coloring (0 = unvisited, 1 = in progress, 2 = fully processed).
function referenceCanFinish(numCourses: number, prerequisites: number[][]): boolean {
	const graph: number[][] = Array.from({ length: numCourses }, () => []);
	for (const [course, prereq] of prerequisites) {
		graph[course].push(prereq);
	}
	const state = new Array(numCourses).fill(0);

	function hasCycle(course: number): boolean {
		if (state[course] === 1) return true;
		if (state[course] === 2) return false;
		state[course] = 1;
		for (const prereq of graph[course]) {
			if (hasCycle(prereq)) return true;
		}
		state[course] = 2;
		return false;
	}

	for (let course = 0; course < numCourses; course++) {
		if (hasCycle(course)) return false;
	}
	return true;
}

export const courseScheduleHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[2, [[1, 0]]],
			[2, [[1, 0], [0, 1]]],
			[1, []],
			[4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
			[3, [[0, 1], [1, 2], [2, 0]]],
			[5, [[1, 4], [2, 4], [3, 1], [3, 2]]],
		];
		for (const [numCourses, prerequisites] of tests) {
			const expected = referenceCanFinish(numCourses, prerequisites.map((p) => [...p]));
			const result = fn(numCourses, prerequisites.map((p) => [...p]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from courseScheduleHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCourseScheduleJS = `function canFinish(numCourses, prerequisites) {
  // Write your code here
};`;

export const courseSchedule: Problem = {
	id: "course-schedule",
	title: "169. Course Schedule",
	problemStatement: `<p class='mt-3'>
    There are <code>numCourses</code> courses labeled from <code>0</code> to
    <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where
    <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before course
    <code>a</code>.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if it is possible to finish all courses, or <code>false</code> if the
    prerequisites form a cycle that makes it impossible.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `numCourses = 2, prerequisites = [[1,0]]`,
			outputText: `true`,
			explanation: "Take course 0 first, then course 1.",
		},
		{
			id: 1,
			inputText: `numCourses = 2, prerequisites = [[1,0],[0,1]]`,
			outputText: `false`,
			explanation: "Course 0 needs course 1, and course 1 needs course 0 -- a cycle.",
		},
		{
			id: 2,
			inputText: `numCourses = 1, prerequisites = []`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= numCourses <= 2000</code></li>
  <li class='mt-2'><code>0 <= prerequisites.length <= 5000</code></li>
  <li class='mt-2'><code>prerequisites[i].length == 2</code></li>
  <li class='mt-2'>All pairs <code>[a, b]</code> are distinct.</li>`,
	starterCode: starterCodeCourseScheduleJS,
	handlerFunction: courseScheduleHandler,
	starterFunctionName: "function canFinish(",
	order: 169,
};
