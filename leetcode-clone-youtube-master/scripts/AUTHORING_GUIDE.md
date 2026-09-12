# Problem authoring guide

You are writing full `Problem` content files for a LeetCode-style practice app (Next.js + TypeScript).
Read this guide fully, then read your assigned batch JSON file, then write one `.ts` file per problem
into `src/utils/problems/` (relative to the project root `C:\leetcode_maker\leetcode-clone-youtube-master`).

## Type you are targeting (`src/utils/types/problem.ts`, already defined — do not edit it)

```ts
export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

export type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: string;
  handlerFunction: ((fn: any) => boolean) | string;
  starterFunctionName: string;
};
```

## Reference example — read this file first: `src/utils/problems/jump-game.ts`

Follow its shape exactly: a `const starterCode... ` string, a named handler function
(`export const <camelCaseId>Handler = (fn: any) => {...}`), and the exported `Problem` object.

## Rules

1. **One file per problem**, path `src/utils/problems/<id>.ts` using the exact `id` given in your batch
   JSON. Export the `Problem` object as a named export using a camelCase version of the id
   (e.g. id `group-anagrams` -> `export const groupAnagrams: Problem = {...}`).
2. **Do not copy LeetCode's exact wording.** These are well-known, publicly-documented algorithm
   problems (facts/algorithms are not copyrightable) — write the problem statement, examples, and
   constraints in your own original phrasing. Keep the `title` field exactly as given in the batch
   JSON, prefixed with `"<order>. "` (e.g. order 42, title "Group Anagrams" -> `"42. Group Anagrams"`).
3. **`problemStatement`** is an HTML string (Tailwind classes fine, matching the style in
   `jump-game.ts` / `reverse-linked-list.ts`: `<p class='mt-3'>...</p>` paragraphs, `<code>` for
   inline code). Explain the problem clearly and completely enough to solve it, including any
   important edge-case rules.
4. **`examples`**: at least 2, ideally 3. Each needs realistic `inputText` / `outputText` strings
   (e.g. `"nums = [2,3,1,1,4]"`) and an `explanation` where it adds clarity. No `img` needed unless
   truly necessary (only use for tree/list diagrams, and only if you're not going to reference an
   image file that doesn't exist — when in doubt, skip `img`).
5. **`constraints`**: an HTML `<li class='mt-2'><code>...</code></li>` list, realistic bounds for the
   problem (input size limits, value ranges).
6. **`starterCode`**: a plain JS function stub (no TypeScript types) with a helpful signature and a
   `// Write your code here` comment, matching the exact style in the reference file. The function
   name must be descriptive and match what `starterFunctionName` will match against.
7. **`starterFunctionName`**: must be an exact literal prefix of the starter function declaration
   line, e.g. `"function twoSum("`. This is used to slice the user's submitted code, so get the
   spacing/parens exactly right.
8. **`handlerFunction`** — THE MOST IMPORTANT PART FOR CORRECTNESS. Do NOT hand-type literal
   expected-output arrays from memory for anything beyond trivial problems — that's how silent bugs
   creep in. Instead, inside the handler:
   a. Write a small, clearly-correct **reference solution** function (your own straightforward
      implementation of the problem) as a local helper inside the same file.
   b. Define 4-6 concrete test inputs (include edge cases: empty/minimal input, duplicates,
      negative numbers, already-sorted/already-done cases, etc. as relevant to the problem).
   c. For each test input, compute `expected = referenceSolution(...input)` and
      `result = fn(...input)`, then `assert.deepStrictEqual(result, expected)` (or `assert.equal`
      for primitives, following the pattern in `jump-game.ts`).
   d. **If the problem allows multiple valid outputs in any order** (e.g. Subsets, Permutations,
      Combinations, Group Anagrams-style groupings), normalize both `result` and `expected` before
      comparing — e.g. sort each inner array/string and then sort the outer array — so a correct
      submission isn't failed just because of ordering. Do this inline in the handler.
   e. Wrap the whole thing in `try { ... return true; } catch (error: any) { console.log("Error from
      <handlerName>: ", error); throw new Error(error); }` exactly like the reference file.
   f. For linked-list / tree problems, include a small local class + array<->structure conversion
      helpers inside the file (see `reverse-linked-list.ts` for the linked-list pattern). Keep it
      self-contained — do not import from other new files you or other agents are writing.
9. Only import from: `assert` (node built-in), `../types/problem` (`Problem`), and, if truly needed,
   an image already present under `src/utils/problems/images/` (do not invent new image imports).
10. Do NOT edit `src/utils/problems/index.ts`, `src/mockdata/problemsMeta.ts`, or any file outside
    `src/utils/problems/<id>.ts` for your assigned problems. Another process wires up the registry.
11. After writing all files in your batch, run
    `npx tsc --noEmit -p C:\leetcode_maker\leetcode-clone-youtube-master\tsconfig.json` is NOT
    required of you (it will be run centrally afterward) — but do visually re-check each file for
    obvious TypeScript syntax errors (unescaped backticks/quotes inside template strings, mismatched
    braces) before finishing, since template-literal HTML strings are easy to break.
12. Work through your ENTIRE assigned batch — do not stop after a few "as an example." If your batch
    has 25 problems, produce 25 files.

Report back a short list of the ids you completed and any you skipped with a reason.
