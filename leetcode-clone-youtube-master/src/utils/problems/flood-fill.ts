import assert from "assert";
import { Problem } from "../types/problem";

function cloneMatrix(m: number[][]): number[][] {
	return m.map((row) => [...row]);
}

// Reference solution: standard 4-directional flood fill via DFS.
function referenceFloodFill(
	image: number[][],
	sr: number,
	sc: number,
	color: number
): number[][] {
	const startColor = image[sr][sc];
	if (startColor === color) return image;
	const rows = image.length;
	const cols = image[0].length;

	function dfs(r: number, c: number) {
		if (r < 0 || r >= rows || c < 0 || c >= cols) return;
		if (image[r][c] !== startColor) return;
		image[r][c] = color;
		dfs(r + 1, c);
		dfs(r - 1, c);
		dfs(r, c + 1);
		dfs(r, c - 1);
	}

	dfs(sr, sc);
	return image;
}

export const floodFillHandler = (fn: any) => {
	try {
		const tests: [number[][], number, number, number][] = [
			[[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2],
			[[[0, 0, 0], [0, 0, 0]], 0, 0, 0],
			[[[1]], 0, 0, 3],
			[[[0, 0, 0], [0, 1, 1], [0, 1, 1]], 1, 1, 2],
			[[[1, 2, 2], [2, 2, 0], [2, 0, 1]], 0, 0, 3],
		];
		for (const [image, sr, sc, color] of tests) {
			const expected = referenceFloodFill(cloneMatrix(image), sr, sc, color);
			const result = fn(cloneMatrix(image), sr, sc, color);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from floodFillHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFloodFillJS = `function floodFill(image, sr, sc, color) {
  // Write your code here
};`;

export const floodFill: Problem = {
	id: "flood-fill",
	title: "181. Flood Fill",
	problemStatement: `<p class='mt-3'>
    You are given an image represented as a 2D integer grid <code>image</code>, a starting pixel
    <code>(sr, sc)</code>, and a new color <code>color</code>.
  </p>
  <p class='mt-3'>
    To perform a flood fill, look at the color of the starting pixel, then replace it and every pixel
    reachable from it via 4-directional (up/down/left/right) moves through pixels of that <em>same
    original color</em> with <code>color</code>.
  </p>
  <p class='mt-3'>Return the modified image after performing the flood fill.</p>`,
	examples: [
		{
			id: 0,
			inputText: `image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2`,
			outputText: `[[2,2,2],[2,2,0],[2,0,1]]`,
			explanation: "The pixel at (1,1) and every 1-colored pixel connected to it become 2.",
		},
		{
			id: 1,
			inputText: `image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0`,
			outputText: `[[0,0,0],[0,0,0]]`,
			explanation: "The new color is the same as the starting color, so nothing changes.",
		},
		{
			id: 2,
			inputText: `image = [[1]], sr = 0, sc = 0, color = 3`,
			outputText: `[[3]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= image.length, image[0].length <= 50</code></li>
  <li class='mt-2'><code>0 <= image[i][j], color < 2^16</code></li>
  <li class='mt-2'><code>0 <= sr < image.length</code></li>
  <li class='mt-2'><code>0 <= sc < image[0].length</code></li>`,
	starterCode: starterCodeFloodFillJS,
	handlerFunction: floodFillHandler,
	starterFunctionName: "function floodFill(",
	order: 181,
};
