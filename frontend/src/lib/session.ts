import type { IronSessionOptions } from "iron-session";
import type { UserInfo } from "../pages/api/user";

export const sessionOptions: IronSessionOptions = {
	password: process.env.COOKIE_PWD as string,
	cookieName: "session",
	cookieOptions: {
		secure: true
	}
}

declare module "iron-session" {
	interface IronSessionData {
		user?: User
	}
}
