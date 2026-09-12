import assert from "assert";
import { Problem, RemoteDriverBuilder, RemoteLanguage } from "../types/problem";

// Reference solution: a number appears twice if the set of unique values
// is smaller than the array itself.
function referenceContainsDuplicate(nums: number[]): boolean {
	const seen = new Set<number>();
	for (const n of nums) {
		if (seen.has(n)) return true;
		seen.add(n);
	}
	return false;
}

export const containsDuplicateHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 3, 1],
			[1, 2, 3, 4],
			[1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
			[],
			[7],
			[-1, -2, -3, -1],
		];
		for (const test of tests) {
			const expected = referenceContainsDuplicate(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from containsDuplicateHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeContainsDuplicateJS = `function containsDuplicate(nums) {
  // Write your code here
};`;

const starterCodeContainsDuplicatePy = `def contains_duplicate(nums):
    # Write your code here
    pass
`;

const starterCodeContainsDuplicateJava = `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your code here
        return false;
    }
}
`;

const starterCodeContainsDuplicateCpp = `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Write your code here
        return false;
    }
};
`;

const driversContainsDuplicate: Partial<Record<RemoteLanguage, RemoteDriverBuilder>> = {
	python: (userCode, [nums]) => ({
		filename: "main.py",
		source: `${userCode}\nimport json\nprint(json.dumps(contains_duplicate(${JSON.stringify(nums.value)})))\n`,
	}),
	java: (userCode, [nums]) => ({
		filename: "Main.java",
		source: `import java.util.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        int[] nums = {${nums.value.join(",")}};
        System.out.println(new Solution().containsDuplicate(nums));
    }
}
`,
	}),
	cpp: (userCode, [nums]) => ({
		filename: "main.cpp",
		source: `#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
    vector<int> nums = {${nums.value.join(",")}};
    bool result = Solution().containsDuplicate(nums);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`,
	}),
};

export const containsDuplicate: Problem = {
	id: "contains-duplicate",
	title: "2. Contains Duplicate",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, determine whether any value appears <strong>at least twice</strong>
    in the array.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if any value appears more than once, and return <code>false</code> if every element is distinct.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3,1]`,
			outputText: `true`,
			explanation: "The value 1 appears at indices 0 and 3.",
		},
		{
			id: 1,
			inputText: `nums = [1,2,3,4]`,
			outputText: `false`,
			explanation: "All elements are distinct.",
		},
		{
			id: 2,
			inputText: `nums = [1,1,1,3,3,4,3,2,4,2]`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-10^9 <= nums[i] <= 10^9</code></li>`,
	starterCode: starterCodeContainsDuplicateJS,
	handlerFunction: containsDuplicateHandler,
	starterFunctionName: "function containsDuplicate(",
	order: 2,
	remoteExecution: {
		languages: ["python", "java", "cpp"],
		starterCodeByLanguage: {
			python: starterCodeContainsDuplicatePy,
			java: starterCodeContainsDuplicateJava,
			cpp: starterCodeContainsDuplicateCpp,
		},
		driversByLanguage: driversContainsDuplicate,
		hiddenTestCases: [
			{ inputText: "nums = []", outputText: "false" },
			{ inputText: "nums = [-1,-2,-3,-1]", outputText: "true" },
		],
	},
};
