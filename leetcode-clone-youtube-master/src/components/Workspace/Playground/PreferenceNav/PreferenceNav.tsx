import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { BsChevronDown, BsCheckLg } from "react-icons/bs";
import { EditorLanguage, ISettings, LANGUAGE_LABELS } from "../Playground";
import SettingsModal from "@/components/Modals/SettingsModal";
import useLocalStorage from "@/hooks/useLocalStorage";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const LANGUAGE_OPTIONS: EditorLanguage[] = ["javascript", "python", "java", "cpp"];

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
	const [, setStoredLanguage] = useLocalStorage("lcc-language", "javascript");

	const handleLanguageChange = (lang: EditorLanguage) => {
		setStoredLanguage(lang);
		setSettings({ ...settings, language: lang });
		setLanguageMenuOpen(false);
	};

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full '>
			<div className='relative flex items-center text-white'>
				<button
					onClick={() => setLanguageMenuOpen((prev) => !prev)}
					className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium'
				>
					<div className='flex items-center px-1'>
						<div className='text-xs text-label-2 dark:text-dark-label-2'>{LANGUAGE_LABELS[settings.language]}</div>
						<BsChevronDown className='ml-1' />
					</div>
				</button>
				{languageMenuOpen && (
					<ul className='absolute mt-1 top-full left-0 rounded-lg p-2 z-50 shadow-lg bg-dark-layer-1 w-32'>
						{LANGUAGE_OPTIONS.map((lang) => (
							<li
								key={lang}
								onClick={() => handleLanguageChange(lang)}
								className='flex h-8 cursor-pointer items-center px-2 hover:bg-dark-fill-3 rounded-lg text-xs'
							>
								{LANGUAGE_LABELS[lang]}
								{settings.language === lang && <BsCheckLg className='ml-auto text-dark-blue-s' />}
							</li>
						))}
					</ul>
				)}
			</div>

			<div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
			{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
		</div>
	);
};
export default PreferenceNav;
