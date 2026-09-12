import assert from "assert";
import { Problem } from "../types/problem";

function referenceFullJustify(words: string[], maxWidth: number): string[] {
	const lines: string[] = [];
	let currentLine: string[] = [];
	let currentLength = 0;

	for (const word of words) {
		if (currentLength + currentLine.length + word.length > maxWidth) {
			const spacesNeeded = maxWidth - currentLength;
			const gaps = currentLine.length - 1;

			if (gaps === 0) {
				lines.push(currentLine[0] + " ".repeat(spacesNeeded));
			} else {
				const baseSpaces = Math.floor(spacesNeeded / gaps);
				let extra = spacesNeeded % gaps;
				let line = "";
				for (let i = 0; i < currentLine.length; i++) {
					line += currentLine[i];
					if (i < gaps) {
						let spaces = baseSpaces;
						if (extra > 0) {
							spaces++;
							extra--;
						}
						line += " ".repeat(spaces);
					}
				}
				lines.push(line);
			}

			currentLine = [];
			currentLength = 0;
		}

		currentLine.push(word);
		currentLength += word.length;
	}

	// Last line is left-justified with single spaces and padded on the right.
	const lastLine = currentLine.join(" ");
	lines.push(lastLine + " ".repeat(maxWidth - lastLine.length));

	return lines;
}

export const textJustificationHandler = (fn: any) => {
	try {
		const tests: { words: string[]; maxWidth: number }[] = [
			{ words: ["This", "is", "an", "example", "of", "text", "justification."], maxWidth: 16 },
			{ words: ["What", "must", "be", "acknowledgment", "shall", "be"], maxWidth: 16 },
			{
				words: [
					"Science",
					"is",
					"what",
					"we",
					"understand",
					"well",
					"enough",
					"to",
					"explain",
					"to",
					"a",
					"computer.",
					"Art",
					"is",
					"everything",
					"else",
					"we",
					"do",
				],
				maxWidth: 20,
			},
			{ words: ["a"], maxWidth: 1 },
			{ words: ["ab", "cd"], maxWidth: 5 },
		];

		for (const test of tests) {
			const expected = referenceFullJustify(test.words, test.maxWidth);
			const result = fn(test.words, test.maxWidth);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from textJustificationHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTextJustificationJS = `// Do not edit function name
function fullJustify(words, maxWidth) {
  // Write your code here
};`;

export const textJustification: Problem = {
	id: "text-justification",
	title: "303. Text Justification",
	problemStatement: `<p class='mt-3'>
    Given an array of strings <code>words</code> and a target line width <code>maxWidth</code>, format the text
    so it is fully (left and right) justified.
  </p>
  <p class='mt-3'>
    Greedily pack as many words as possible onto each line: a word can be added to the current line as long as
    the line (with a single space between each word so far) does not exceed <code>maxWidth</code> characters.
  </p>
  <p class='mt-3'>
    For every line except the last, distribute the extra spaces between words as evenly as possible so the line
    is exactly <code>maxWidth</code> characters wide. If the spaces cannot be split evenly, the leftmost gaps get
    one extra space each. If a line contains only one word, pad it with trailing spaces to reach
    <code>maxWidth</code>.
  </p>
  <p class='mt-3'>
    The <strong>last line</strong> should be left-justified with a single space between words, then padded with
    trailing spaces so it is exactly <code>maxWidth</code> characters wide.
  </p>
  <p class='mt-3'>Return the resulting lines as an array of strings.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `words = ["This","is","an","example","of","text","justification."], maxWidth = 16`,
			outputText: `["This    is    an","example  of text","justification.  "]`,
		},
		{
			id: 1,
			inputText: `words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16`,
			outputText: `["What   must   be","acknowledgment  ","shall be        "]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= words.length <= 300</code></li>
  <li class='mt-2'><code>1 <= words[i].length <= 20</code></li>
  <li class='mt-2'><code>words[i]</code> consists of non-space characters only.</li>
  <li class='mt-2'><code>1 <= maxWidth <= 100</code></li>
  <li class='mt-2'><code>words[i].length <= maxWidth</code></li>`,
	starterCode: starterCodeTextJustificationJS,
	handlerFunction: textJustificationHandler,
	starterFunctionName: "function fullJustify(",
	order: 303,
};
