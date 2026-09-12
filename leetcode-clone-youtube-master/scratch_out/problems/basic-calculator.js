"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicCalculator = exports.basicCalculatorHandler = void 0;
const assert_1 = __importDefault(require("assert"));
// reference solution: single pass with a running result, a sign, and a stack for parenthesis scopes
function referenceCalculate(s) {
    const stack = [];
    let result = 0;
    let number = 0;
    let sign = 1;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch >= "0" && ch <= "9") {
            number = number * 10 + Number(ch);
        }
        else if (ch === "+") {
            result += sign * number;
            number = 0;
            sign = 1;
        }
        else if (ch === "-") {
            result += sign * number;
            number = 0;
            sign = -1;
        }
        else if (ch === "(") {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        }
        else if (ch === ")") {
            result += sign * number;
            number = 0;
            const prevSign = stack.pop();
            const prevResult = stack.pop();
            result = prevResult + prevSign * result;
        }
        // spaces are ignored
    }
    result += sign * number;
    return result;
}
const basicCalculatorHandler = (fn) => {
    try {
        const tests = [
            "1 + 1",
            " 2-1 + 2 ",
            "(1+(4+5+2)-3)+(6+8)",
            "2-(5-6)",
            "-(2+3)",
            "1-(     -2)",
        ];
        for (const s of tests) {
            const expected = referenceCalculate(s);
            const result = fn(s);
            assert_1.default.equal(result, expected);
        }
        return true;
    }
    catch (error) {
        console.log("Error from basicCalculatorHandler: ", error);
        throw new Error(error);
    }
};
exports.basicCalculatorHandler = basicCalculatorHandler;
const starterCodeBasicCalculatorJS = `function calculate(s) {
  // Write your code here
};`;
exports.basicCalculator = {
    id: "basic-calculator",
    title: "75. Basic Calculator",
    problemStatement: `<p class='mt-3'>
    Given a string <code>s</code> representing a valid arithmetic expression, implement a basic
    calculator to evaluate and return its value.
  </p>
  <p class='mt-3'>
    The expression may contain non-negative integers, the operators <code>+</code> and
    <code>-</code>, parentheses <code>(</code> and <code>)</code>, and spaces. You do
    <strong>not</strong> need to support <code>*</code> or <code>/</code>, and you may not use
    <code>eval()</code>.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: `s = "1 + 1"`,
            outputText: "2",
        },
        {
            id: 1,
            inputText: `s = " 2-1 + 2 "`,
            outputText: "3",
        },
        {
            id: 2,
            inputText: `s = "(1+(4+5+2)-3)+(6+8)"`,
            outputText: "23",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= s.length <= 3 * 10^5</code></li>
<li class='mt-2'><code>s</code> consists of digits, <code>+</code>, <code>-</code>, <code>(</code>, <code>)</code>, and spaces</li>
<li class='mt-2'><code>s</code> is a valid expression</li>`,
    starterCode: starterCodeBasicCalculatorJS,
    handlerFunction: exports.basicCalculatorHandler,
    starterFunctionName: "function calculate(",
    order: 75,
};
