import AuthModal from "@/components/AuthModal/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import Image from "next/image";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const [authModal, setAuthModalState] = useRecoilState(authModalState);
	const [user, loading] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
	}, [user, router]);

	useEffect(() => {
		setAuthModalState((prev) => (prev.isOpen ? prev : { ...prev, isOpen: true }));
	}, [setAuthModalState]);

	if (loading) return null;

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={700} height={700} />
				</div>
			</div>
			{authModal.isOpen && <AuthModal />}
		</div>
	);
};
export default AuthPage;
