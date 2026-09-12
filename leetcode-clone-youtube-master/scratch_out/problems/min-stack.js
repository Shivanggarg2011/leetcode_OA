"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minStack = exports.minStackHandler = void 0;
const assert_1 = __importDefault(require("assert"));
// reference solution: a stack that also tracks the running minimum alongside each value
class ReferenceMinStack {
    constructor() {
        this.stack = [];
    }
    push(val) {
        const min = this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
        this.stack.push({ val, min });
    }
    pop() {
        this.stack.pop();
    }
    top() {
        return this.stack[this.stack.length - 1].val;
    }
    getMin() {
        return this.stack[this.stack.length - 1].min;
    }
}
function runOps(instance, ops, args) {
    const output = [];
    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const result = instance[op](...args[i]);
        output.push(result === undefined ? null : result);
    }
    return output;
}
const minStackHandler = (fn) => {
    try {
        const scenarios = [
            {
                ops: ["push", "push", "push", "getMin", "pop", "top", "getMin"],
                args: [[-2], [0], [-3], [], [], [], []],
            },
            {
                ops: ["push", "push", "getMin", "push", "getMin", "pop", "getMin"],
                args: [[5], [1], [], [-2], [], [], []],
            },
            {
                ops: ["push", "getMin", "top"],
                args: [[7], [], []],
            },
            {
                ops: ["push", "push", "push", "push", "getMin", "pop", "pop", "getMin"],
                args: [[3], [1], [1], [-1], [], [], [], []],
            },
        ];
        for (const { ops, args } of scenarios) {
            const refInstance = new ReferenceMinStack();
            const userInstance = new fn();
            const expected = runOps(refInstance, ops, args);
            const result = runOps(userInstance, ops, args);
            assert_1.default.deepStrictEqual(result, expected);
        }
        return true;
    }
    catch (error) {
        console.log("Error from minStackHandler: ", error);
        throw new Error(error);
    }
};
exports.minStackHandler = minStackHandler;
const starterCodeMinStackJS = `class MinStack {
  constructor() {
    // Write your code here
  }

  push(val) {
    // Write your code here
  }

  pop() {
    // Write your code here
  }

  top() {
    // Write your code here
  }

  getMin() {
    // Write your code here
  }
}`;
exports.minStack = {
    id: "min-stack",
    title: "63. Min Stack",
    problemStatement: `<p class='mt-3'>
    Design a stack that supports <code>push</code>, <code>pop</code>, <code>top</code>, and
    retrieving the minimum element in <strong>constant time</strong>.
  </p>
  <p class='mt-3'>
    Implement the <code>MinStack</code> class:
  </p>
  <ul class='mt-2'>
    <li class='mt-2'><code>push(val)</code> pushes the element <code>val</code> onto the stack.</li>
    <li class='mt-2'><code>pop()</code> removes the element on top of the stack.</li>
    <li class='mt-2'><code>top()</code> gets the top element of the stack.</li>
    <li class='mt-2'><code>getMin()</code> retrieves the minimum element in the stack.</li>
  </ul>
  <p class='mt-3'>
    You must implement a solution where each function runs in <code>O(1)</code> time.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: `["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]`,
            outputText: `[null,null,null,null,-3,null,0,-2]`,
            explanation: "After pushing -2, 0, -3 the minimum is -3. Popping removes -3, leaving top as 0 and minimum as -2.",
        },
        {
            id: 1,
            inputText: `["MinStack","push","getMin","top"]\n[[],[7],[],[]]`,
            outputText: `[null,null,7,7]`,
        },
    ],
    constraints: `<li class='mt-2'><code>-2^31 <= val <= 2^31 - 1</code></li>
<li class='mt-2'><code>pop</code>, <code>top</code>, and <code>getMin</code> are only called on a non-empty stack</li>
<li class='mt-2'>At most <code>3 * 10^4</code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code></li>`,
    starterCode: starterCodeMinStackJS,
    handlerFunction: exports.minStackHandler,
    starterFunctionName: "class MinStack {",
    order: 63,
};
