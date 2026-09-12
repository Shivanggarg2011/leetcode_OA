import assert from "assert";
import { Problem, RemoteDriverBuilder, RemoteLanguage } from "../types/problem";

export const validParenthesesHandler = (fn: any) => {
	try {
		const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
		const answers = [true, true, false, false, true];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.error("Error from validParenthesesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;

const starterCodeValidParenthesesPy = `def is_valid(s):
    # Write your code here
    pass
`;

const starterCodeValidParenthesesJava = `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}
`;

const starterCodeValidParenthesesCpp = `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        return false;
    }
};
`;

const driversValidParentheses: Partial<Record<RemoteLanguage, RemoteDriverBuilder>> = {
	python: (userCode, [s]) => ({
		filename: "main.py",
		source: `${userCode}\nimport json\nprint(json.dumps(is_valid(${JSON.stringify(s.value)})))\n`,
	}),
	java: (userCode, [s]) => ({
		filename: "Main.java",
		source: `import java.util.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Solution().isValid(${JSON.stringify(s.value)}));
    }
}
`,
	}),
	cpp: (userCode, [s]) => ({
		filename: "main.cpp",
		source: `#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
    bool result = Solution().isValid(${JSON.stringify(s.value)});
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`,
	}),
};

export const validParentheses: Problem = {
	id: "valid-parentheses",
	title: "4. Valid Parentheses",
	problemStatement: `<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul> <li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li class='mt-3'>Open brackets must be closed in the correct order.</li>
	<li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
	</ul>`,
	examples: [
		{
			id: 0,
			inputText: 's = "()"',
			outputText: "true",
		},
		{
			id: 1,
			inputText: 's = "()[]{}"',
			outputText: "true",
		},
		{
			id: 2,
			inputText: 's = "(]"',
			outputText: "false",
		},
		{
			id: 3,
			inputText: 's = "([)]"',
			outputText: "false",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
	handlerFunction: validParenthesesHandler,
	starterCode: starterCodeValidParenthesesJS,
	starterFunctionName: "function validParentheses(",
	order: 4,
	remoteExecution: {
		languages: ["python", "java", "cpp"],
		starterCodeByLanguage: {
			python: starterCodeValidParenthesesPy,
			java: starterCodeValidParenthesesJava,
			cpp: starterCodeValidParenthesesCpp,
		},
		driversByLanguage: driversValidParentheses,
		hiddenTestCases: [
			{ inputText: 's = "([)]"', outputText: "false" },
			{ inputText: 's = "{[]}"', outputText: "true" },
		],
	},
};
