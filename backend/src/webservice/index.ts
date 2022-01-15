import fs from "fs";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";

import fetchRouter from "./routes/fetch";

export function start({ port, originNode }: { port: number, originNode?: boolean }) {
	const app = express();
	app.use(helmet());
	app.use(cors({ origin: true }));

	app.use("*", (req: Request, res: Response, next: NextFunction) => {
		console.log(`[ WEBSERVER ] ${req.headers["X-Real-Ip"] || req.headers["X-Forwarded-For"] || req.ip} > ${req.method} ${req.originalUrl}`);
		next();
	});

	app.post("/", (req: Request, res: Response) => {
		console.log(req.headers);
		res.send({});
	});

	app.get("/", (req: Request, res: Response) => {
		res.json({
			message: "Nyxa | NFTHack2022 by PlutonusDev",
			github: "https://github.com/Plutonus-Pty-Ltd/Nyxa",
			showcase: "https://showcase.ethglobal.com/nfthack2022/nyxa",
			version: require("../../package.json").version
		});
	});

	app.get("/contract/:name", (req: Request, res: Response) => {
		try {
			if(path.basename(path.dirname(path.join(__dirname, "../contracts/", req.params.name))) !== "contracts") return res.status(403).json({ err: true, message: "Unauthorized" });
			res.json(JSON.parse(fs.readFileSync(path.join(__dirname, "../contracts/", `${req.params.name}.json`)).toString()));
		} catch(e) {
			console.error(e);
			res.status(500).json({ err: true, message: "Something went wrong!" });
		}
	});

	app.use(fetchRouter.endpoint, fetchRouter.router);

	app.listen(port, () => console.log(`[ WEBSERVER ] Online at 0.0.0.0:${port}`));
}
