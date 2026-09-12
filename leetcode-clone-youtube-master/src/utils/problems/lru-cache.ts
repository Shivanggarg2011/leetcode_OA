import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: a JS Map preserves insertion order, and re-inserting a key moves it to the end,
// which makes it a convenient building block for a correct (if not the fastest-possible) LRU cache
class ReferenceLRUCache {
	capacity: number;
	map: Map<number, number>;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.map = new Map();
	}

	get(key: number): number {
		if (!this.map.has(key)) return -1;
		const val = this.map.get(key)!;
		this.map.delete(key);
		this.map.set(key, val);
		return val;
	}

	put(key: number, value: number): void {
		if (this.map.has(key)) {
			this.map.delete(key);
		} else if (this.map.size >= this.capacity) {
			const oldestKey = this.map.keys().next().value;
			this.map.delete(oldestKey);
		}
		this.map.set(key, value);
	}
}

// runs the same sequence of operations against the user's class and the reference class, returning
// the array of return values (nulls for void operations like the constructor and "put")
function runOps(Cls: any, ops: string[], args: any[][]): any[] {
	const outputs: any[] = [];
	let instance: any = null;
	for (let i = 0; i < ops.length; i++) {
		if (ops[i] === "LRUCache") {
			instance = new Cls(...args[i]);
			outputs.push(null);
		} else {
			const result = instance[ops[i]](...args[i]);
			outputs.push(result === undefined ? null : result);
		}
	}
	return outputs;
}

export const lruCacheHandler = (fn: any) => {
	try {
		const tests: { ops: string[]; args: any[][] }[] = [
			{
				ops: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
				args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
			},
			{
				ops: ["LRUCache", "put", "get", "put", "get", "get"],
				args: [[1], [2, 1], [2], [3, 2], [2], [3]],
			},
			{
				ops: ["LRUCache", "put", "put", "put", "get", "get", "get"],
				args: [[2], [1, 1], [2, 2], [3, 3], [1], [2], [3]],
			},
		];
		for (const test of tests) {
			const expected = runOps(ReferenceLRUCache, test.ops, test.args);
			const result = runOps(fn, test.ops, test.args);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lruCacheHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLruCacheJS = `class LRUCache {
  constructor(capacity) {
    // Write your code here
  }

  get(key) {
    // Write your code here
  }

  put(key, value) {
    // Write your code here
  }
}`;

export const lruCache: Problem = {
	id: "lru-cache",
	title: "101. LRU Cache",
	problemStatement: `<p class='mt-3'>
    Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU)
    cache</strong>.
  </p>
  <p class='mt-3'>Implement the <code>LRUCache</code> class:</p>
  <p class='mt-3'>
    <code>LRUCache(capacity)</code> initializes the cache with a positive size <code>capacity</code>.
  </p>
  <p class='mt-3'>
    <code>get(key)</code> returns the value of the <code>key</code> if it exists, otherwise returns
    <code>-1</code>. This access counts as the key having just been used.
  </p>
  <p class='mt-3'>
    <code>put(key, value)</code> updates the value of the <code>key</code> if it exists, or inserts the
    <code>key</code>-value pair if it does not. If inserting a new key would exceed the cache's
    <code>capacity</code>, evict the <strong>least recently used</strong> key first.
  </p>
  <p class='mt-3'>Both <code>get</code> and <code>put</code> must run in average <code>O(1)</code> time.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`,
			outputText: `[null,null,null,1,null,-1,null,-1,3,4]`,
		},
		{
			id: 1,
			inputText: `["LRUCache","put","get","put","get","get"]\n[[1],[2,1],[2],[3,2],[2],[3]]`,
			outputText: `[null,null,1,null,-1,2]`,
			explanation: "Capacity 1 means putting a second key always evicts the first.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= capacity <= 3000</code></li>
<li class='mt-2'><code>0 <= key, value <= 10^4</code></li>
<li class='mt-2'>At most <code>2 * 10^5</code> calls will be made to <code>get</code> and <code>put</code>.</li>`,
	starterCode: starterCodeLruCacheJS,
	handlerFunction: lruCacheHandler,
	starterFunctionName: "class LRUCache {",
	order: 101,
};
