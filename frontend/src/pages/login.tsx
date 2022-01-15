import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../lib/useUser";
import * as Yup from "yup";

import Layout from "../comp/layouts";
import Link from "next/link";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function Login() {
	const user = useUser();
	const [ successMsg, setSuccessMsg ] = useState("");
	const [ failMsg, setFailMsg ] = useState("");
	const router = useRouter();

	useEffect(() => {
		if(user && user.loggedIn) router.push("/dashboard");
	}, [user, router]);

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required("Username or email is required"),
		password: Yup.string()
			.required("Password is required")
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	async function onSubmit(data) {
		setSuccessMsg("");
		setFailMsg("");

		const user = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}).then(resp => resp.json());

		if(user.loggedIn) {
			setSuccessMsg(`Logged in as ${user.username}!`);
			setTimeout(() => router.push("/dashboard"), 1000);
		} else {
			setFailMsg("You supplied bad credentials.");
		}
	}

	return (
		<Layout title="Sign In">
			<div className="w-full xl:max-w-screen-sm">
				<div className="py-6 flex justify-center lg:justify-start lg:px-12">
					<div className="cursor-pointer flex items-center space-x-2">
						<img className="w-1/3 mx-auto" src="/static/images/logo.gif" />
					</div>
				</div>
				<div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
					<h2 className="text-center text-4xl font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
						Sign In
					</h2>
					<div className={`mt-12 alert alert-success ${successMsg ? "block" : "hidden"}`}>
						<div className="flex flex-row space-x-4 p-2 rounded-md bg-green-500 text-white items-center">
							<AiOutlineCheckCircle className="shrink-0" />
							<span>{successMsg}</span>
						</div>
					</div>
					<div className={`mt-12 alert alert-error ${failMsg ? "block" : "hidden"}`}>
						<div className="flex flex-row space-x-4 py-2 px-2 rounded-md bg-red-500 text-white items-center">
							<AiOutlineCloseCircle className="shrink-0" />
							<span>{failMsg}</span>
						</div>
					</div>
					<div className="mt-12">
						<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
							<div className="form-control">
								<label htmlFor="username" className="label">
									<span className="label-text">Email Address or Username</span>
								</label>
								<input type="text" {...register("username")} className={`w-full text-lg input ${errors.username && "input-error"}`} placeholder="you@email.com" />
								<div className="h-6 text-red-500">{errors.username?.message}</div>
							</div>
							<div className="form-control">
								<div className="flex justify-between items-center">
									<label htmlFor="password" className="label">
										<span className="label-text">Password</span>
									</label>
									<Link href="/resetpassword">
										<span className="text-indigo-600 dark:text-indigo-400 font-display font-semibold text-xs hover:text-indigo-800 dark:hover:text-indigo-600 cursor-pointer">
											Forgot Password?
										</span>
									</Link>
								</div>
								<input type="password" {...register("password")} className={`w-full text-lg input ${errors.password && "input-error"}`} />
								<div className="h-6 text-red-500">{errors.password?.message}</div>
							</div>
							<div className="form-control mt-8 w-full flex">
								<button type="submit" className="rounded-lg py-2 text-md mx-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 font-semibold text-white w-40">Sign In</button>
							</div>
						</form>
						<div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
							Don't have an account?{" "}
							<Link href="/join">
								<span className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600">Sign up</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
