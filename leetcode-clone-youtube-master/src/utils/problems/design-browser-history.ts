import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a list of visited URLs plus a current index. Visiting
// a new page truncates any "forward" history.
class ReferenceBrowserHistory {
	private history: string[];
	private index: number;

	constructor(homepage: string) {
		this.history = [homepage];
		this.index = 0;
	}

	visit(url: string): void {
		this.history = this.history.slice(0, this.index + 1);
		this.history.push(url);
		this.index++;
	}

	back(steps: number): string {
		this.index = Math.max(0, this.index - steps);
		return this.history[this.index];
	}

	forward(steps: number): string {
		this.index = Math.min(this.history.length - 1, this.index + steps);
		return this.history[this.index];
	}
}

export const designBrowserHistoryHandler = (fn: any) => {
	try {
		const runTest = (homepage: string, ops: string[], args: any[][]) => {
			const obj = fn(homepage);
			const ref = new ReferenceBrowserHistory(homepage);
			for (let i = 0; i < ops.length; i++) {
				const op = ops[i];
				const arg = args[i];
				const result = (obj as any)[op](...arg);
				const expected = (ref as any)[op](...arg);
				if (op === "back" || op === "forward") {
					assert.equal(result, expected);
				}
			}
		};

		runTest(
			"leetcode.com",
			["visit", "visit", "visit", "back", "back", "forward", "visit", "forward", "back", "back"],
			[["google.com"], ["facebook.com"], ["youtube.com"], [1], [1], [1], ["linkedin.com"], [2], [2], [7]]
		);

		runTest("a.com", ["visit", "back", "visit", "visit", "back", "forward"], [["b.com"], [10], ["c.com"], ["d.com"], [1], [1]]);

		return true;
	} catch (error: any) {
		console.log("Error from designBrowserHistoryHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignBrowserHistoryJS = `function BrowserHistory(homepage) {
  // Write your code here.
  // Return an object exposing "visit", "back", and "forward" methods.
  return {
    visit: function(url) {

    },
    back: function(steps) {

    },
    forward: function(steps) {

    }
  };
};`;

export const designBrowserHistory: Problem = {
	id: "design-browser-history",
	title: "279. Design Browser History",
	problemStatement: `<p class='mt-3'>
    Design a browser's history system, starting on <code>homepage</code>.
  </p>
  <p class='mt-3'>
    <code>visit(url)</code> &mdash; visits <code>url</code> from the current page. This clears all
    forward history, and the current page becomes <code>url</code>.
  </p>
  <p class='mt-3'>
    <code>back(steps)</code> &mdash; moves <code>steps</code> pages back in history, clamped to
    the oldest page visited, and returns the URL you land on.
  </p>
  <p class='mt-3'>
    <code>forward(steps)</code> &mdash; moves <code>steps</code> pages forward in history, clamped
    to the most recent page visited, and returns the URL you land on.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `BrowserHistory("leetcode.com"); visit("google.com"); visit("facebook.com"); visit("youtube.com"); back(1); back(1); forward(1); visit("linkedin.com"); forward(2); back(2); back(7)`,
			outputText: `null, null, null, null, "facebook.com", "google.com", "facebook.com", null, "linkedin.com", "google.com", "leetcode.com"`,
			explanation: "Visiting linkedin.com after going back clears the youtube.com forward entry.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= homepage.length, url.length <= 20</code></li>
  <li class='mt-2'><code>1 <= steps <= 100</code></li>
  <li class='mt-2'>At most <code>5000</code> calls total will be made.</li>`,
	starterCode: starterCodeDesignBrowserHistoryJS,
	handlerFunction: designBrowserHistoryHandler,
	starterFunctionName: "function BrowserHistory(",
	order: 279,
};
