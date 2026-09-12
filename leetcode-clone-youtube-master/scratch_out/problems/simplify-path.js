"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyPath = exports.simplifyPathHandler = void 0;
const assert_1 = __importDefault(require("assert"));
// reference solution: split on '/', use a stack, handle '.', '..', and empty segments
function referenceSimplifyPath(path) {
    const parts = path.split("/");
    const stack = [];
    for (const part of parts) {
        if (part === "" || part === ".")
            continue;
        if (part === "..") {
            if (stack.length > 0)
                stack.pop();
        }
        else {
            stack.push(part);
        }
    }
    return "/" + stack.join("/");
}
const simplifyPathHandler = (fn) => {
    try {
        const tests = [
            "/home/",
            "/home//foo/",
            "/home/user/Documents/../Pictures",
            "/../",
            "/.../a/../b/c/../d/./",
            "/a/./b/../../c/",
        ];
        for (const path of tests) {
            const expected = referenceSimplifyPath(path);
            const result = fn(path);
            assert_1.default.equal(result, expected);
        }
        return true;
    }
    catch (error) {
        console.log("Error from simplifyPathHandler: ", error);
        throw new Error(error);
    }
};
exports.simplifyPathHandler = simplifyPathHandler;
const starterCodeSimplifyPathJS = `function simplifyPath(path) {
  // Write your code here
};`;
exports.simplifyPath = {
    id: "simplify-path",
    title: "74. Simplify Path",
    problemStatement: `<p class='mt-3'>
    You are given an absolute Unix-style file path <code>path</code> as a string, and you must
    transform it into its <strong>simplified canonical path</strong>.
  </p>
  <p class='mt-3'>
    In a Unix-style path, a single period <code>.</code> refers to the current directory, a double
    period <code>..</code> refers to the parent directory (moving up one level, or staying at the
    root if already there), and multiple consecutive slashes are treated as a single slash.
  </p>
  <p class='mt-3'>
    The canonical path should start with a single slash, directories should be separated by exactly
    one slash, it should not end with a trailing slash (unless it is the root <code>/</code>), and it
    should not contain <code>.</code> or <code>..</code> segments.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: `path = "/home/"`,
            outputText: `"/home"`,
        },
        {
            id: 1,
            inputText: `path = "/home//foo/"`,
            outputText: `"/home/foo"`,
        },
        {
            id: 2,
            inputText: `path = "/home/user/Documents/../Pictures"`,
            outputText: `"/home/user/Pictures"`,
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= path.length <= 3000</code></li>
<li class='mt-2'><code>path</code> starts with a single slash <code>/</code></li>
<li class='mt-2'><code>path</code> consists of English letters, digits, <code>.</code>, <code>/</code>, or <code>_</code></li>
<li class='mt-2'><code>path</code> is a valid absolute Unix path</li>`,
    starterCode: starterCodeSimplifyPathJS,
    handlerFunction: exports.simplifyPathHandler,
    starterFunctionName: "function simplifyPath(",
    order: 74,
};
