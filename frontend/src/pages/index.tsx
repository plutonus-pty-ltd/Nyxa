import Layout from "../comp/layouts";
import Link from "next/link";

export default function Index() {
	return (
		<Layout title="Welcome!">
			<style global jsx>{`
				body {
					background: url("/static/images/header.png");
				}
			`}</style>

			<div className="flex flex-col w-full justify-center lg:items-start overflow-y-hidden md:mx-16">
				<img className="block md:hidden mb-8 w-full mx-auto object-scale-down" src="/static/images/logo.gif" />
				<div className="flex flex-row items-center mb-16 lg:mb-8">
					<div className="w-full lg:w-1/2">
						<h1 className="my-4 text-3xl md:text-3xl text-white opacity-75 font-bold leading-tight text-center">
							The{" "}
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
								Future{" "}
							</span>
							of Investing
						</h1>
						<p className="leading-normal text-white md:text-xl mb-8 text-center">
							Nyxa is a distributed electronic ledger designed to hold and process the creation and trading of securities holdings.
						</p>
						<div className="flex flex-row space-x-8 justify-center w-full">
							<Link href="/whitepaper">
								<span className="cursor-pointer mt-4 py-4 font-semibold text-lg w-40 text-center bg-green-500 rounded-md text-white">White Paper</span>
							</Link>
							<Link href="/join">
								<span className="cursor-pointer mt-4 py-4 font-semibold text-lg w-40 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-md text-white">Join Nyxa</span>
							</Link>
						</div>
					</div>

					<div className="hidden lg:block w-full w-1/2 p-12 overflow-hidden">
						<img className="mx-auto w-3/5 transform -rotate-6 transition hover:scale-105 duration 700 ease-in-out hover:rotate-6" src="/static/images/logo.gif" />
					</div>
				</div>

				<div className="mx-auto md:pt-16">
					<p className="text-white text-lg font-bold pb-8 lg:pb-6 text-center">
						Get Nyxa on the go!
					</p>
					<div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
						<img className="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" src="/static/images/appstore.svg" />
						<img className="h-12 transform hover:scale-125 duration-300 ease-in-out" src="/static/images/playstore.svg" />
					</div>
				</div>
			</div>
		</Layout>
	);
}
