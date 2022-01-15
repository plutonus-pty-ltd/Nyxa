import { useRouter } from "next/router";

import Link from "next/link";

export default function HeaderLink({ label, href }) {
	const router = useRouter();

	return (
		<Link href={href}>
			<span className={`text-md ${router.asPath === href ? "text-white font-semibold" : "text-indigo-300 hover:underline"}`}>{label}</span>
		</Link>
	);
}
