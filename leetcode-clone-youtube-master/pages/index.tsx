import ProblemsTable, { ALL_FILTER, ProblemFilters } from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { problemsMeta } from "@/mockdata/problemsMeta";

import { useMemo, useState } from "react";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function Home() {
	const [filters, setFilters] = useState<ProblemFilters>({
		company: ALL_FILTER,
		difficulty: ALL_FILTER,
		topic: ALL_FILTER,
	});
	const hasMounted = useHasMounted();

	const companies = useMemo(
		() => Array.from(new Set(problemsMeta.flatMap((problem) => problem.companies))).sort(),
		[]
	);
	const topics = useMemo(
		() => Array.from(new Set(problemsMeta.flatMap((problem) => problem.topics))).sort(),
		[]
	);

	const visibleCount = useMemo(
		() =>
			problemsMeta.filter(
				(problem) =>
					(filters.company === ALL_FILTER || problem.companies.includes(filters.company)) &&
					(filters.difficulty === ALL_FILTER || problem.difficulty === filters.difficulty) &&
					(filters.topic === ALL_FILTER || problem.topics.includes(filters.topic))
			).length,
		[filters]
	);

	const hasActiveFilters =
		filters.company !== ALL_FILTER || filters.difficulty !== ALL_FILTER || filters.topic !== ALL_FILTER;

	const resetFilters = () => setFilters({ company: ALL_FILTER, difficulty: ALL_FILTER, topic: ALL_FILTER });

	if (!hasMounted) return null;

	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />

				<div className='px-6 pt-12 pb-8 text-center'>
					<h1 className='text-3xl font-semibold tracking-tight text-white'>
						&ldquo;Quality over quantity&rdquo; <span className='align-middle'>👇</span>
					</h1>
					<p className='mt-2 text-sm text-dark-gray-6'>
						{problemsMeta.length} hand-written problems, video walkthroughs, and an in-browser judge.
					</p>
				</div>

				<div className='flex flex-wrap items-center justify-center gap-3 mx-auto px-6 pb-4 max-w-[1200px]'>
					<FilterSelect
						label='Company'
						value={filters.company}
						options={companies}
						onChange={(value) => setFilters((prev) => ({ ...prev, company: value }))}
					/>
					<FilterSelect
						label='Level'
						value={filters.difficulty}
						options={DIFFICULTIES}
						onChange={(value) => setFilters((prev) => ({ ...prev, difficulty: value }))}
					/>
					<FilterSelect
						label='Topic'
						value={filters.topic}
						options={topics}
						onChange={(value) => setFilters((prev) => ({ ...prev, topic: value }))}
					/>
					{hasActiveFilters && (
						<button
							onClick={resetFilters}
							className='text-sm text-dark-gray-7 transition-colors hover:text-white underline underline-offset-2'
						>
							Reset filters
						</button>
					)}
				</div>

				<p className='text-center text-xs text-dark-gray-6 pb-4'>
					Showing {visibleCount} of {problemsMeta.length} problems
				</p>

				<div className='relative overflow-x-auto mx-auto px-6 pb-16'>
					<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-11/12 w-full max-w-[1200px] mx-auto'>
						<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b border-dark-divider-border-2'>
							<tr>
								<th scope='col' className='px-1 py-3 w-0 font-medium'>
									Status
								</th>
								<th scope='col' className='px-6 py-3 w-0 font-medium'>
									Title
								</th>
								<th scope='col' className='px-6 py-3 w-0 font-medium'>
									Difficulty
								</th>

								<th scope='col' className='px-6 py-3 w-0 font-medium'>
									Topics
								</th>
								<th scope='col' className='px-6 py-3 font-medium'>
									Companies
								</th>
								<th scope='col' className='px-6 py-3 w-0 font-medium'>
									Solution
								</th>
							</tr>
						</thead>
						<ProblemsTable filters={filters} />
					</table>
				</div>
			</main>
		</>
	);
}

type FilterSelectProps = {
	label: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
};

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => {
	return (
		<label className='flex items-center gap-2 text-sm text-dark-gray-7'>
			{label}
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='bg-dark-fill-3 text-white text-sm rounded px-2 py-1.5 outline-none cursor-pointer border border-transparent transition-colors hover:bg-dark-fill-2 focus:border-brand-orange'
			>
				<option value={ALL_FILTER}>All</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};
