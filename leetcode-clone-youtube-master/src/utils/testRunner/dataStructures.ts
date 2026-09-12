// Shared array <-> data-structure converters used by the generic test runner
// to support "Run" and custom test cases for linked-list / tree problems
// without touching each problem's own file.

export class RunnerListNode {
	val: any;
	next: RunnerListNode | null;
	constructor(val: any) {
		this.val = val;
		this.next = null;
	}
}

export class RunnerTreeNode {
	val: any;
	left: RunnerTreeNode | null;
	right: RunnerTreeNode | null;
	constructor(val: any) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

export function arrayToLinkedList(values: any[] | null | undefined): RunnerListNode | null {
	if (!values || values.length === 0) return null;
	const head = new RunnerListNode(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		const node = new RunnerListNode(values[i]);
		current.next = node;
		current = node;
	}
	return head;
}

export function linkedListToArray(node: any): any[] {
	const values: any[] = [];
	let current = node;
	const seen = new Set<any>();
	while (current !== null && current !== undefined) {
		if (seen.has(current)) break; // guard against accidental cycles from buggy user code
		seen.add(current);
		values.push(current.val);
		current = current.next;
	}
	return values;
}

// LeetCode-style compact level-order format: null placeholders only for
// missing children of present nodes; a null node has no children entries.
export function arrayToTree(values: Array<any> | null | undefined): RunnerTreeNode | null {
	if (!values || values.length === 0 || values[0] === null || values[0] === undefined) return null;
	const root = new RunnerTreeNode(values[0]);
	const queue: RunnerTreeNode[] = [root];
	let i = 1;
	while (queue.length > 0 && i < values.length) {
		const node = queue.shift() as RunnerTreeNode;
		if (i < values.length) {
			const leftVal = values[i++];
			if (leftVal !== null && leftVal !== undefined) {
				node.left = new RunnerTreeNode(leftVal);
				queue.push(node.left);
			}
		}
		if (i < values.length) {
			const rightVal = values[i++];
			if (rightVal !== null && rightVal !== undefined) {
				node.right = new RunnerTreeNode(rightVal);
				queue.push(node.right);
			}
		}
	}
	return root;
}

export function treeToArray(root: any): Array<any> {
	if (root === null || root === undefined) return [];
	const result: Array<any> = [];
	const queue: Array<any> = [root];
	while (queue.length > 0) {
		const node = queue.shift();
		if (node === null || node === undefined) {
			result.push(null);
			continue;
		}
		result.push(node.val);
		queue.push(node.left ?? null);
		queue.push(node.right ?? null);
	}
	while (result.length > 0 && result[result.length - 1] === null) {
		result.pop();
	}
	return result;
}

export function findTreeNodeByValue(root: any, value: any): any {
	if (root === null || root === undefined) return null;
	const queue: Array<any> = [root];
	while (queue.length > 0) {
		const node = queue.shift();
		if (node === null || node === undefined) continue;
		if (node.val === value) return node;
		queue.push(node.left);
		queue.push(node.right);
	}
	return null;
}
