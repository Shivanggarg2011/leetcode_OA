// Per-problem parameter/return type overrides for the generic test runner.
// Every problem not listed here defaults to plain JS values for every
// parameter and its return value, which covers the vast majority of
// problems (arrays, strings, numbers, matrices, booleans...).
//
// Only problems whose starter function takes/returns a linked list, tree,
// or a node reference looked up by value need an entry here. Types:
//   value          - use the parsed literal as-is
//   tree           - array -> RunnerTreeNode (LeetCode level-order format)
//   list           - array -> RunnerListNode
//   listArray      - array of arrays -> array of RunnerListNode
//   treeRefByValue - a value naming a node inside a preceding `tree` arg;
//                    resolved to that actual node reference
//   treeNodeValue  - (return only) a TreeNode result displayed as its `.val`

export type ParamType = "value" | "tree" | "list" | "listArray" | "treeRefByValue";
export type ReturnType = "value" | "tree" | "list" | "treeNodeValue";

type Entry = {
	params: ParamType[];
	returnType: ReturnType;
};

export const PROBLEM_TYPE_OVERRIDES: Record<string, Entry> = {
	"balanced-binary-tree": { params: ["tree"], returnType: "value" },
	"binary-tree-inorder-traversal": { params: ["tree"], returnType: "value" },
	"binary-tree-level-order-traversal": { params: ["tree"], returnType: "value" },
	"binary-tree-maximum-path-sum": { params: ["tree"], returnType: "value" },
	"binary-tree-postorder-traversal": { params: ["tree"], returnType: "value" },
	"binary-tree-preorder-traversal": { params: ["tree"], returnType: "value" },
	"binary-tree-right-side-view": { params: ["tree"], returnType: "value" },
	"binary-tree-zigzag-level-order-traversal": { params: ["tree"], returnType: "value" },
	"construct-binary-tree-from-preorder-and-inorder-traversal": {
		params: ["value", "value"],
		returnType: "tree",
	},
	"convert-sorted-array-to-binary-search-tree": { params: ["value"], returnType: "tree" },
	"count-good-nodes-in-binary-tree": { params: ["tree"], returnType: "value" },
	"diameter-of-binary-tree": { params: ["tree"], returnType: "value" },
	"flatten-binary-tree-to-linked-list": { params: ["tree"], returnType: "tree" },
	"invert-binary-tree": { params: ["tree"], returnType: "tree" },
	"kth-smallest-element-in-a-bst": { params: ["tree", "value"], returnType: "value" },
	"lowest-common-ancestor-of-a-binary-search-tree": {
		params: ["tree", "treeRefByValue", "treeRefByValue"],
		returnType: "treeNodeValue",
	},
	"lowest-common-ancestor-of-a-binary-tree": {
		params: ["tree", "treeRefByValue", "treeRefByValue"],
		returnType: "treeNodeValue",
	},
	"maximum-depth-of-binary-tree": { params: ["tree"], returnType: "value" },
	"path-sum-ii": { params: ["tree", "value"], returnType: "value" },
	"path-sum": { params: ["tree", "value"], returnType: "value" },
	"same-tree": { params: ["tree", "tree"], returnType: "value" },
	"subtree-of-another-tree": { params: ["tree", "tree"], returnType: "value" },
	"symmetric-tree": { params: ["tree"], returnType: "value" },
	"validate-binary-search-tree": { params: ["tree"], returnType: "value" },

	"add-two-numbers": { params: ["list", "list"], returnType: "list" },
	"merge-two-sorted-lists": { params: ["list", "list"], returnType: "list" },
	"merge-k-sorted-lists": { params: ["listArray"], returnType: "list" },
	"odd-even-linked-list": { params: ["list"], returnType: "list" },
	"palindrome-linked-list": { params: ["list"], returnType: "value" },
	"remove-nth-node-from-end-of-list": { params: ["list", "value"], returnType: "list" },
	"reorder-list": { params: ["list"], returnType: "list" },
	"reverse-linked-list": { params: ["list"], returnType: "list" },
	"rotate-list": { params: ["list", "value"], returnType: "list" },
	"swap-nodes-in-pairs": { params: ["list"], returnType: "list" },
};

// Problems whose visible examples/input can't be round-tripped through a
// simple array format (cyclic lists, adjacency-list graphs, random
// pointers, or a non-standard call signature). Run + custom test cases are
// disabled for these; Submit (the full hidden grading suite) still works.
export const RUN_UNSUPPORTED = new Set<string>([
	"linked-list-cycle",
	"linked-list-cycle-ii",
	"clone-graph",
	"copy-list-with-random-pointer",
	"serialize-and-deserialize-binary-tree",

	// Design/class-based problems: the visible example is a sequence of
	// constructor + method calls (LeetCode's `["Class","op1","op2"]
	// [[ctorArgs],[op1Args],[op2Args]]` convention, or an equivalent
	// semicolon-separated pseudo-call string), which the generic single-call
	// runner (one parsed arg list, one `fn(...args)` call) can't execute.
	// Without this exemption, the preflight check in handleSubmit fails to
	// parse the example and blocks Submit entirely before it ever reaches
	// the real handlerFunction grading.
	"min-stack",
	"lru-cache",
	"lfu-cache",
	"time-based-key-value-store",
	"implement-trie",
	"kth-largest-element-in-a-stream",
	"find-median-from-data-stream",
	"design-add-and-search-words-data-structure",
	"design-twitter",
	"online-stock-span",
	"design-a-leaderboard",
	"design-hashmap",
	"design-hashset",
	"design-circular-queue",
	"design-parking-system",
	"design-underground-system",
	"design-browser-history",
	"design-file-system",
	"insert-delete-getrandom-o",
	"detect-squares",
	"design-snake-game",
]);

export function getProblemTypeEntry(problemId: string): Entry {
	return PROBLEM_TYPE_OVERRIDES[problemId] ?? { params: [], returnType: "value" };
}
