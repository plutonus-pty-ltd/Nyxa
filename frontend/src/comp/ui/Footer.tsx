import Link from "next/link";

export default function Footer() {
	return (
		<div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
			<Link href="https://github.com/PlutonusDev">
				<span className="text-gray-500 no-underline hover:no-underline">PlutonusDev 2022</span>
			</Link>
		</div>
	);
}
