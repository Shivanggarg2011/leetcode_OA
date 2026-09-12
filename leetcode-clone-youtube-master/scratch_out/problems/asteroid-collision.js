"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asteroidCollision = exports.asteroidCollisionHandler = void 0;
const assert_1 = __importDefault(require("assert"));
// reference solution: stack simulation; positive = moving right, negative = moving left
function referenceAsteroidCollision(asteroids) {
    const stack = [];
    for (const asteroid of asteroids) {
        let current = asteroid;
        while (current !== null && stack.length > 0 && current < 0 && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];
            if (top < -current) {
                stack.pop();
                // keep checking current against the next one down
            }
            else if (top === -current) {
                stack.pop();
                current = null;
            }
            else {
                current = null;
            }
        }
        if (current !== null)
            stack.push(current);
    }
    return stack;
}
const asteroidCollisionHandler = (fn) => {
    try {
        const tests = [
            [5, 10, -5],
            [8, -8],
            [10, 2, -5],
            [-2, -1, 1, 2],
            [1, -2, -2, -2],
            [-2, 2, 1, -2],
        ];
        for (const asteroids of tests) {
            const expected = referenceAsteroidCollision([...asteroids]);
            const result = fn([...asteroids]);
            assert_1.default.deepStrictEqual(result, expected);
        }
        return true;
    }
    catch (error) {
        console.log("Error from asteroidCollisionHandler: ", error);
        throw new Error(error);
    }
};
exports.asteroidCollisionHandler = asteroidCollisionHandler;
const starterCodeAsteroidCollisionJS = `function asteroidCollision(asteroids) {
  // Write your code here
};`;
exports.asteroidCollision = {
    id: "asteroid-collision",
    title: "71. Asteroid Collision",
    problemStatement: `<p class='mt-3'>
    You are given an array of integers <code>asteroids</code> representing asteroids lined up in a
    row.
  </p>
  <p class='mt-3'>
    For each asteroid, the absolute value represents its size, and the sign represents its direction
    (<strong>positive</strong> means moving right, <strong>negative</strong> means moving left). Every
    asteroid moves at the same speed.
  </p>
  <p class='mt-3'>
    When two asteroids meet, the smaller one explodes. If both are the same size, both explode.
    Two asteroids moving in the same direction will never meet.
  </p>
  <p class='mt-3'>
    Return the state of the asteroids after all collisions have finished.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: "asteroids = [5,10,-5]",
            outputText: "[5,10]",
            explanation: "The 10 and -5 collide, resulting in 10. The 5 and 10 never collide since they move in the same direction.",
        },
        {
            id: 1,
            inputText: "asteroids = [8,-8]",
            outputText: "[]",
            explanation: "The 8 and -8 collide and both explode.",
        },
        {
            id: 2,
            inputText: "asteroids = [10,2,-5]",
            outputText: "[10]",
            explanation: "The 2 and -5 collide, leaving -5. Then -5 and 10 collide, leaving 10.",
        },
    ],
    constraints: `<li class='mt-2'><code>2 <= asteroids.length <= 10^4</code></li>
<li class='mt-2'><code>-1000 <= asteroids[i] <= 1000</code></li>
<li class='mt-2'><code>asteroids[i] != 0</code></li>`,
    starterCode: starterCodeAsteroidCollisionJS,
    handlerFunction: exports.asteroidCollisionHandler,
    starterFunctionName: "function asteroidCollision(",
    order: 71,
};
