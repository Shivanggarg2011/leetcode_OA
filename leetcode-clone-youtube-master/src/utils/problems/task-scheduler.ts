import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: the minimum time is governed by the most frequent
// task(s) — they force idle slots unless there are enough other distinct
// tasks to fill the gaps.
function referenceLeastInterval(tasks: string[], n: number): number {
	const counts = new Map<string, number>();
	for (const t of tasks) counts.set(t, (counts.get(t) || 0) + 1);
	const freqs = Array.from(counts.values());
	const maxFreq = Math.max(...freqs);
	const maxCount = freqs.filter((f) => f === maxFreq).length;
	return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}

export const taskSchedulerHandler = (fn: any) => {
	try {
		const tests: [string[], number][] = [
			[["A", "A", "A", "B", "B", "B"], 2],
			[["A", "A", "A", "B", "B", "B"], 0],
			[["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2],
			[["A", "A", "B", "B"], 1],
			[["A"], 5],
			[["A", "A", "A", "B", "B", "C", "C"], 2],
		];

		for (const [tasks, n] of tests) {
			const expected = referenceLeastInterval([...tasks], n);
			const result = fn([...tasks], n);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from taskSchedulerHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTaskSchedulerJS = `function leastInterval(tasks, n) {
  // Write your code here
};`;

export const taskScheduler: Problem = {
	id: "task-scheduler",
	title: "141. Task Scheduler",
	problemStatement: `<p class='mt-3'>
    You are given an array of characters <code>tasks</code> representing tasks a CPU needs to run,
    and a non-negative integer <code>n</code>, the required cooldown between two occurrences of the
    <strong>same</strong> task.
  </p>
  <p class='mt-3'>
    Each unit of time the CPU can either complete one task or sit idle. The same type of task may
    only be run again once at least <code>n</code> units of time have passed since it last ran.
  </p>
  <p class='mt-3'>
    Return the minimum number of time units needed to finish all the given tasks.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `tasks = ["A","A","A","B","B","B"], n = 2`,
			outputText: `8`,
			explanation: "One valid order is A -> B -> idle -> A -> B -> idle -> A -> B.",
		},
		{
			id: 1,
			inputText: `tasks = ["A","A","A","B","B","B"], n = 0`,
			outputText: `6`,
			explanation: "With no cooldown, the tasks can simply run back to back.",
		},
		{
			id: 2,
			inputText: `tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2`,
			outputText: `16`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= tasks.length <= 10^4</code></li>
  <li class='mt-2'><code>tasks[i]</code> is an uppercase English letter.</li>
  <li class='mt-2'><code>0 <= n <= 100</code></li>`,
	starterCode: starterCodeTaskSchedulerJS,
	handlerFunction: taskSchedulerHandler,
	starterFunctionName: "function leastInterval(",
	order: 141,
};
