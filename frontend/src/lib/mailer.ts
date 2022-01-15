import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	port: process.env.EMAIL_PORT,
	host: process.env.EMAIL_DOMAIN,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
	secure: true
});
