import fs from "fs";
import path from "path";
import * as Crypto from "crypto";

import type { BlockEntry } from "../types/BlockGenerator.d";

export const KeyPair = {
	public: fs.readFileSync(path.join(__dirname, "../keys/publicKey.pem")).toString("ascii"),
	private: fs.readFileSync(path.join(__dirname, "../keys/privateKey.pem")).toString("ascii")
}

export function generateNonce(length: number) {
	if(length < 5) throw new Error("Nonce must be at least 5 in length");
	if(length > 32) throw new Error("Nonce must not be more than 32 in length");

	return Crypto.randomBytes(16).toString("hex").slice(0, length);
}

