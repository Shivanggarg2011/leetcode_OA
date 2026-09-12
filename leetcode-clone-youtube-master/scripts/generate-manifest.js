// One-off generator: builds problemsMeta.ts + manifest.json for the 300+ problem catalog.
const fs = require("fs");
const path = require("path");

// Existing problems that already have full Problem content files — keep their ids stable.
const EXISTING = {
	"Two Sum": "two-sum",
	"Reverse Linked List": "reverse-linked-list",
	"Jump Game": "jump-game",
	"Search a 2D Matrix": "search-a-2d-matrix",
	"Valid Parentheses": "valid-parentheses",
};

const EXISTING_VIDEO_IDS = {
	"two-sum": "8-k1C6ehKuw",
	"valid-parentheses": "xty7fr-k0TU",
	"search-a-2d-matrix": "ZfFl4torNg4",
};

// topic bucket -> "Title|Difficulty" entries
const BUCKETS = {
	"Array & Hashing": [
		"Two Sum|Easy", "Contains Duplicate|Easy", "Valid Anagram|Easy", "Group Anagrams|Medium",
		"Top K Frequent Elements|Medium", "Product of Array Except Self|Medium", "Longest Consecutive Sequence|Medium",
		"Encode and Decode Strings|Medium", "Valid Sudoku|Medium", "Majority Element|Easy",
		"Missing Number|Easy", "Find All Numbers Disappeared in an Array|Easy", "Single Number|Easy",
		"Single Number II|Medium", "Single Number III|Medium", "Intersection of Two Arrays|Easy",
		"Intersection of Two Arrays II|Easy", "Sort Colors|Medium", "Move Zeroes|Easy",
		"Rotate Array|Medium", "Best Time to Buy and Sell Stock|Easy", "Best Time to Buy and Sell Stock II|Medium",
		"Subarray Sum Equals K|Medium", "Continuous Subarray Sum|Medium", "Merge Sorted Array|Easy",
		"Remove Duplicates from Sorted Array|Easy", "Remove Element|Easy", "Plus One|Easy",
		"Pascal's Triangle|Easy", "First Missing Positive|Hard", "Set Matrix Zeroes|Medium",
	],
	"Two Pointers": [
		"Valid Palindrome|Easy", "3Sum|Medium", "3Sum Closest|Medium", "4Sum|Medium",
		"Container With Most Water|Medium", "Trapping Rain Water|Hard", "Sort Array By Parity|Easy",
		"Remove Duplicates from Sorted Array II|Medium", "Backspace String Compare|Easy",
		"Squares of a Sorted Array|Easy", "Reverse String|Easy", "Boats to Save People|Medium",
		"Two Sum II - Input Array Is Sorted|Medium", "Is Subsequence|Easy", "Reverse Vowels of a String|Easy",
	],
	"Sliding Window": [
		"Longest Substring Without Repeating Characters|Medium", "Longest Repeating Character Replacement|Medium",
		"Permutation in String|Medium", "Minimum Window Substring|Hard", "Sliding Window Maximum|Hard",
		"Minimum Size Subarray Sum|Medium", "Fruit Into Baskets|Medium", "Max Consecutive Ones III|Medium",
		"Find All Anagrams in a String|Medium", "Longest Substring with At Most Two Distinct Characters|Medium",
		"Longest Substring with At Most K Distinct Characters|Medium", "Maximum Average Subarray I|Easy",
		"Subarrays with K Different Integers|Hard", "Grumpy Bookstore Owner|Medium", "Frequency of the Most Frequent Element|Medium",
	],
	"Stack": [
		"Valid Parentheses|Easy", "Min Stack|Medium", "Evaluate Reverse Polish Notation|Medium",
		"Generate Parentheses|Medium", "Daily Temperatures|Medium", "Car Fleet|Medium",
		"Largest Rectangle in Histogram|Hard", "Next Greater Element I|Easy", "Next Greater Element II|Medium",
		"Asteroid Collision|Medium", "Decode String|Medium", "Remove All Adjacent Duplicates In String|Easy",
		"Simplify Path|Medium", "Basic Calculator|Hard", "Online Stock Span|Medium",
	],
	"Binary Search": [
		"Search a 2D Matrix|Medium", "Binary Search|Easy", "Search in Rotated Sorted Array|Medium",
		"Search in Rotated Sorted Array II|Medium", "Find Minimum in Rotated Sorted Array|Medium",
		"Find Minimum in Rotated Sorted Array II|Hard", "Time Based Key-Value Store|Medium",
		"Median of Two Sorted Arrays|Hard", "Koko Eating Bananas|Medium", "Capacity To Ship Packages Within D Days|Medium",
		"Split Array Largest Sum|Hard", "Find Peak Element|Medium", "Search Insert Position|Easy",
		"First Bad Version|Easy", "Find First and Last Position of Element in Sorted Array|Medium",
	],
	"Linked List": [
		"Reverse Linked List|Easy", "Merge Two Sorted Lists|Easy", "Linked List Cycle|Easy",
		"Linked List Cycle II|Medium", "Reorder List|Medium", "Remove Nth Node From End of List|Medium",
		"Copy List with Random Pointer|Medium", "Add Two Numbers|Medium", "Merge k Sorted Lists|Hard",
		"LRU Cache|Medium", "LFU Cache|Hard", "Palindrome Linked List|Easy", "Odd Even Linked List|Medium",
		"Swap Nodes in Pairs|Medium", "Rotate List|Medium",
	],
	"Trees": [
		"Maximum Depth of Binary Tree|Easy", "Same Tree|Easy", "Invert Binary Tree|Easy",
		"Subtree of Another Tree|Easy", "Binary Tree Level Order Traversal|Medium",
		"Binary Tree Zigzag Level Order Traversal|Medium", "Binary Tree Right Side View|Medium",
		"Count Good Nodes in Binary Tree|Medium", "Validate Binary Search Tree|Medium",
		"Kth Smallest Element in a BST|Medium", "Construct Binary Tree from Preorder and Inorder Traversal|Medium",
		"Binary Tree Maximum Path Sum|Hard", "Serialize and Deserialize Binary Tree|Hard",
		"Lowest Common Ancestor of a Binary Search Tree|Medium", "Lowest Common Ancestor of a Binary Tree|Medium",
		"Balanced Binary Tree|Easy", "Diameter of Binary Tree|Easy", "Symmetric Tree|Easy",
		"Path Sum|Easy", "Path Sum II|Medium", "Flatten Binary Tree to Linked List|Medium",
		"Binary Tree Inorder Traversal|Easy", "Binary Tree Preorder Traversal|Easy",
		"Binary Tree Postorder Traversal|Easy", "Convert Sorted Array to Binary Search Tree|Easy",
	],
	"Tries": [
		"Implement Trie (Prefix Tree)|Medium", "Design Add and Search Words Data Structure|Medium",
		"Word Search II|Hard", "Replace Words|Medium", "Longest Word in Dictionary|Medium",
	],
	"Heap / Priority Queue": [
		"Kth Largest Element in an Array|Medium", "Kth Largest Element in a Stream|Easy",
		"Last Stone Weight|Easy", "K Closest Points to Origin|Medium", "Task Scheduler|Medium",
		"Design Twitter|Medium", "Find Median from Data Stream|Hard", "Top K Frequent Words|Medium",
		"Reorganize String|Medium", "Ugly Number II|Medium",
	],
	"Backtracking": [
		"Subsets|Medium", "Subsets II|Medium", "Combination Sum|Medium", "Combination Sum II|Medium",
		"Permutations|Medium", "Permutations II|Medium", "Word Search|Medium", "Palindrome Partitioning|Medium",
		"Letter Combinations of a Phone Number|Medium", "N-Queens|Hard", "N-Queens II|Hard",
		"Sudoku Solver|Hard", "Combinations|Medium", "Restore IP Addresses|Medium", "Unique Paths III|Hard",
	],
	"Graphs": [
		"Number of Islands|Medium", "Max Area of Island|Medium", "Clone Graph|Medium",
		"Walls and Gates|Medium", "Rotting Oranges|Medium", "Pacific Atlantic Water Flow|Medium",
		"Surrounded Regions|Medium", "Course Schedule|Medium", "Course Schedule II|Medium",
		"Graph Valid Tree|Medium", "Number of Connected Components in an Undirected Graph|Medium",
		"Redundant Connection|Medium", "Word Ladder|Hard", "Word Ladder II|Hard",
		"Reconstruct Itinerary|Hard", "Evaluate Division|Medium", "Is Graph Bipartite|Medium",
		"Minimum Height Trees|Medium", "All Paths From Source to Target|Medium", "Flood Fill|Easy",
	],
	"Advanced Graphs": [
		"Network Delay Time|Medium", "Cheapest Flights Within K Stops|Medium", "Swim in Rising Water|Hard",
		"Alien Dictionary|Hard", "Min Cost to Connect All Points|Medium", "Path with Maximum Probability|Medium",
		"Critical Connections in a Network|Hard", "Number of Provinces|Medium", "Accounts Merge|Medium",
		"Find the City With the Smallest Number of Neighbors at a Threshold Distance|Medium",
	],
	"1-D Dynamic Programming": [
		"Climbing Stairs|Easy", "House Robber|Medium", "House Robber II|Medium",
		"Longest Palindromic Substring|Medium", "Palindromic Substrings|Medium", "Decode Ways|Medium",
		"Coin Change|Medium", "Coin Change II|Medium", "Maximum Product Subarray|Medium",
		"Word Break|Medium", "Longest Increasing Subsequence|Medium", "Partition Equal Subset Sum|Medium",
		"Combination Sum IV|Medium", "Perfect Squares|Medium", "Integer Break|Medium",
		"Delete and Earn|Medium", "Domino and Tromino Tiling|Medium", "Min Cost Climbing Stairs|Easy",
		"Fibonacci Number|Easy", "Jump Game II|Medium",
	],
	"2-D Dynamic Programming": [
		"Unique Paths|Medium", "Unique Paths II|Medium", "Minimum Path Sum|Medium",
		"Longest Common Subsequence|Medium", "Best Time to Buy and Sell Stock with Cooldown|Medium",
		"Best Time to Buy and Sell Stock III|Hard", "Best Time to Buy and Sell Stock IV|Hard",
		"Edit Distance|Hard", "Interleaving String|Medium", "Distinct Subsequences|Hard",
		"Longest Increasing Path in a Matrix|Hard", "Maximal Square|Medium",
		"Regular Expression Matching|Hard", "Wildcard Matching|Hard", "Target Sum|Medium",
	],
	"Greedy": [
		"Maximum Subarray|Medium", "Jump Game|Medium", "Gas Station|Medium", "Hand of Straights|Medium",
		"Merge Triplets to Form Target Triplet|Medium", "Valid Parenthesis String|Medium", "Candy|Hard",
		"Lemonade Change|Easy", "Assign Cookies|Easy", "Queue Reconstruction by Height|Medium",
		"Jump Game III|Medium", "Non-overlapping Intervals|Medium", "Partition Labels|Medium",
		"Minimum Number of Arrows to Burst Balloons|Medium", "Two City Scheduling|Medium",
	],
	"Intervals": [
		"Merge Intervals|Medium", "Insert Interval|Medium", "Meeting Rooms|Easy", "Meeting Rooms II|Medium",
		"Interval List Intersections|Medium", "My Calendar I|Medium", "Employee Free Time|Hard",
		"Car Pooling|Medium", "Minimum Interval to Include Each Query|Hard", "Remove Covered Intervals|Medium",
	],
	"Math & Geometry": [
		"Rotate Image|Medium", "Spiral Matrix|Medium", "Spiral Matrix II|Medium", "Reshape the Matrix|Easy",
		"Happy Number|Easy", "Pow(x, n)|Medium", "Multiply Strings|Medium", "Detect Squares|Medium",
		"Excel Sheet Column Number|Easy", "Palindrome Number|Easy",
	],
	"Bit Manipulation": [
		"Number of 1 Bits|Easy", "Counting Bits|Easy", "Reverse Bits|Easy", "Missing Number II|Easy",
		"Sum of Two Integers|Medium", "Bitwise AND of Numbers Range|Medium", "Power of Two|Easy",
		"Power of Four|Easy", "Single Number IV|Easy", "Total Hamming Distance|Medium",
	],
	"Design": [
		"Design HashMap|Easy", "Design HashSet|Easy", "Insert Delete GetRandom O(1)|Medium",
		"Design Circular Queue|Medium", "Design Underground System|Medium", "Design Parking System|Easy",
		"Design a Leaderboard|Medium", "Design Browser History|Medium", "Design File System|Medium",
		"Design Snake Game|Medium",
	],
	"Matrix": [
		"Search a 2D Matrix II|Medium", "Word Search|Medium", "Number of Distinct Islands|Medium",
		"Toeplitz Matrix|Easy", "Game of Life|Medium", "Diagonal Traverse|Medium", "Kth Smallest Element in a Sorted Matrix|Medium",
		"Max Increase to Keep City Skyline|Medium", "Cherry Pickup|Hard", "Shortest Path in Binary Matrix|Medium",
	],
	"Strings": [
		"Longest Common Prefix|Easy", "Group Shifted Strings|Medium", "String to Integer (atoi)|Medium",
		"Zigzag Conversion|Medium", "Compare Version Numbers|Medium", "Ransom Note|Easy",
		"Isomorphic Strings|Easy", "Word Pattern|Easy", "One Edit Distance|Medium", "Roman to Integer|Easy",
		"Integer to Roman|Medium", "Length of Last Word|Easy", "Text Justification|Hard",
		"Repeated Substring Pattern|Easy", "Count and Say|Medium",
	],
};

