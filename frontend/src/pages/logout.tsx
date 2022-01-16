import { useEffect } from "react";
import { useRouter } from "next/router";

import Loader from "../comp/meta/Loader";

export default function Logout() {
	const router = useRouter();

	useEffect(async () => {
		fetch("/api/logout").then(() => router.push("/"));
	}, []);

	return <Loader message="Deauthorizing your browser..." />;
}
