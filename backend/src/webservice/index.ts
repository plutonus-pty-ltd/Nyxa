import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

import fetchRouter from "./routes/fetch";

export function start({ port, originNode }: { port: number, originNode?: boolean }) {
	const app = express();
	app.use(helmet());

	app.use("*", (req: Request, res: Response, next: NextFunction) => {
		console.log(`[ WEBSERVER ] ${req.headers["X-Real-Ip"] || req.headers["X-Forwarded-For"] || req.ip} > ${req.method} ${req.originalUrl}`);
		next();
	});

	app.get("/", (req: Request, res: Response) => {
		res.json({
			message: "Nyxa | NFTHack2022 by PlutonusDev",
			github: "https://github.com/Plutonus-Pty-Ltd/Nyxa",
			showcase: "https://showcase.ethglobal.com/nfthack2022/nyxa",
			version: require("../../package.json").version
		});
	});

	app.use(fetchRouter.endpoint, fetchRouter.router);

	app.listen(port, () => console.log(`[ WEBSERVER ] Online at 0.0.0.0:${port}`));
}
