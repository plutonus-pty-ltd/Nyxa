import HeaderLink from "./HeaderLink";

export default function Header() {
	return (
		<div className="w-full container mx-auto">
			<div className="w-full flex items-center justify-between">
				<a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Nyxa</span>
					<small><sup>Beta</sup></small>
				</a>

				<div className="flex w-2/3 justify-end content-center space-x-4">
					<HeaderLink label="Home" href="/" />
					<HeaderLink label="Join" href="/join" />
					<HeaderLink label="White Paper" href="/whitepaper" />
				</div>
			</div>
		</div>
	);
}
