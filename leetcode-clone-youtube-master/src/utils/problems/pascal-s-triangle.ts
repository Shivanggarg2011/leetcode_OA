import assert from "assert";
import { Problem } from "../types/problem";

export const pascalSTriangleHandler = (fn: any) => {
	try {
		function referenceSolution(numRows: number): number[][] {
			const triangle: number[][] = [];
			for (let i = 0; i < numRows; i++) {
				const row = new Array(i + 1).fill(1);
				for (let j = 1; j < i; j++) {
					row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
				}
				triangle.push(row);
			}
			return triangle;
		}

		const tests = [1, 2, 5, 6, 3];

		for (const numRows of tests) {
			const expected = referenceSolution(numRows);
			const result = fn(numRows);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from pascalSTriangleHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePascalSTriangleJS = `function generatePascalsTriangle(numRows) {
  // Write your code here
};`;

export const pascalSTriangle: Problem = {
	id: "pascal-s-triangle",
	title: "29. Pascal's Triangle",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>numRows</code>, return the first <code>numRows</code> rows of
    <strong>Pascal's triangle</strong>.
  </p>
  <p class='mt-3'>
    In Pascal's triangle, each number is the sum of the two numbers directly above it (and the first and
    last number of every row is <code>1</code>).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "numRows = 5",
			outputText: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
		},
		{
			id: 1,
			inputText: "numRows = 1",
			outputText: "[[1]]",
		},
		{
			id: 2,
			inputText: "numRows = 3",
			outputText: "[[1],[1,1],[1,2,1]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= numRows <= 30</code></li>`,
	starterCode: starterCodePascalSTriangleJS,
	handlerFunction: pascalSTriangleHandler,
	starterFunctionName: "function generatePascalsTriangle(",
	order: 29,
};
