import React from "react";
import { BsChevronUp } from "react-icons/bs";

type EditorFooterProps = {
	handleRun: () => void;
	handleSubmit: () => void;
	isRunning?: boolean;
	isSubmitting?: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleRun, handleSubmit, isRunning, isSubmitting }) => {
	return (
		<div className='flex bg-dark-layer-1 absolute bottom-0 z-10 w-full border-t border-dark-divider-border-2'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-colors inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						disabled={isRunning}
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-colors focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleRun}
					>
						{isRunning ? "Running..." : "Run"}
					</button>
					<button
						disabled={isSubmitting}
						className='px-3 py-1.5 font-medium items-center transition-opacity focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:opacity-90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleSubmit}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
