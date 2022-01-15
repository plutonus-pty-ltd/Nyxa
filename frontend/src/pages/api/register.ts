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
	const { body } = req;
	let check = await prisma.user.findUnique({
		where: { email: body.email }
	});
	if(check) return res.status(400).json({ msg: "A member with that email already exists!", ...emptyUser });

	check = await prisma.user.findUnique({
		where: { username: body.username }
	});
	if(check) return res.status(400).json({ msg: "A member with that username already exists!", ...emptyUser });

	const salt = bcrypt.genSaltSync(10); // 10 iterations
	const password = bcrypt.hashSync(body.password, salt)

	const user = await prisma.user.create({
		data: {
			username: body.username,
			email: body.email,
			password,
			avatarUrl: ""
		}
	});

	const userObj = {
		loggedIn: true,
		username: user.username,
		id: user.id,
		avatarUrl: user.avatarUrl
	}

	req.session.user = userObj;
	await req.session.save();

	return res.status(200).json(userObj);
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
