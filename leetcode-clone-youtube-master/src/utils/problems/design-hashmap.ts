import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a bucket array with chaining, implemented from
// scratch instead of using JS's built-in Map.
class ReferenceHashMap {
	private buckets: Array<Array<[number, number]>>;
	private static readonly SIZE = 1009;

	constructor() {
		this.buckets = Array.from({ length: ReferenceHashMap.SIZE }, () => []);
	}

	private index(key: number): number {
		return key % ReferenceHashMap.SIZE;
	}

	put(key: number, value: number): void {
		const bucket = this.buckets[this.index(key)];
		for (const pair of bucket) {
			if (pair[0] === key) {
				pair[1] = value;
				return;
			}
		}
		bucket.push([key, value]);
	}

	get(key: number): number {
		const bucket = this.buckets[this.index(key)];
		for (const pair of bucket) {
			if (pair[0] === key) return pair[1];
		}
		return -1;
	}

	remove(key: number): void {
		const bucket = this.buckets[this.index(key)];
		const idx = bucket.findIndex((pair) => pair[0] === key);
		if (idx !== -1) bucket.splice(idx, 1);
	}
}

export const designHashmapHandler = (fn: any) => {
	try {
		const ops = ["put", "put", "get", "get", "put", "get", "remove", "get"];
		const args: any[][] = [[1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]];

		const obj = fn();
		const ref = new ReferenceHashMap();

		for (let i = 0; i < ops.length; i++) {
			const op = ops[i];
			const arg = args[i];
			const result = (obj as any)[op](...arg);
			const expected = (ref as any)[op](...arg);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from designHashmapHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignHashmapJS = `function MyHashMap() {
  // Write your code here.
  // Return an object exposing "put", "get", and "remove" methods.
  return {
    put: function(key, value) {

    },
    get: function(key) {

    },
    remove: function(key) {

    }
  };
};`;

export const designHashmap: Problem = {
	id: "design-hashmap",
	title: "272. Design HashMap",
	problemStatement: `<p class='mt-3'>
    Design a HashMap without using any of the built-in hash table libraries (e.g. do not use JS's
    <code>Map</code> or plain object property lookups internally).
  </p>
  <p class='mt-3'>
    Implement three methods:
  </p>
  <p class='mt-3'>
    <code>put(key, value)</code> &mdash; inserts a <code>(key, value)</code> pair. If the key
    already exists, updates its value.
  </p>
  <p class='mt-3'>
    <code>get(key)</code> &mdash; returns the value for <code>key</code>, or <code>-1</code> if
    the key is not present.
  </p>
  <p class='mt-3'>
    <code>remove(key)</code> &mdash; removes <code>key</code> and its value if it exists.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `put(1,1); put(2,2); get(1); get(3); put(2,1); get(2); remove(2); get(2)`,
			outputText: `null, null, 1, -1, null, 1, null, -1`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= key, value <= 10^6</code></li>
  <li class='mt-2'>At most <code>10^4</code> calls will be made to <code>put</code>, <code>get</code>, and <code>remove</code>.</li>`,
	starterCode: starterCodeDesignHashmapJS,
	handlerFunction: designHashmapHandler,
	starterFunctionName: "function MyHashMap(",
	order: 272,
};
