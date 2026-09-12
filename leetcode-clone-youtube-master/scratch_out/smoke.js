const { minStack } = require("./problems/min-stack.js");
const { onlineStockSpan } = require("./problems/online-stock-span.js");
const { generateParentheses } = require("./problems/generate-parentheses.js");
const { asteroidCollision } = require("./problems/asteroid-collision.js");
const { carFleet } = require("./problems/car-fleet.js");
const { decodeString } = require("./problems/decode-string.js");
const { basicCalculator } = require("./problems/basic-calculator.js");
const { simplifyPath } = require("./problems/simplify-path.js");

function check(name, fn) {
	try {
		const ok = fn();
		console.log(name, ok ? "PASS" : "FAIL (returned falsy)");
	} catch (e) {
		console.log(name, "FAIL", e.message);
	}
}

// MinStack - independent correct implementation using array pairs
class GoodMinStack {
	constructor() {
		this.s = [];
	}
	push(v) {
		const m = this.s.length ? Math.min(v, this.s[this.s.length - 1][1]) : v;
		this.s.push([v, m]);
	}
	pop() {
		this.s.pop();
	}
	top() {
		return this.s[this.s.length - 1][0];
	}
	getMin() {
		return this.s[this.s.length - 1][1];
	}
}
check("min-stack", () => minStack.handlerFunction(GoodMinStack));

// StockSpanner - independent brute force implementation
class GoodStockSpanner {
	constructor() {
		this.prices = [];
	}
	next(price) {
		this.prices.push(price);
		let span = 1;
		for (let i = this.prices.length - 2; i >= 0; i--) {
			if (this.prices[i] <= price) span++;
			else break;
		}
		return span;
	}
}
check("online-stock-span", () => onlineStockSpan.handlerFunction(GoodStockSpanner));

// generateParenthesis - independent implementation (different recursion order)
function goodGenerateParenthesis(n) {
	const res = [];
	function helper(s, open, close) {
		if (s.length === 2 * n) {
			res.push(s);
			return;
		}
		if (open < n) helper(s + "(", open + 1, close);
		if (close < open) helper(s + ")", open, close + 1);
	}
	helper("", 0, 0);
	return res;
}
check("generate-parentheses", () => generateParentheses.handlerFunction(goodGenerateParenthesis));

// asteroidCollision - independent implementation
function goodAsteroidCollision(asteroids) {
	const st = [];
	for (let a of asteroids) {
		let alive = true;
		while (alive && a < 0 && st.length && st[st.length - 1] > 0) {
			if (st[st.length - 1] < -a) {
				st.pop();
			} else if (st[st.length - 1] === -a) {
				st.pop();
				alive = false;
			} else {
				alive = false;
			}
		}
		if (alive) st.push(a);
	}
	return st;
}
check("asteroid-collision", () => asteroidCollision.handlerFunction(goodAsteroidCollision));

// carFleet - independent implementation
function goodCarFleet(target, position, speed) {
	const idx = position.map((_, i) => i).sort((a, b) => position[b] - position[a]);
	let fleets = 0;
	let lastTime = -Infinity;
	for (const i of idx) {
		const time = (target - position[i]) / speed[i];
		if (time > lastTime) {
			fleets++;
			lastTime = time;
		}
	}
	return fleets;
}
check("car-fleet", () => carFleet.handlerFunction(goodCarFleet));

// decodeString - independent recursive implementation
function goodDecodeString(s) {
	let i = 0;
	function helper() {
		let result = "";
		let num = 0;
		while (i < s.length && s[i] !== "]") {
			if (s[i] >= "0" && s[i] <= "9") {
				num = num * 10 + Number(s[i]);
				i++;
			} else if (s[i] === "[") {
				i++;
				const inner = helper();
				i++; // skip ]
				result += inner.repeat(num);
				num = 0;
			} else {
				result += s[i];
				i++;
			}
		}
		return result;
	}
	return helper();
}
check("decode-string", () => decodeString.handlerFunction(goodDecodeString));

// basicCalculator - independent implementation (tokenizing then eval-like with stacks)
function goodCalculate(s) {
	let result = 0,
		num = 0,
		sign = 1;
	const stack = [];
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (/\d/.test(c)) {
			num = num * 10 + Number(c);
		} else if (c === "+") {
			result += sign * num;
			num = 0;
			sign = 1;
		} else if (c === "-") {
			result += sign * num;
			num = 0;
			sign = -1;
		} else if (c === "(") {
			stack.push(result, sign);
			result = 0;
			sign = 1;
		} else if (c === ")") {
			result += sign * num;
			num = 0;
			result *= stack.pop();
			result += stack.pop();
		}
	}
	return result + sign * num;
}
check("basic-calculator", () => basicCalculator.handlerFunction(goodCalculate));

// simplifyPath - independent implementation
function goodSimplifyPath(path) {
	const stack = [];
	for (const seg of path.split("/")) {
		if (seg === "" || seg === ".") continue;
		if (seg === "..") stack.pop();
		else stack.push(seg);
	}
	return "/" + stack.join("/");
}
check("simplify-path", () => simplifyPath.handlerFunction(goodSimplifyPath));
