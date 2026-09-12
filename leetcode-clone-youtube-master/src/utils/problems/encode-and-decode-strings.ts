import assert from "assert";
import { Problem } from "../types/problem";

// This is a "design" problem: the user must implement both an encode and a
// decode function that are inverses of each other. Since the exact wire
// format is left up to the implementer, there is no single fixed expected
// output to compare against. Instead we validate correctness the way this
// kind of problem is meant to be graded: run encode then decode and check
// we get the original list of strings back (a round-trip check), across
// several tricky inputs (empty strings, delimiter-like characters, digits).
export const encodeAndDecodeStringsHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["lint", "code", "love", "you"],
			["we", "say", ":", "yes"],
			[""],
			[],
			["4#3", "2:1", "#####", ""],
			["a", "", "bb", "", "ccc"],
		];
		for (const test of tests) {
			const impl = fn();
			assert.ok(impl && typeof impl.encode === "function" && typeof impl.decode === "function");
			const encoded = impl.encode([...test]);
			assert.equal(typeof encoded, "string");
			const decoded = impl.decode(encoded);
			assert.deepStrictEqual(decoded, test);
		}
		return true;
	} catch (error: any) {
		console.log("Error from encodeAndDecodeStringsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeEncodeAndDecodeStringsJS = `function encodeDecode() {
  // Write your code here.
  // Return an object with two functions:
  //   encode(strs) - takes an array of strings and joins it into one string
  //   decode(s)    - takes that string and returns the original array back
  return {
    encode: function(strs) {

    },
    decode: function(s) {

    },
  };
};`;

export const encodeAndDecodeStrings: Problem = {
	id: "encode-and-decode-strings",
	title: "8. Encode and Decode Strings",
	problemStatement: `<p class='mt-3'>
    Design an algorithm to <strong>encode</strong> a list of strings into a single string, and then
    <strong>decode</strong> that string back into the original list of strings.
  </p>
  <p class='mt-3'>
    Implement and return an object with two functions, <code>encode(strs)</code> and
    <code>decode(s)</code>, so that for any list of strings, calling
    <code>decode(encode(strs))</code> returns a list equal to the original <code>strs</code>.
  </p>
  <p class='mt-3'>
    The strings may contain <strong>any</strong> characters, including digits, punctuation, and the
    empty string, so your scheme cannot simply join strings with a fixed separator character
    without also accounting for that character (or a similar sequence) appearing inside a string.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `strs = ["lint","code","love","you"]`,
			outputText: `["lint","code","love","you"]`,
			explanation: "decode(encode(strs)) must reproduce the original array exactly.",
		},
		{
			id: 1,
			inputText: `strs = ["we","say",":","yes"]`,
			outputText: `["we","say",":","yes"]`,
			explanation: "The colon character inside a string must not break decoding.",
		},
		{
			id: 2,
			inputText: `strs = [""]`,
			outputText: `[""]`,
			explanation: "A single empty string must still round-trip correctly.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= strs.length <= 200</code></li>
  <li class='mt-2'><code>0 <= strs[i].length <= 200</code></li>
  <li class='mt-2'><code>strs[i]</code> may contain any printable ASCII character.</li>`,
	starterCode: starterCodeEncodeAndDecodeStringsJS,
	handlerFunction: encodeAndDecodeStringsHandler,
	starterFunctionName: "function encodeDecode(",
	order: 8,
};
