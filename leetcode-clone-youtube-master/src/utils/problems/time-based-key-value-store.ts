import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: store [timestamp, value] pairs per key (timestamps are strictly increasing per
// the problem's constraints) and binary search for the largest timestamp <= the query timestamp
class ReferenceTimeMap {
	store: Map<string, [number, string][]>;

	constructor() {
		this.store = new Map();
	}

	set(key: string, value: string, timestamp: number): void {
		if (!this.store.has(key)) this.store.set(key, []);
		this.store.get(key)!.push([timestamp, value]);
	}

	get(key: string, timestamp: number): string {
		const arr = this.store.get(key);
		if (!arr) return "";
		let lo = 0;
		let hi = arr.length - 1;
		let result = "";
		while (lo <= hi) {
			const mid = Math.floor((lo + hi) / 2);
			if (arr[mid][0] <= timestamp) {
				result = arr[mid][1];
				lo = mid + 1;
			} else {
				hi = mid - 1;
			}
		}
		return result;
	}
}

// runs the same sequence of operations against the user's class and the reference class, returning
// the array of return values (nulls for void operations like the constructor and "set")
function runOps(Cls: any, ops: string[], args: any[][]): any[] {
	const outputs: any[] = [];
	let instance: any = null;
	for (let i = 0; i < ops.length; i++) {
		if (ops[i] === "TimeMap") {
			instance = new Cls(...args[i]);
			outputs.push(null);
		} else {
			const result = instance[ops[i]](...args[i]);
			outputs.push(result === undefined ? null : result);
		}
	}
	return outputs;
}

export const timeBasedKeyValueStoreHandler = (fn: any) => {
	try {
		const tests: { ops: string[]; args: any[][] }[] = [
			{
				ops: ["TimeMap", "set", "get", "get", "set", "get", "get"],
				args: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
			},
			{
				ops: ["TimeMap", "get", "set", "get"],
				args: [[], ["a", 1], ["a", "x", 5], ["a", 1]],
			},
			{
				ops: ["TimeMap", "set", "set", "set", "get", "get", "get", "get"],
				args: [[], ["k", "v1", 1], ["k", "v2", 2], ["k", "v3", 3], ["k", 1], ["k", 2], ["k", 3], ["k", 100]],
			},
		];
		for (const test of tests) {
			const expected = runOps(ReferenceTimeMap, test.ops, test.args);
			const result = runOps(fn, test.ops, test.args);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from timeBasedKeyValueStoreHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTimeBasedKeyValueStoreJS = `class TimeMap {
  constructor() {
    // Write your code here
  }

  set(key, value, timestamp) {
    // Write your code here
  }

  get(key, timestamp) {
    // Write your code here
  }
}`;

export const timeBasedKeyValueStore: Problem = {
	id: "time-based-key-value-store",
	title: "83. Time Based Key-Value Store",
	problemStatement: `<p class='mt-3'>
    Design a time-based key-value store that can store multiple values for the same key at different
    timestamps, and retrieve the value for a key at (or just before) a certain timestamp.
  </p>
  <p class='mt-3'>Implement the <code>TimeMap</code> class:</p>
  <p class='mt-3'>
    <code>set(key, value, timestamp)</code> stores the string <code>value</code> for the given
    <code>key</code> at the given <code>timestamp</code>.
  </p>
  <p class='mt-3'>
    <code>get(key, timestamp)</code> returns the value associated with <code>key</code> whose stored
    timestamp is the <strong>largest</strong> one that is <code>&lt;= timestamp</code>. If there are no
    values stored yet for that key at or before <code>timestamp</code>, return an empty string
    <code>""</code>.
  </p>
  <p class='mt-3'>
    It is guaranteed that <code>set</code> calls for the same key are made with strictly increasing
    timestamps.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `["TimeMap","set","get","get","set","get","get"]\n[[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]`,
			outputText: `[null,null,"bar","bar",null,"bar2","bar2"]`,
			explanation: "get('foo', 3) returns 'bar' since no value was set at timestamp 3, so the most recent one before it (timestamp 1) is used.",
		},
		{
			id: 1,
			inputText: `["TimeMap","get"]\n[[],["a",1]]`,
			outputText: `[null,""]`,
			explanation: "Nothing has been set for key 'a' yet, so get returns an empty string.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= key.length, value.length <= 100</code></li>
<li class='mt-2'><code>1 <= timestamp <= 10^7</code></li>
<li class='mt-2'><code>set</code> calls are made with strictly increasing <code>timestamp</code> values, per key.</li>
<li class='mt-2'>At most <code>2 * 10^5</code> calls will be made to <code>set</code> and <code>get</code>.</li>`,
	starterCode: starterCodeTimeBasedKeyValueStoreJS,
	handlerFunction: timeBasedKeyValueStoreHandler,
	starterFunctionName: "class TimeMap {",
	order: 83,
};
