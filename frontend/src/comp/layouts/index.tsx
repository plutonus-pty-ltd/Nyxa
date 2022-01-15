import { useTheme } from "next-themes";

import SEO from "../meta/SEO";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function MainLayout({ children, ...pageInfo }) {
	const { resolvedTheme, setTheme } = useTheme(); // Might use this, might not

	return (
		<>
			<SEO {...pageInfo} />
			<div className="leading-normal tracking-normal text-gray-900 dark:text-gray-50 m-6">
				<main className="h-full bg-black-alt">
					<Header />
					<div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
						{children}
					</div>
					<Footer />
				</main>
			</div>
		</>
	);
}
