import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: track value + use-frequency per key, and group keys by frequency in Maps (whose
// insertion order gives us the LRU tie-break "for free" among keys that share the same frequency)
class ReferenceLFUCache {
	capacity: number;
	minFreq: number;
	keyToVal: Map<number, number>;
	keyToFreq: Map<number, number>;
	freqToKeys: Map<number, Map<number, true>>;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.minFreq = 0;
		this.keyToVal = new Map();
		this.keyToFreq = new Map();
		this.freqToKeys = new Map();
	}

	private touch(key: number): void {
		const freq = this.keyToFreq.get(key)!;
		const keysAtFreq = this.freqToKeys.get(freq)!;
		keysAtFreq.delete(key);
		if (keysAtFreq.size === 0) {
			this.freqToKeys.delete(freq);
			if (this.minFreq === freq) this.minFreq++;
		}
		const newFreq = freq + 1;
		this.keyToFreq.set(key, newFreq);
		if (!this.freqToKeys.has(newFreq)) this.freqToKeys.set(newFreq, new Map());
		this.freqToKeys.get(newFreq)!.set(key, true);
	}

	get(key: number): number {
		if (!this.keyToVal.has(key)) return -1;
		this.touch(key);
		return this.keyToVal.get(key)!;
	}

	put(key: number, value: number): void {
		if (this.capacity <= 0) return;
		if (this.keyToVal.has(key)) {
			this.keyToVal.set(key, value);
			this.touch(key);
			return;
		}
		if (this.keyToVal.size >= this.capacity) {
			const keysAtMin = this.freqToKeys.get(this.minFreq)!;
			const evictKey = keysAtMin.keys().next().value;
			keysAtMin.delete(evictKey);
			if (keysAtMin.size === 0) this.freqToKeys.delete(this.minFreq);
			this.keyToVal.delete(evictKey);
			this.keyToFreq.delete(evictKey);
		}
		this.keyToVal.set(key, value);
		this.keyToFreq.set(key, 1);
		if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Map());
		this.freqToKeys.get(1)!.set(key, true);
		this.minFreq = 1;
	}
}

// runs the same sequence of operations against the user's class and the reference class, returning
// the array of return values (nulls for void operations like the constructor and "put")
function runOps(Cls: any, ops: string[], args: any[][]): any[] {
	const outputs: any[] = [];
	let instance: any = null;
	for (let i = 0; i < ops.length; i++) {
		if (ops[i] === "LFUCache") {
			instance = new Cls(...args[i]);
			outputs.push(null);
		} else {
			const result = instance[ops[i]](...args[i]);
			outputs.push(result === undefined ? null : result);
		}
	}
	return outputs;
}

export const lfuCacheHandler = (fn: any) => {
	try {
		const tests: { ops: string[]; args: any[][] }[] = [
			{
				ops: ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"],
				args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]],
			},
			{
				ops: ["LFUCache", "put", "get"],
				args: [[0], [0, 0], [0]],
			},
			{
				ops: ["LFUCache", "put", "put", "put", "get", "get", "get", "get"],
				args: [[3], [1, 1], [2, 2], [3, 3], [1], [2], [3], [1]],
			},
		];
		for (const test of tests) {
			const expected = runOps(ReferenceLFUCache, test.ops, test.args);
			const result = runOps(fn, test.ops, test.args);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lfuCacheHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLfuCacheJS = `class LFUCache {
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

export const lfuCache: Problem = {
	id: "lfu-cache",
	title: "102. LFU Cache",
	problemStatement: `<p class='mt-3'>
    Design a data structure that follows the constraints of a <strong>Least Frequently Used (LFU)
    cache</strong>.
  </p>
  <p class='mt-3'>Implement the <code>LFUCache</code> class:</p>
  <p class='mt-3'>
    <code>LFUCache(capacity)</code> initializes the cache with a positive size <code>capacity</code>.
  </p>
  <p class='mt-3'>
    <code>get(key)</code> returns the value of the <code>key</code> if it exists, otherwise returns
    <code>-1</code>. Every successful access increments that key's use frequency.
  </p>
  <p class='mt-3'>
    <code>put(key, value)</code> updates the value of the <code>key</code> if it exists (also counting
    as a use), or inserts the <code>key</code>-value pair with a use frequency of <code>1</code> if it
    does not. If inserting a new key would exceed <code>capacity</code>, evict the
    <strong>least frequently used</strong> key first; if there is a tie, evict the
    <strong>least recently used</strong> key among the tied keys.
  </p>
  <p class='mt-3'>Both <code>get</code> and <code>put</code> should run in average <code>O(1)</code> time.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `["LFUCache","put","put","get","put","get","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]`,
			outputText: `[null,null,null,1,null,-1,3,null,-1,3,4]`,
			explanation: "Putting (3,3) evicts key 2 since key 1 was used more recently than key 2 at that point, making key 2 the least frequently (and least recently) used.",
		},
		{
			id: 1,
			inputText: `["LFUCache","put","get"]\n[[0],[0,0],[0]]`,
			outputText: `[null,null,-1]`,
			explanation: "Capacity 0 means nothing can ever be stored.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= capacity <= 10^4</code></li>
<li class='mt-2'><code>0 <= key, value <= 10^9</code></li>
<li class='mt-2'>At most <code>2 * 10^5</code> calls will be made to <code>get</code> and <code>put</code>.</li>`,
	starterCode: starterCodeLfuCacheJS,
	handlerFunction: lfuCacheHandler,
	starterFunctionName: "class LFUCache {",
	order: 102,
};
