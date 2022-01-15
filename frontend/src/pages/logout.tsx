import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../comp/layouts";

export default function Logout() {
	const router = useRouter();

	useEffect(async () => {
		fetch("/api/logout").then(() => router.push("/"));
	}, []);

	return (
		<Layout title="Logging out...">
			<p className="animate-pulse">Deauthorizing your browser...</p>
		</Layout>
	);
}
