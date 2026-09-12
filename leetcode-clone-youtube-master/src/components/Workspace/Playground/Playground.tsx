import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { StreamLanguage } from "@codemirror/language";
import { java, cpp } from "@codemirror/legacy-modes/mode/clike";
import EditorFooter from "./EditorFooter";
import { Problem, RemoteLanguage } from "@/utils/types/problem";
import { ExecuteResponse } from "@/utils/types/execute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { runTestCase, RunResult, CodeContext } from "@/utils/testRunner/runCase";
import { RUN_UNSUPPORTED } from "@/utils/testRunner/paramTypes";
import { checkSyntaxError } from "@/utils/testRunner/errorLocation";
import { parseArgString } from "@/utils/testRunner/parse";
import { mapRemoteResultToRunResult } from "@/utils/testRunner/remote/mapResult";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { addLocalSolvedProblem } from "@/utils/localProgress";

type TestCase = {
	id: string;
	inputText: string;
	outputText: string | null;
	isCustom: boolean;
};

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditorLanguage = "javascript" | RemoteLanguage;

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
	language: EditorLanguage;
}

export const LANGUAGE_LABELS: Record<EditorLanguage, string> = {
	javascript: "JavaScript",
	python: "Python",
	java: "Java",
	cpp: "C++",
};

const extensionsByLanguage: Record<EditorLanguage, any> = {
	javascript: [javascript()],
	python: [python()],
	java: [StreamLanguage.define(java)],
	cpp: [StreamLanguage.define(cpp)],
};

// remoteExecution is dropped from the SSG-serialized `problem` prop (its driver
// builders are real functions, which can't cross JSON) — resolve it from the live
// client-side `problems` map instead, same pattern as this file already uses for
// the real `handlerFunction` callable below.
const getLiveRemoteExecution = (problemId: string) => problems[problemId]?.remoteExecution;

