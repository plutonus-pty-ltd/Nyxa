import { useRouter } from "next/router";
import { useState } from "react";
import useUser from "../../lib/useUser";

import Link from "next/link";
import HeaderLink from "./HeaderLink";
import { IoIosArrowDropdown, IoIosFlask } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiHiveBlockchain } from "react-icons/si";

export default function Header() {
	const router = useRouter();
	const { user } = useUser();
	const [ userMenu, setUserMenu ] = useState(false);
	const [ dropMenu, setDropMenu ] = useState(false);

	return (
		<>
			<nav id="header" className="bg-gray-900 fixed h-12 w-full z-10 left-0 top-0 shadow pb-3">
				<div className="w-full h-full container mx-auto flex flex-wrap items-center mt-0 pt-3 md:pb-0">
					<div className="w-1/2 pl-4 md:pl-0">
						<Link href="/">
							<a className="text-gray-100 text-xl no-underline hover:no-underline font-bold">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Nyxa</span>
								<small><sup>BETA</sup></small>
							</a>
						</Link>
					</div>
					<div className="w-1/2 pr-0 items-center justify-end">
						<div className="flex relative inline-block float-right">
							{user && user.loggedIn && router.asPath !== "/dashboard" && (
								<Link href="/dashboard">
									<span className="mr-4 text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 py-1 px-4 rounded-md cursor-pointer font-semibold">Dashboard</span>
								</Link>
							)}
							<div className="relative text-sm text-gray-100">
								{user && user.loggedIn ? (<>
									<button onClick={() => setUserMenu(!userMenu)} className="flex items-center focus:outline-none mr-4 h-full">
										<img className="w-6 h-6 rounded-full md:mr-4" src={user.avatarUrl || "/static/images/logo-static.png"} alt="User Avatar" />
										<span className="hidden md:inline-block text-gray-100">Hi, {user.username}</span>
										<IoIosArrowDropdown className="pl-2 h-6 w-6 text-gray-100 text-xl shrink-0" />
									</button>
									<div className={`bg-gray-800 rounded shadow-md mt-2 absolute mt-12 top-8 right-2 min-w-full overflow-auto z-30 ${!userMenu && "invisible"}`}>
										<ul className="list-reset">
											<li><Link href="/account">
												<span onClick={() => setUserMenu(false)} className="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">My account</span>
											</Link></li>
											<li><Link href="/notifications">
												<span onClick={() => setUserMenu(false)} className="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">Notifications</span>
											</Link></li>
											<li><hr className="border-t mx-2 border-gray-400" /></li>
											<li><Link href="/logout">
												<span onClick={() => setUserMenu(false)} className="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">Logout</span>
											</Link></li>
										</ul>
									</div>
								</>) : (<>
									<Link href="/login">
										<span className="mr-4 py-1 px-2 rounded-md font-semibold bg-blue-500">Sign In</span>
									</Link>
									<Link href="/join">
										<span className="mr-4 py-1 px-2 rounded-md font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Join Nyxa</span>
									</Link>
								</>)}
							</div>
							{user && user.loggedIn && router.asPath === "/dashboard" && (
								<div className="block lg:hidden pr-4">
									<button onClick={() => setDropMenu(!dropMenu)} className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 hover:border-teal-500 appearance-none focus:outline-none">
										<GiHamburgerMenu className="h-3 w-3" />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				{user && user.loggedIn && router.asPath === "/dashboard" && (
					<div className={`${!dropMenu && "hidden"} w-full flex-grow lg:flex lg:items-center mt-2 lg:mt-0 bg-gray-900 z-20`}>
						<ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
							<li className="md:mx-4 my-2 md:my-0">
								<Link href="/explorer">
									<span className="mx-auto block flex flex-row space-x-2 py-1 md:py-3 px-2 md:px-4 align-middle text-blue-400 no-underline hover:text-gray-100 border-b-2 border-blue-400 hover:border-blue-400 items-center">
										<SiHiveBlockchain className="pb-1 shrink-0" />
										<span className="pb-1 md:pb-0 text-sm">Your Blocks</span>
									</span>
								</Link>
							</li>
							<li className="md:mx-4 my-2 md:my-0">
									<Link href="/whitepaper">
									<span className="mx-auto block flex flex-row space-x-2 py-1 md:py-3 px-2 md:px-4 align-middle text-blue-400 no-underline hover:text-gray-100 border-b-2 border-blue-400 hover:border-blue-400 items-center">
										<IoIosFlask className="pb-1 shrink-0" />
										<span className="pb-1 md:pb-0 text-sm">Account Settings</span>
									</span>
								</Link>
							</li>
						</ul>
					</div>
				)}
			</nav>

			{/*<div className="w-full container mx-auto">
				<div className="w-full flex items-center justify-between">
					<a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Nyxa</span>
						<small><sup>Beta</sup></small>
					</a>

					<div className="flex w-2/3 justify-end content-center space-x-4">
						<HeaderLink label="Home" href="/" />
						{ user && user.loggedIn ? (<>
							<HeaderLink label="Dashboard" href="/dashboard" />
							<HeaderLink label="Logout" href="/logout" />
						</>) : (<>
							<HeaderLink label="Join" href="/join" />
							<HeaderLink label="White Paper" href="/whitepaper" />
						</>)}
					</div>
				</div>
			</div>*/}
		</>
	);
}
