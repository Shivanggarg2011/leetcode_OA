import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { problemsMeta } from "@/mockdata/problemsMeta";
import { getLocalSolvedProblems } from "@/utils/localProgress";

export const ALL_FILTER = "All";

export type ProblemFilters = {
	company: string;
	difficulty: string;
	topic: string;
};

type ProblemsTableProps = {
	filters: ProblemFilters;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ filters }) => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});
	const solvedProblems = useGetSolvedProblems();

	const problems = useMemo(() => {
		return problemsMeta
			.filter((problem) => filters.company === ALL_FILTER || problem.companies.includes(filters.company))
			.filter((problem) => filters.difficulty === ALL_FILTER || problem.difficulty === filters.difficulty)
			.filter((problem) => filters.topic === ALL_FILTER || problem.topics.includes(filters.topic))
			.sort((a, b) => a.order - b.order);
	}, [filters]);

	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<>
			<tbody className='text-white'>
				{problems.length === 0 && (
					<tr>
						<td colSpan={6} className='px-6 py-8 text-center text-gray-400'>
							No problems match the selected filters.
						</td>
					</tr>
				)}
				{problems.map((problem, idx) => {
					const difficultyClass =
						problem.difficulty === "Easy"
							? "bg-olive text-olive"
							: problem.difficulty === "Medium"
							? "bg-dark-yellow text-dark-yellow"
							: "bg-dark-pink text-dark-pink";
					return (
						<tr
							className={`transition-colors hover:bg-dark-fill-3 ${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
							key={problem.id}
						>
							<th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
								<div className='flex justify-center'>
									{solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={"18"} width='18' />}
								</div>
							</th>
							<td className='px-6 py-4'>
								{problem.link ? (
									<Link
										href={problem.link}
										className='transition-colors hover:text-brand-orange cursor-pointer'
										target='_blank'
									>
										{problem.title}
									</Link>
								) : (
									<Link
										className='transition-colors hover:text-brand-orange cursor-pointer'
										href={`/problems/${problem.id}`}
									>
										{problem.title}
									</Link>
								)}
							</td>
							<td className='px-6 py-4'>
								<span
									className={`${difficultyClass} inline-block rounded-full bg-opacity-[.15] px-2.5 py-1 text-xs font-medium`}
								>
									{problem.difficulty}
								</span>
							</td>
							<td className={"px-6 py-4"}>
								<div className='flex flex-wrap gap-1'>
									{problem.topics.map((topic) => (
										<span
											key={topic}
											className='rounded-full bg-dark-fill-3 px-2 py-0.5 text-xs text-dark-gray-7'
										>
											{topic}
										</span>
									))}
								</div>
							</td>
							<td className='px-6 py-4'>
								<div className='flex flex-wrap gap-1'>
									{problem.companies.map((company) => (
										<span
											key={company}
											className='rounded-full bg-dark-fill-3 px-2 py-0.5 text-xs text-dark-gray-7'
										>
											{company}
										</span>
									))}
								</div>
							</td>
							<td className={"px-6 py-4"}>
								{problem.videoId ? (
									<AiFillYoutube
										fontSize={"28"}
										className='cursor-pointer text-dark-gray-6 transition-colors hover:text-red-500'
										onClick={() =>
											setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })
										}
									/>
								) : (
									<p className='text-xs text-dark-gray-6'>Coming soon</p>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
			{youtubePlayer.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div
						className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
						onClick={closeModal}
					></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</div>
					</div>
				</tfoot>
			)}
		</>
	);
};
export default ProblemsTable;

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		else setSolvedProblems(getLocalSolvedProblems());
	}, [user]);

	return solvedProblems;
}
