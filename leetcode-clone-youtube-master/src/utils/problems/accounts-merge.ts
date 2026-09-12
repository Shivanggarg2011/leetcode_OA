import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: union-find over emails, grouping accounts that share one.
function referenceAccountsMerge(accounts: string[][]): string[][] {
	const parent = new Map<string, string>();
	const emailToName = new Map<string, string>();

	function find(x: string): string {
		while (parent.get(x) !== x) {
			parent.set(x, parent.get(parent.get(x)!)!);
			x = parent.get(x)!;
		}
		return x;
	}

	function union(a: string, b: string) {
		const ra = find(a);
		const rb = find(b);
		if (ra !== rb) parent.set(ra, rb);
	}

	for (const account of accounts) {
		const name = account[0];
		for (let i = 1; i < account.length; i++) {
			const email = account[i];
			if (!parent.has(email)) parent.set(email, email);
			emailToName.set(email, name);
			if (i > 1) union(account[i - 1], email);
		}
	}

	const groups = new Map<string, string[]>();
	for (const email of parent.keys()) {
		const root = find(email);
		if (!groups.has(root)) groups.set(root, []);
		groups.get(root)!.push(email);
	}

	const result: string[][] = [];
	for (const [root, emails] of groups) {
		emails.sort();
		result.push([emailToName.get(root)!, ...emails]);
	}
	return result;
}

// The relative order of accounts, and (for grading purposes) the order of
// emails within an account, are not fixed — normalize both before comparing.
function normalizeAccounts(accounts: string[][]): [string, string[]][] {
	return accounts
		.map((acc): [string, string[]] => [acc[0], [...acc.slice(1)].sort()])
		.sort((a, b) => (a[0] + a[1].join(",")).localeCompare(b[0] + b[1].join(",")));
}

export const accountsMergeHandler = (fn: any) => {
	try {
		const tests: string[][][] = [
			[
				["John", "johnsmith@mail.com", "john_newyork@mail.com"],
				["John", "johnsmith@mail.com", "john00@mail.com"],
				["Mary", "mary@mail.com"],
				["John", "johnnybravo@mail.com"],
			],
			[
				["Alice", "alice@mail.com"],
				["Alice", "alice@mail.com"],
			],
			[
				["Bob", "bob1@mail.com", "bob2@mail.com"],
				["Bob", "bob3@mail.com"],
			],
			[["A", "a1@mail.com"]],
			[
				["Kevin", "kevin1@mail.com", "kevin2@mail.com"],
				["Kevin", "kevin3@mail.com", "kevin2@mail.com"],
				["Kevin", "kevin4@mail.com", "kevin3@mail.com"],
			],
		];
		for (const accounts of tests) {
			const expected = normalizeAccounts(referenceAccountsMerge(accounts.map((a) => [...a])));
			const result = normalizeAccounts(fn(accounts.map((a) => [...a])));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from accountsMergeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeAccountsMergeJS = `function accountsMerge(accounts) {
  // Write your code here
};`;

export const accountsMerge: Problem = {
	id: "accounts-merge",
	title: "190. Accounts Merge",
	problemStatement: `<p class='mt-3'>
    You are given a list <code>accounts</code>, where each <code>accounts[i]</code> is a list of
    strings: the first element is the account owner's <code>name</code>, and the rest are emails on
    that account.
  </p>
  <p class='mt-3'>
    Two accounts belong to the same person if they share at least one email in common (even if the
    listed names differ is not expected to happen in valid input — a shared email always means the
    same person). Merge all accounts belonging to the same person.
  </p>
  <p class='mt-3'>
    Return the merged accounts, where each merged account is a list starting with the name followed
    by all of that person's emails in sorted order. You may return the accounts in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`,
			outputText: `[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`,
			explanation: "The first two John accounts share johnsmith@mail.com, so they merge into one.",
		},
		{
			id: 1,
			inputText: `accounts = [["Alice","alice@mail.com"],["Alice","alice@mail.com"]]`,
			outputText: `[["Alice","alice@mail.com"]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= accounts.length <= 1000</code></li>
  <li class='mt-2'><code>2 <= accounts[i].length <= 10</code></li>
  <li class='mt-2'><code>1 <= accounts[i][j].length <= 30</code></li>`,
	starterCode: starterCodeAccountsMergeJS,
	handlerFunction: accountsMergeHandler,
	starterFunctionName: "function accountsMerge(",
	order: 190,
};
