import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";

const wait = require("util").promisify(setTimeout);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	await req.session.destroy();

	wait(3000).then(() => {
		res.json({
			loggedIn: false,
			id: "",
			username: "",
			avatarUrl: ""
		});
	});
	return;
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
