"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateParentheses = exports.generateParenthesesHandler = void 0;
const assert_1 = __importDefault(require("assert"));
// reference solution: backtracking, only add '(' while open < n and ')' while close < open
function referenceGenerateParenthesis(n) {
    const result = [];
    function backtrack(current, open, close) {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        if (open < n)
            backtrack(current + "(", open + 1, close);
        if (close < open)
            backtrack(current + ")", open, close + 1);
    }
    backtrack("", 0, 0);
    return result;
}
function normalize(list) {
    return [...list].sort();
}
const generateParenthesesHandler = (fn) => {
    try {
        const tests = [1, 2, 3, 4];
        for (const n of tests) {
            const expected = normalize(referenceGenerateParenthesis(n));
            const result = normalize(fn(n));
            assert_1.default.deepStrictEqual(result, expected);
        }
        return true;
    }
    catch (error) {
        console.log("Error from generateParenthesesHandler: ", error);
        throw new Error(error);
    }
};
exports.generateParenthesesHandler = generateParenthesesHandler;
const starterCodeGenerateParenthesesJS = `function generateParenthesis(n) {
  // Write your code here
};`;
exports.generateParentheses = {
    id: "generate-parentheses",
    title: "65. Generate Parentheses",
    problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code> representing the number of pairs of parentheses, generate
    <strong>all combinations</strong> of well-formed (balanced) parentheses that can be made with
    exactly <code>n</code> pairs.
  </p>
  <p class='mt-3'>
    You may return the combinations in <strong>any order</strong>.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: "n = 3",
            outputText: `["((()))","(()())","(())()","()(())","()()()"]`,
        },
        {
            id: 1,
            inputText: "n = 1",
            outputText: `["()"]`,
        },
        {
            id: 2,
            inputText: "n = 2",
            outputText: `["(())","()()"]`,
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 8</code></li>`,
    starterCode: starterCodeGenerateParenthesesJS,
    handlerFunction: exports.generateParenthesesHandler,
    starterFunctionName: "function generateParenthesis(",
    order: 65,
};
