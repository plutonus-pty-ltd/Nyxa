import { useTheme } from "next-themes";

import SEO from "../meta/SEO";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function MainLayout({ children, ...pageInfo }) {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<>
			<SEO {...pageInfo} />
			<div className="leading-normal tracking-normal text-indigo-400 dark:text-indigo-600 m-6 bg-cover bg-fixed">
				<main className="h-full">
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
