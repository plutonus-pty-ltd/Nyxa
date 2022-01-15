import type { User } from "../user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const emptyUser = {
	loggedIn: false,
	id: "",
	username: "",
	avatarUrl: ""
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { username, password } = await req.body;

	let user = await prisma.user.findUnique({
		where: { username }
	});

	if(!user) user = await prisma.user.findUnique({
		where: { email: username }
	});

	if(!user) return res.status(401).json(emptyUser);

	try {
		bcrypt.compare(password, user.password).then(async match => {
			if(!match) return res.status(401).json(emptyUser);

			const resp = {
				loggedIn: true,
				id: user.id,
				username: user.username,
				avatarUrl: user.avatarUrl
			} as User;

			req.session.user = resp;
			await req.session.save();
			res.json(resp);
		});
	} catch(error) {
		res.status(500).json({ message: (error as Error).message });
	}
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