const getStarterCode = (problem: Problem, language: EditorLanguage): string =>
	language === "javascript" ? problem.starterCode : getLiveRemoteExecution(problem.id)?.starterCodeByLanguage[language] ?? problem.starterCode;

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
	const [language] = useLocalStorage("lcc-language", "javascript");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
		language: language as EditorLanguage,
	});

	let [userCode, setUserCode] = useState<string>(getStarterCode(problem, settings.language));
	const [testCases, setTestCases] = useState<TestCase[]>(() =>
		problem.examples.map((example) => ({
			id: `example-${example.id}`,
			inputText: example.inputText,
			outputText: example.outputText,
			isCustom: false,
		}))
	);
	const [runResults, setRunResults] = useState<Record<string, RunResult>>({});
	const [isRunning, setIsRunning] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const runSupported = !RUN_UNSUPPORTED.has(problem.id);

	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();

	const getFunctionName = () => problem.starterFunctionName.replace(/^function\s+/, "").replace(/\($/, "");

	const getCodeContext = (fullCode: string): CodeContext => ({
		fullCode,
		sliceStartIndex: fullCode.indexOf(problem.starterFunctionName),
		functionName: getFunctionName(),
	});

	const handleSubmitRemote = async () => {
		const lang = settings.language as RemoteLanguage;
		const cfg = getLiveRemoteExecution(problem.id);
		const driver = cfg?.driversByLanguage[lang];
		if (!cfg || !driver || !cfg.languages.includes(lang)) {
			toast.error(
				`${LANGUAGE_LABELS[settings.language]} isn't available for this problem yet — try Two Sum, Valid Parentheses, or Contains Duplicate, or switch back to JavaScript.`,
				{ position: "top-center", autoClose: 4000, theme: "dark" }
			);
			return;
		}

		setIsSubmitting(true);
		try {
			const allCases = [...problem.examples, ...cfg.hiddenTestCases];
			for (const testCase of allCases) {
				const args = parseArgString(testCase.inputText);
				const { filename, source } = driver(userCode, args);
				const res = await fetch("/api/execute", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ language: lang, source, filename }),
				});
				const data: ExecuteResponse = await res.json();
				const result = mapRemoteResultToRunResult(data, testCase.outputText);
				if (result.status === "error") {
					toast.error(result.message, { position: "top-center", autoClose: 3000, theme: "dark" });
					return;
				}
				if (result.passed !== true) {
					toast.error("Oops! One or more test cases failed", { position: "top-center", autoClose: 3000, theme: "dark" });
					return;
				}
			}

			toast.success("Congrats! All tests passed!", { position: "top-center", autoClose: 3000, theme: "dark" });
			setSuccess(true);
			setTimeout(() => setSuccess(false), 4000);

			if (user) {
				const userRef = doc(firestore, "users", user.uid);
				await updateDoc(userRef, { solvedProblems: arrayUnion(pid) });
			} else {
				addLocalSolvedProblem(pid as string);
			}
			setSolved(true);
		} catch (error: any) {
			toast.error(error?.message ?? "Couldn't submit your code", { position: "top-center", autoClose: 3000, theme: "dark" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSubmit = async () => {
		if (settings.language !== "javascript") {
			await handleSubmitRemote();
			return;
		}

		const fullCode = userCode;
		const syntaxError = checkSyntaxError(fullCode);
		if (syntaxError) {
			toast.error(`Line ${syntaxError.line}: SyntaxError: ${syntaxError.message}`, {
				position: "top-center",
				autoClose: 4000,
				theme: "dark",
			});
			return;
		}

		try {
			const codeContext = getCodeContext(fullCode);
			const slicedCode = fullCode.slice(codeContext.sliceStartIndex);
			const cb = new Function(`return ${slicedCode}`)();

			// Pre-flight: call the user's function directly (unlike the hidden
			// grading handler below, which wraps and loses the original stack)
			// against a visible example, so a runtime crash reports its real
			// line number instead of just "one or more test cases failed".
			if (runSupported && problem.examples[0]) {
				const preflight = runTestCase(problem.id, cb, problem.examples[0].inputText, null, codeContext);
				if (preflight.status === "error") {
					toast.error(preflight.message, {
						position: "top-center",
						autoClose: 4000,
						theme: "dark",
					});
					return;
				}
			}

			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					if (user) {
						const userRef = doc(firestore, "users", user.uid);
						await updateDoc(userRef, {
							solvedProblems: arrayUnion(pid),
						});
					} else {
						addLocalSolvedProblem(pid as string);
					}
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}-${settings.language}`);
		setUserCode(code ? JSON.parse(code) : getStarterCode(problem, settings.language));
	}, [pid, problem, settings.language]);

	useEffect(() => {
		setTestCases(
			problem.examples.map((example) => ({
				id: `example-${example.id}`,
				inputText: example.inputText,
				outputText: example.outputText,
				isCustom: false,
			}))
		);
		setRunResults({});
		setActiveTestCaseId(0);
	}, [problem.id, problem.examples]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}-${settings.language}`, JSON.stringify(value));
	};

	const handleAddTestCase = () => {
		const template = testCases[0]?.inputText ?? "";
		const newCase: TestCase = {
			id: `custom-${Date.now()}`,
			inputText: template,
			outputText: null,
			isCustom: true,
		};
		setTestCases((prev) => [...prev, newCase]);
		setActiveTestCaseId(testCases.length);
	};

	const handleDeleteTestCase = (index: number) => {
		setTestCases((prev) => {
			const target = prev[index];
			const next = prev.filter((_, i) => i !== index);
			setRunResults((results) => {
				const { [target.id]: _removed, ...rest } = results;
				return rest;
			});
			return next;
		});
		setActiveTestCaseId((prev) => Math.max(0, prev - (prev >= index ? 1 : 0)));
	};

	const handleCustomInputChange = (index: number, value: string) => {
		setTestCases((prev) => prev.map((tc, i) => (i === index ? { ...tc, inputText: value } : tc)));
	};

	const handleRunRemote = async () => {
		const lang = settings.language as RemoteLanguage;
		const cfg = getLiveRemoteExecution(problem.id);
		const driver = cfg?.driversByLanguage[lang];
		if (!cfg || !driver || !cfg.languages.includes(lang)) {
			toast.error(
				`${LANGUAGE_LABELS[settings.language]} isn't available for this problem yet — try Two Sum, Valid Parentheses, or Contains Duplicate, or switch back to JavaScript.`,
				{ position: "top-center", autoClose: 4000, theme: "dark" }
			);
			return;
		}

		setIsRunning(true);
		try {
			const results: Record<string, RunResult> = {};
			// Sequential, not Promise.all: a self-hosted Piston instance is typically a
			// single small container — avoid firing concurrent execute requests per click.
			for (const testCase of testCases) {
				const args = parseArgString(testCase.inputText);
				const { filename, source } = driver(userCode, args);
				const res = await fetch("/api/execute", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ language: lang, source, filename }),
				});
				const data: ExecuteResponse = await res.json();
				results[testCase.id] = mapRemoteResultToRunResult(data, testCase.outputText);
			}
			setRunResults(results);
		} catch (error: any) {
			toast.error(error?.message ?? "Couldn't run your code", {
				position: "top-center",
				autoClose: 4000,
				theme: "dark",
			});
		} finally {
			setIsRunning(false);
		}
	};

	const handleRun = () => {
		if (settings.language !== "javascript") {
			handleRunRemote();
			return;
		}

		if (!runSupported) {
			toast.error("Run isn't available for this problem's data structure — use Submit to grade your solution.", {
				position: "top-center",
				autoClose: 4000,
				theme: "dark",
			});
			return;
		}

		const syntaxError = checkSyntaxError(userCode);
		if (syntaxError) {
			toast.error(`Line ${syntaxError.line}: SyntaxError: ${syntaxError.message}`, {
				position: "top-center",
				autoClose: 4000,
				theme: "dark",
			});
			return;
		}

		setIsRunning(true);
		try {
			const codeContext = getCodeContext(userCode);
			const cb = new Function(`return ${userCode.slice(codeContext.sliceStartIndex)}`)();
			const results: Record<string, RunResult> = {};
			for (const testCase of testCases) {
				results[testCase.id] = runTestCase(problem.id, cb, testCase.inputText, testCase.outputText, codeContext);
			}
			setRunResults(results);
		} catch (error: any) {
			toast.error(error?.message ?? "Couldn't run your code", {
				position: "top-center",
				autoClose: 4000,
				theme: "dark",
			});
		} finally {
			setIsRunning(false);
		}
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={userCode}
						theme={vscodeDark}
						onChange={onChange}
						extensions={extensionsByLanguage[settings.language]}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className='w-full px-5 pb-16 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					<div className='flex flex-wrap items-center'>
						{testCases.map((testCase, index) => {
							const result = runResults[testCase.id];
							const dotColor =
								result?.status === "error"
									? "bg-dark-pink"
									: result?.status === "success" && result.passed === true
									? "bg-brand-orange"
									: result?.status === "success" && result.passed === false
									? "bg-dark-pink"
									: "bg-gray-500";
							return (
								<div className='mr-2 flex items-center mt-2' key={testCase.id}>
									<div
										onClick={() => setActiveTestCaseId(index)}
										className={`font-medium items-center transition-colors focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap gap-2
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
									>
										{result && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />}
										Case {index + 1}
										{testCase.isCustom && (
											<AiOutlineClose
												className='transition-colors hover:text-white'
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteTestCase(index);
												}}
											/>
										)}
									</div>
								</div>
							);
						})}
						{runSupported && (
							<button
								onClick={handleAddTestCase}
								className='mr-2 mt-2 flex items-center justify-center rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-gray-500 hover:text-white h-8 w-8 transition-colors'
								title='Add custom test case'
							>
								<AiOutlinePlus />
							</button>
						)}
					</div>

					{testCases[activeTestCaseId] && (
						<div className='font-semibold my-4'>
							<p className='text-sm font-medium mt-4 text-white'>Input:</p>
							{testCases[activeTestCaseId].isCustom ? (
								<textarea
									className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 resize-y font-mono text-sm focus:outline-none focus:border-brand-orange'
									value={testCases[activeTestCaseId].inputText}
									onChange={(e) => handleCustomInputChange(activeTestCaseId, e.target.value)}
									rows={2}
								/>
							) : (
								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 font-mono text-sm'>
									{testCases[activeTestCaseId].inputText}
								</div>
							)}

							{!testCases[activeTestCaseId].isCustom && (
								<>
									<p className='text-sm font-medium mt-4 text-white'>Expected Output:</p>
									<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 font-mono text-sm'>
										{testCases[activeTestCaseId].outputText}
									</div>
								</>
							)}

							{(() => {
								const result = runResults[testCases[activeTestCaseId].id];
								if (!result) return null;
								if (result.status === "error") {
									return (
										<>
											<p className='text-sm font-medium mt-4 text-dark-pink'>Error:</p>
											<div className='w-full rounded-lg border px-3 py-[10px] bg-dark-pink bg-opacity-10 border-dark-pink border-opacity-30 text-dark-pink mt-2 whitespace-pre-wrap font-mono text-sm'>
												{result.message}
											</div>
										</>
									);
								}
								return (
									<>
										<p className='text-sm font-medium mt-4 text-white'>Your Output:</p>
										<div
											className={`w-full cursor-text rounded-lg border px-3 py-[10px] mt-2 font-mono text-sm ${
												result.passed === true
													? "bg-brand-orange bg-opacity-10 border-brand-orange border-opacity-30 text-brand-orange"
													: result.passed === false
													? "bg-dark-pink bg-opacity-10 border-dark-pink border-opacity-30 text-dark-pink"
													: "bg-dark-fill-3 border-transparent text-white"
											}`}
										>
											{result.actualDisplay}
										</div>
									</>
								);
							})()}
						</div>
					)}
				</div>
			</Split>
			<EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} isRunning={isRunning} isSubmitting={isSubmitting} />
		</div>
	);
};
export default Playground;