const COMPANY_POOL = [
	"Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber", "LinkedIn", "Adobe",
	"Oracle", "Salesforce", "ByteDance", "Airbnb", "Twitter", "Goldman Sachs", "Two Sigma",
	"Yahoo", "eBay", "Walmart Labs", "Cisco", "Atlassian", "Pinterest", "Snap", "DoorDash",
	"Spotify", "Visa", "PayPal", "Netflix",
];

// deterministic "random" so re-runs are stable
function seededRand(seed) {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function slugify(title) {
	return title
		.toLowerCase()
		.replace(/\(.*?\)/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function pickCompanies(index) {
	const count = 2 + Math.floor(seededRand(index * 7.13) * 3); // 2-4 companies
	const companies = [];
	const usedIdx = new Set();
	// weight first 8 companies (big tech) more heavily
	for (let i = 0; i < count; i++) {
		let idx;
		let attempt = 0;
		do {
			const r = seededRand(index * 3.71 + i * 11.9 + attempt);
			idx = r < 0.55 ? Math.floor(r / 0.55 * 8) : 8 + Math.floor(((r - 0.55) / 0.45) * (COMPANY_POOL.length - 8));
			attempt++;
		} while (usedIdx.has(idx) && attempt < 20);
		usedIdx.add(idx);
		companies.push(COMPANY_POOL[idx]);
	}
	return Array.from(new Set(companies));
}

const seenTitles = new Map(); // title -> id (dedup across buckets)
const manifest = [];
let order = 1;
let globalIndex = 0;

for (const [bucket, entries] of Object.entries(BUCKETS)) {
	for (const entry of entries) {
		const [title, difficulty] = entry.split("|");
		let id = EXISTING[title] || slugify(title);
		if (seenTitles.has(title)) {
			// already added under another bucket -> just add this bucket as an extra topic
			const existing = manifest.find((p) => p.id === seenTitles.get(title));
			if (existing && !existing.topics.includes(bucket)) existing.topics.push(bucket);
			continue;
		}
		seenTitles.set(title, id);
		globalIndex++;
		manifest.push({
			id,
			title,
			difficulty,
			topics: [bucket],
			companies: pickCompanies(globalIndex),
			order: order++,
			isExisting: !!EXISTING[title],
		});
	}
}

console.log(`Total unique problems: ${manifest.length}`);

fs.writeFileSync(path.join(__dirname, "manifest.json"), JSON.stringify(manifest, null, 2));

// Write problemsMeta.ts
const metaLines = manifest
	.map((p) => {
		return `\t{
\t\tid: "${p.id}",
\t\ttitle: "${p.title.replace(/"/g, '\\"')}",
\t\tdifficulty: "${p.difficulty}",
\t\ttopics: [${p.topics.map((t) => `"${t}"`).join(", ")}],
\t\tcompanies: [${p.companies.map((c) => `"${c}"`).join(", ")}],
\t\torder: ${p.order},${
			EXISTING_VIDEO_IDS[p.id] ? `\n\t\tvideoId: "${EXISTING_VIDEO_IDS[p.id]}",` : ""
		}
\t},`;
	})
	.join("\n");

const metaFile = `export type ProblemListItem = {
	id: string;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	topics: string[];
	companies: string[];
	order: number;
	videoId?: string;
	link?: string;
};

export const problemsMeta: ProblemListItem[] = [
${metaLines}
];
`;

fs.writeFileSync(
	path.join(__dirname, "..", "src", "mockdata", "problemsMeta.ts"),
	metaFile
);

console.log("Wrote problemsMeta.ts and manifest.json");
