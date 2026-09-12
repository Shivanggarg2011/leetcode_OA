import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a bucket array with chaining, implemented from
// scratch instead of using JS's built-in Set.
class ReferenceHashSet {
	private buckets: Array<number[]>;
	private static readonly SIZE = 1009;

	constructor() {
		this.buckets = Array.from({ length: ReferenceHashSet.SIZE }, () => []);
	}

	private index(key: number): number {
		return key % ReferenceHashSet.SIZE;
	}

	add(key: number): void {
		const bucket = this.buckets[this.index(key)];
		if (!bucket.includes(key)) bucket.push(key);
	}

	remove(key: number): void {
		const bucket = this.buckets[this.index(key)];
		const idx = bucket.indexOf(key);
		if (idx !== -1) bucket.splice(idx, 1);
	}

	contains(key: number): boolean {
		return this.buckets[this.index(key)].includes(key);
	}
}

export const designHashsetHandler = (fn: any) => {
	try {
		const ops = ["add", "add", "contains", "contains", "add", "contains", "remove", "contains"];
		const args: any[][] = [[1], [2], [1], [3], [2], [2], [2], [2]];

		const obj = fn();
		const ref = new ReferenceHashSet();

		for (let i = 0; i < ops.length; i++) {
			const op = ops[i];
			const arg = args[i];
			const result = (obj as any)[op](...arg);
			const expected = (ref as any)[op](...arg);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from designHashsetHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignHashsetJS = `function MyHashSet() {
  // Write your code here.
  // Return an object exposing "add", "remove", and "contains" methods.
  return {
    add: function(key) {

    },
    remove: function(key) {

    },
    contains: function(key) {

    }
  };
};`;

export const designHashset: Problem = {
	id: "design-hashset",
	title: "273. Design HashSet",
	problemStatement: `<p class='mt-3'>
    Design a HashSet without using any of the built-in hash set libraries (e.g. do not use JS's
    <code>Set</code> internally).
  </p>
  <p class='mt-3'>
    Implement three methods:
  </p>
  <p class='mt-3'>
    <code>add(key)</code> &mdash; inserts <code>key</code> into the set if it isn't already there.
  </p>
  <p class='mt-3'>
    <code>remove(key)</code> &mdash; removes <code>key</code> from the set if it exists.
  </p>
  <p class='mt-3'>
    <code>contains(key)</code> &mdash; returns <code>true</code> if <code>key</code> exists in the
    set, otherwise <code>false</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `add(1); add(2); contains(1); contains(3); add(2); contains(2); remove(2); contains(2)`,
			outputText: `null, null, true, false, null, true, null, false`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= key <= 10^6</code></li>
  <li class='mt-2'>At most <code>10^4</code> calls will be made to <code>add</code>, <code>remove</code>, and <code>contains</code>.</li>`,
	starterCode: starterCodeDesignHashsetJS,
	handlerFunction: designHashsetHandler,
	starterFunctionName: "function MyHashSet(",
	order: 273,
};
