import { useState, useEffect } from "react";

import SEO from "../meta/SEO";
import Loader from "../meta/Loader";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function MainLayout({ children, ...pageInfo }) {
	const [ mounted, setMounted ] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<SEO {...pageInfo} />
			{mounted ? (
				<div className="leading-normal tracking-normal text-gray-50 m-6" data-theme="luxury">
					<main className="h-full bg-black-alt">
						<Header />
						<div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
							{children}
						</div>
						<Footer />
					</main>
				</div>
			) : <Loader />}
		</>
	);
}
