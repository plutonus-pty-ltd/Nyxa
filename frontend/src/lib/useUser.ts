import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { User } from "../pages/api/user";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
	const { data: user, mutate: mutateUser } = useSWR<User>("/api/user", fetcher);

	useEffect(() => {
		if(!redirectTo || !user) return;

		if(
			(redirectTo && !redirectIfFound && !user?.loggedIn) ||
			(redirectIfFound && user?.loggedIn)
		) {
			Router.push(redirectTo);
		}
	}, [ user, redirectIfFound, redirectTo ]);

	return { user, mutateUser }
}
