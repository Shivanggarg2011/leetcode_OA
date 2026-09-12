import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: store each user's tweets with a global increasing
// timestamp, and merge the current user's tweets with their followees' when
// building a news feed.
class ReferenceTwitter {
	time = 0;
	tweets = new Map<number, { id: number; time: number }[]>();
	following = new Map<number, Set<number>>();

	postTweet(userId: number, tweetId: number): void {
		if (!this.tweets.has(userId)) this.tweets.set(userId, []);
		this.tweets.get(userId)!.push({ id: tweetId, time: this.time++ });
	}

	getNewsFeed(userId: number): number[] {
		const relevantUsers = new Set(this.following.get(userId) || []);
		relevantUsers.add(userId);
		const all: { id: number; time: number }[] = [];
		for (const uid of relevantUsers) {
			all.push(...(this.tweets.get(uid) || []));
		}
		all.sort((a, b) => b.time - a.time);
		return all.slice(0, 10).map((t) => t.id);
	}

	follow(userId: number, followeeId: number): void {
		if (userId === followeeId) return;
		if (!this.following.has(userId)) this.following.set(userId, new Set());
		this.following.get(userId)!.add(followeeId);
	}

	unfollow(userId: number, followeeId: number): void {
		this.following.get(userId)?.delete(followeeId);
	}
}

type Op = { method: "postTweet" | "getNewsFeed" | "follow" | "unfollow"; args: number[] };

export const designTwitterHandler = (fn: any) => {
	try {
		const scripts: Op[][] = [
			[
				{ method: "postTweet", args: [1, 5] },
				{ method: "getNewsFeed", args: [1] },
				{ method: "follow", args: [1, 2] },
				{ method: "postTweet", args: [2, 6] },
				{ method: "getNewsFeed", args: [1] },
				{ method: "unfollow", args: [1, 2] },
				{ method: "getNewsFeed", args: [1] },
			],
			[
				{ method: "postTweet", args: [1, 1] },
				{ method: "postTweet", args: [1, 2] },
				{ method: "postTweet", args: [1, 3] },
				{ method: "getNewsFeed", args: [1] },
				{ method: "follow", args: [2, 1] },
				{ method: "getNewsFeed", args: [2] },
			],
			[
				{ method: "postTweet", args: [1, 100] },
				{ method: "postTweet", args: [2, 200] },
				{ method: "postTweet", args: [3, 300] },
				{ method: "follow", args: [1, 2] },
				{ method: "follow", args: [1, 3] },
				{ method: "getNewsFeed", args: [1] },
				{ method: "unfollow", args: [1, 3] },
				{ method: "getNewsFeed", args: [1] },
				{ method: "getNewsFeed", args: [3] },
			],
		];

		for (const script of scripts) {
			const userTwitter = new fn();
			const refTwitter = new ReferenceTwitter();
			const userResults: any[] = [];
			const refResults: any[] = [];
			for (const step of script) {
				const userMethod = (userTwitter as any)[step.method].bind(userTwitter);
				const refMethod = (refTwitter as any)[step.method].bind(refTwitter);
				userResults.push(userMethod(...step.args));
				refResults.push(refMethod(...step.args));
			}
			assert.deepStrictEqual(userResults, refResults);
		}
		return true;
	} catch (error: any) {
		console.log("Error from designTwitterHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignTwitterJS = `class Twitter {
  constructor() {
    // Write your code here
  }

  postTweet(userId, tweetId) {
    // Write your code here
  }

  getNewsFeed(userId) {
    // Write your code here
  }

  follow(userId, followeeId) {
    // Write your code here
  }

  unfollow(userId, followeeId) {
    // Write your code here
  }
};`;

export const designTwitter: Problem = {
	id: "design-twitter",
	title: "142. Design Twitter",
	problemStatement: `<p class='mt-3'>
    Design a simplified version of Twitter that supports posting tweets, following/unfollowing
    another user, and viewing the <code>10</code> most recent tweet ids in a user's news feed.
  </p>
  <p class='mt-3'>
    Implement the <code>Twitter</code> class:
  </p>
  <p class='mt-3'>
    <code>postTweet(userId, tweetId)</code> creates a new tweet with id <code>tweetId</code> posted
    by <code>userId</code>.
  </p>
  <p class='mt-3'>
    <code>getNewsFeed(userId)</code> returns the <code>10</code> most recent tweet ids in the
    user's news feed, made up of tweets from the user themself and from everyone they follow,
    ordered from most recent to least recent.
  </p>
  <p class='mt-3'>
    <code>follow(userId, followeeId)</code> makes <code>userId</code> follow
    <code>followeeId</code>, and <code>unfollow(userId, followeeId)</code> makes them stop
    following them.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]`,
			outputText: `[null, null, [5], null, null, [6, 5], null, [5]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= userId, followeeId, tweetId <= 500</code></li>
  <li class='mt-2'>All tweet ids are unique.</li>
  <li class='mt-2'>At most <code>3 * 10^4</code> calls will be made in total to the four methods.</li>`,
	starterCode: starterCodeDesignTwitterJS,
	handlerFunction: designTwitterHandler,
	starterFunctionName: "class Twitter {",
	order: 142,
};
