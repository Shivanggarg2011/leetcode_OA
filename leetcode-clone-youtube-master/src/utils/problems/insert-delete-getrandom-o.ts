import assert from "assert";
import { Problem } from "../types/problem";

export const insertDeleteGetrandomOHandler = (fn: any) => {
	try {
		// insert/remove have deterministic expected results derived from a
		// model Set we maintain ourselves (the ground truth for membership).
		// getRandom is inherently non-deterministic, so instead of comparing
		// it to one particular "expected" value, we assert that whatever it
		// returns is actually a member of the current true set - which is
		// exactly the contract the data structure must satisfy.
		const model = new Set<number>();
		const obj = fn();

		const checkInsert = (val: number) => {
			const expected = !model.has(val);
			const result = obj.insert(val);
			assert.equal(result, expected);
			model.add(val);
		};

		const checkRemove = (val: number) => {
			const expected = model.has(val);
			const result = obj.remove(val);
			assert.equal(result, expected);
			model.delete(val);
		};

		const checkGetRandom = () => {
			const result = obj.getRandom();
			assert.equal(model.has(result), true);
		};

		checkInsert(1);
		checkRemove(2);
		checkInsert(2);
		checkGetRandom();
		checkRemove(1);
		checkInsert(2);
		checkGetRandom();
		checkGetRandom();
		checkInsert(5);
		checkInsert(6);
		checkRemove(5);
		checkGetRandom();
		checkGetRandom();
		checkGetRandom();

		return true;
	} catch (error: any) {
		console.log("Error from insertDeleteGetrandomOHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeInsertDeleteGetrandomOJS = `function RandomizedSet() {
  // Write your code here.
  // Return an object exposing "insert", "remove", and "getRandom" methods.
  return {
    insert: function(val) {
      // return true if val was not already present (and add it)
      // return false if val was already present
    },
    remove: function(val) {
      // return true if val was present (and remove it)
      // return false if val was not present
    },
    getRandom: function() {
      // return a random element currently in the structure,
      // each with equal probability
    }
  };
};`;

export const insertDeleteGetrandomO: Problem = {
	id: "insert-delete-getrandom-o",
	title: "274. Insert Delete GetRandom O(1)",
	problemStatement: `<p class='mt-3'>
    Design a data structure that supports the following operations, each in <strong>average
    O(1)</strong> time:
  </p>
  <p class='mt-3'>
    <code>insert(val)</code> &mdash; inserts <code>val</code> if it is not already present, and
    returns <code>true</code> if the insert happened, or <code>false</code> if <code>val</code>
    was already present.
  </p>
  <p class='mt-3'>
    <code>remove(val)</code> &mdash; removes <code>val</code> if it is present, and returns
    <code>true</code> if the removal happened, or <code>false</code> if <code>val</code> was not
    present.
  </p>
  <p class='mt-3'>
    <code>getRandom()</code> &mdash; returns a random element from the elements currently stored,
    with each element being equally likely to be chosen.
  </p>
  <p class='mt-3'>
    Hint: pair a resizable array (for O(1) random access) with a hash map from value to its index
    in the array, so removal can swap-and-pop instead of shifting elements.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `insert(1); remove(2); insert(2); getRandom(); remove(1); insert(2); getRandom()`,
			outputText: `true, false, true, 2, true, false, 2`,
			explanation: "getRandom() should only ever return a value currently stored in the structure.",
		},
	],
	constraints: `<li class='mt-2'><code>-2^31 <= val <= 2^31 - 1</code></li>
  <li class='mt-2'>At most <code>2 * 10^5</code> calls total will be made to <code>insert</code>, <code>remove</code>, and <code>getRandom</code>.</li>
  <li class='mt-2'>There is guaranteed to be at least one element when <code>getRandom</code> is called.</li>`,
	starterCode: starterCodeInsertDeleteGetrandomOJS,
	handlerFunction: insertDeleteGetrandomOHandler,
	starterFunctionName: "function RandomizedSet(",
	order: 274,
};
