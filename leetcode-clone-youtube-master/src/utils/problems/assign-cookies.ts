import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(g: number[], s: number[]): number {
	const greed = [...g].sort((a, b) => a - b);
	const sizes = [...s].sort((a, b) => a - b);
	let i = 0;
	let j = 0;
	let content = 0;
	while (i < greed.length && j < sizes.length) {
		if (sizes[j] >= greed[i]) {
			content++;
			i++;
			j++;
		} else {
			j++;
		}
	}
	return content;
}

export const assignCookiesHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[1, 2, 3], [1, 1]],
			[[1, 2], [1, 2, 3]],
			[[10, 9, 8, 7], [5, 6, 7, 8]],
			[[], [1, 2, 3]],
			[[1, 1, 1], []],
		];
		for (const [g, s] of tests) {
			const expected = referenceSolution(g, s);
			const result = fn(g, s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from assignCookiesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeAssignCookiesJS = `function findContentChildren(g, s) {
  // Write your code here
};`;

export const assignCookies: Problem = {
	id: "assign-cookies",
	title: "235. Assign Cookies",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>g</code> where <code>g[i]</code> is the minimum cookie size that will content
    the <code>i</code>-th child, and an array <code>s</code> where <code>s[j]</code> is the size of the
    <code>j</code>-th cookie.
  </p>
  <p class='mt-3'>
    Each cookie can be given to at most one child, and a child is content only if the cookie they receive has
    size greater than or equal to their greed factor. Give out cookies to maximize the number of content
    children.
  </p>
  <p class='mt-3'>
    Return the maximum number of children you can make content.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "g = [1,2,3], s = [1,1]",
			outputText: "1",
			explanation: "Only one cookie (size 1) is big enough for the child with greed factor 1.",
		},
		{
			id: 1,
			inputText: "g = [1,2], s = [1,2,3]",
			outputText: "2",
			explanation: "Both children can be content, e.g. give cookie size 1 to child 1 and size 2 to child 2.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= g.length <= 3 * 10^4</code></li>
<li class='mt-2'><code>0 <= s.length <= 3 * 10^4</code></li>
<li class='mt-2'><code>1 <= g[i], s[j] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeAssignCookiesJS,
	handlerFunction: assignCookiesHandler,
	starterFunctionName: "function findContentChildren(",
	order: 235,
};
