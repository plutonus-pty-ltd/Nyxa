import { BlockchainNode } from "./struct/LedgerNode";
import { BlockGenerator } from "./struct/BlockGenerator";
import * as WebServer from "./webservice";

import type { BlockEntry } from "./types/BlockGenerator.d";

const BlockchainInstance = new BlockchainNode();

BlockchainInstance.on("ready", () => {
	console.log("Blockchain online.\n")

	console.log(BlockchainInstance.Cache);
	console.log();

	WebServer.start({
		port: 8002,
		originNode: process.env.IS_ORIGIN ? true : false
	});
});
