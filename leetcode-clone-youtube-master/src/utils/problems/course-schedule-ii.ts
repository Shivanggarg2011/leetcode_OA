import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: whether the prerequisite graph is a DAG (used to know
// whether a valid order should exist at all).
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	const graph: number[][] = Array.from({ length: numCourses }, () => []);
	for (const [course, prereq] of prerequisites) graph[course].push(prereq);
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

// Checks that `order` is a permutation of 0..numCourses-1 that respects
// every prerequisite pair (prereq must come before course).
function isValidTopologicalOrder(
	order: number[],
	numCourses: number,
	prerequisites: number[][]
): boolean {
	if (!Array.isArray(order) || order.length !== numCourses) return false;
	const position = new Array(numCourses).fill(-1);
	for (let i = 0; i < order.length; i++) {
		if (order[i] < 0 || order[i] >= numCourses || position[order[i]] !== -1) return false;
		position[order[i]] = i;
	}
	for (const [course, prereq] of prerequisites) {
		if (position[prereq] > position[course]) return false;
	}
	return true;
}

export const courseScheduleIiHandler = (fn: any) => {
	try {
		const tests: [number, number[][]][] = [
			[2, [[1, 0]]],
			[4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
			[1, []],
			[2, [[1, 0], [0, 1]]],
			[3, [[0, 1], [1, 2], [2, 0]]],
			[5, [[1, 0], [2, 1], [3, 2], [4, 3]]],
		];
		for (const [numCourses, prerequisites] of tests) {
			const feasible = canFinish(numCourses, prerequisites.map((p) => [...p]));
			const result = fn(numCourses, prerequisites.map((p) => [...p]));

			if (!feasible) {
				assert.deepStrictEqual(result, []);
			} else {
				assert.ok(
					isValidTopologicalOrder(result, numCourses, prerequisites),
					`Expected a valid course order, got ${JSON.stringify(result)}`
				);
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from courseScheduleIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCourseScheduleIiJS = `function findOrder(numCourses, prerequisites) {
  // Write your code here
};`;

export const courseScheduleIi: Problem = {
	id: "course-schedule-ii",
	title: "170. Course Schedule II",
	problemStatement: `<p class='mt-3'>
    There are <code>numCourses</code> courses labeled from <code>0</code> to
    <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where
    <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before course
    <code>a</code>.
  </p>
  <p class='mt-3'>
    Return <em>an ordering of courses</em> that lets you complete all of them. If there are
    multiple valid orderings, return any one of them. If it is impossible to finish all courses,
    return an empty array.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `numCourses = 2, prerequisites = [[1,0]]`,
			outputText: `[0,1]`,
			explanation: "Course 0 must come before course 1.",
		},
		{
			id: 1,
			inputText: `numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]`,
			outputText: `[0,1,2,3]`,
			explanation: "One valid order is 0, then 1 and 2 in either order, then 3.",
		},
		{
			id: 2,
			inputText: `numCourses = 1, prerequisites = []`,
			outputText: `[0]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= numCourses <= 2000</code></li>
  <li class='mt-2'><code>0 <= prerequisites.length <= 5000</code></li>
  <li class='mt-2'>All pairs <code>[a, b]</code> are distinct.</li>`,
	starterCode: starterCodeCourseScheduleIiJS,
	handlerFunction: courseScheduleIiHandler,
	starterFunctionName: "function findOrder(",
	order: 170,
};
