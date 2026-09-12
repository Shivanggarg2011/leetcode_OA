// Structural/load-time verifier for every problem file.
// Does NOT write or check algorithmic correctness of any solution.
// For each src/utils/problems/<id>.ts file it:
//   1. Transpiles the TS source to JS (via the TypeScript compiler API) and
//      loads ("compiles + runs") the module in a sandbox.
//   2. Confirms the shape required by the app at runtime: id matches filename,
//      starterFunctionName is actually found inside starterCode (required by
//      Playground's code-slicing logic), examples are well-formed, handlerFunction
//      exists, etc.
//   3. Cross-checks against src/utils/problems/index.ts and scripts/manifest.json
//      so every planned problem is actually wired up and reachable.
//
// A file is GOOD if it loads without throwing and passes every structural
// check. Otherwise it is reported as NOT CORRECT with the reason.

const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const Module = require("module");

const ROOT = path.join(__dirname, "..");
const PROBLEMS_DIR = path.join(ROOT, "src", "utils", "problems");
const INDEX_TS = path.join(PROBLEMS_DIR, "index.ts");
const MANIFEST = path.join(ROOT, "scripts", "manifest.json");

function loadTsModule(absPath, sourceOverride) {
	const source = sourceOverride ?? fs.readFileSync(absPath, "utf8");
	const { outputText, diagnostics } = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2019,
			esModuleInterop: true,
		},
		reportDiagnostics: true,
		fileName: absPath,
	});

	const tsErrors = (diagnostics || []).filter((d) => d.category === ts.DiagnosticCategory.Error);
	if (tsErrors.length) {
		const msgs = tsErrors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
		throw new Error("transpile error(s): " + msgs.join(" | "));
	}

	const m = new Module(absPath, module);
	m.filename = absPath;
	m.paths = Module._nodeModulePaths(path.dirname(absPath));
	const originalResolve = m.constructor._resolveFilename;
	// Any non-relative-file-content import in these files should only ever be
	// `assert` or the (type-only) `../types/problem`, per the authoring guide.
	m._compile(outputText, absPath);
	return m.exports;
}

// Patch require inside the sandboxed module so `../types/problem` (type-only,
// should be elided, but just in case) resolves to an empty stub instead of
// hitting a real .ts file Node can't parse.
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
	if (request.endsWith("types/problem")) return {};
	if (/\.(jpg|jpeg|png|svg|gif)$/i.test(request)) return { src: request };
	return originalLoad.apply(this, arguments);
};

function listProblemFiles() {
	return fs
		.readdirSync(PROBLEMS_DIR)
		.filter((f) => f.endsWith(".ts") && f !== "index.ts")
		.map((f) => path.join(PROBLEMS_DIR, f));
}

function checkProblem(absPath) {
	const id = path.basename(absPath, ".ts");
	const issues = [];
	let exportsObj;
	try {
		exportsObj = loadTsModule(absPath);
	} catch (e) {
		return { id, ok: false, issues: [`FAILED TO LOAD/COMPILE: ${e.message}`] };
	}

	const values = Object.values(exportsObj).filter((v) => v && typeof v === "object" && "id" in v);
	if (values.length === 0) {
		return { id, ok: false, issues: ["no exported object with an `id` field found"] };
	}
	if (values.length > 1) {
		issues.push(`multiple exported Problem-shaped objects (${values.length}); expected exactly 1`);
	}
	const problem = values[0];

	if (problem.id !== id) issues.push(`problem.id "${problem.id}" does not match filename "${id}"`);
	if (typeof problem.title !== "string" || !problem.title.trim()) issues.push("missing/empty title");
	if (typeof problem.problemStatement !== "string" || !problem.problemStatement.trim())
		issues.push("missing/empty problemStatement");
	if (typeof problem.constraints !== "string" || !problem.constraints.trim())
		issues.push("missing/empty constraints");
	if (typeof problem.order !== "number") issues.push("order is not a number");

	const notes = [];
	if (!Array.isArray(problem.examples) || problem.examples.length < 1) {
		issues.push(`examples missing entirely (${problem.examples?.length ?? 0})`);
	} else {
		if (problem.examples.length < 2) {
			notes.push(`only ${problem.examples.length} example (fine for a single-sequence "design" style problem, otherwise worth a second one)`);
		}
		problem.examples.forEach((ex, i) => {
			if (typeof ex.inputText !== "string" || !ex.inputText.trim())
				issues.push(`example[${i}] missing inputText`);
			if (typeof ex.outputText !== "string" || !ex.outputText.trim())
				issues.push(`example[${i}] missing outputText`);
		});
	}

	if (typeof problem.starterCode !== "string" || !problem.starterCode.trim()) {
		issues.push("missing/empty starterCode");
	} else if (typeof problem.starterFunctionName !== "string" || !problem.starterFunctionName.trim()) {
		issues.push("missing/empty starterFunctionName");
	} else if (problem.starterCode.indexOf(problem.starterFunctionName) === -1) {
		issues.push(
			`starterFunctionName "${problem.starterFunctionName}" not found inside starterCode (breaks the app's code-slicing at submit time)`
		);
	}

	if (typeof problem.handlerFunction !== "function" && typeof problem.handlerFunction !== "string") {
		issues.push("handlerFunction is neither a function nor a string");
	}

	return { id, ok: issues.length === 0, issues, notes };
}

function checkWiring(fileIds) {
	const issues = [];
	const indexSrc = fs.readFileSync(INDEX_TS, "utf8");
	const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
	const manifestIds = manifest.map((m) => m.id);

	const fileIdSet = new Set(fileIds);
	const manifestIdSet = new Set(manifestIds);

	// keys registered in the `problems` record, e.g.  "two-sum": twoSum,
	const registeredIds = new Set();
	const keyRe = /"([a-z0-9-]+)":\s*[A-Za-z0-9_]+,/g;
	let match;
	while ((match = keyRe.exec(indexSrc))) registeredIds.add(match[1]);

	for (const id of manifestIds) {
		if (!fileIdSet.has(id)) issues.push(`manifest id "${id}" has no src/utils/problems/${id}.ts file`);
		if (!registeredIds.has(id)) issues.push(`manifest id "${id}" is not registered in index.ts`);
	}
	for (const id of fileIds) {
		if (!manifestIdSet.has(id)) issues.push(`file "${id}.ts" exists but is not in scripts/manifest.json`);
		if (!registeredIds.has(id)) issues.push(`file "${id}.ts" exists but is not registered in index.ts`);
	}
	for (const id of registeredIds) {
		if (!fileIdSet.has(id)) issues.push(`index.ts registers "${id}" but no matching file exists`);
	}

	return issues;
}

const files = listProblemFiles();
const results = files.map(checkProblem);
const fileIds = files.map((f) => path.basename(f, ".ts"));
const wiringIssues = checkWiring(fileIds);

const good = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);

console.log(`Checked ${results.length} problem files.`);
console.log(`GOOD: ${good.length}`);
console.log(`NOT CORRECT: ${bad.length}`);
if (bad.length) {
	console.log("\n--- Problems flagged NOT CORRECT ---");
	for (const r of bad) {
		console.log(`\n[${r.id}]`);
		r.issues.forEach((i) => console.log("  - " + i));
	}
}
if (wiringIssues.length) {
	console.log(`\n--- Wiring issues (${wiringIssues.length}) ---`);
	wiringIssues.forEach((i) => console.log("  - " + i));
} else {
	console.log("\nWiring check: all manifest/file/index.ts registrations match.");
}

process.exitCode = bad.length || wiringIssues.length ? 1 : 0;
