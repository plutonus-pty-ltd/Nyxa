require("dotenv").config();
import * as Crypto from "crypto";
import { KeyPair, generateNonce } from "../lib/Utils";

import type { BlockEntry, BlockData } from "../types/BlockGenerator.d";

export class BlockGenerator {
	public hash: string;
	public lastBlock: string | null;
	public data: string | {
		opCode: string,
		asset: string,
		sender_add: string;
		recipient_add?: string;
		metadata: string;
	};
	public meta: {
		encrypted: boolean;
		nonce: string;
		timestamp: number;
		signature: string | null;
	}

	constructor({ lastBlock, data }: { lastBlock?: string | null, data: BlockData }, encrypt: boolean = true) {
		// Instantiate the block's meta.
		this.meta = {
			encrypted: encrypt,
			nonce: generateNonce(32),
			timestamp: Date.now(),
			signature: null
		}

		let processing;
		this.data = JSON.stringify(data.toString()).replace(/["]+/g, "");

		// Encrypt the block
		if(encrypt) processing = Crypto.publicEncrypt(
			{
				key: KeyPair.public,
				padding: Crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: "sha256"
			},
			Buffer.from(this.data.toString())
		);

		// Sign the block
		this.meta.signature = Crypto.createSign("RSA-SHA256").update(processing || this.data).sign({
			key: KeyPair.private,
			passphrase: process.env.SECRETKEY_PASSPHRASE
		}, "base64");

		// Finalise block's data
		if(encrypt) this.data = processing?.toString("base64") || Buffer.from(data.toString(), "ascii").toString("base64");
		this.lastBlock = lastBlock || null;
		this.hash = this.computeHash().digest("hex");
	}

	computeHash(): Crypto.Hash {
		return Crypto.createHash("sha256").update(
			`${this.meta.timestamp}-${this.meta.nonce}-${this.lastBlock}-${JSON.stringify(this.data)}`
		);
	}
}
