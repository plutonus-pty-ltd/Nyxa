import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
	loggedIn: boolean,
	id: string,
	username: string,
	avatarUrl: string
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if(req.session.user) {
		res.json({
			loggedIn: true,
			...req.session.user
		});
	} else {
		res.json({
			loggedIn: false,
			string: "",
			username: "",
			avatarUrl: ""
		});
	}
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
