import Crypto from "crypto";
import { EventEmitter } from "events";

import type { IBlockchain } from "../types/LedgerNode.d";
import type { BlockEntry, BlockData } from "../types/BlockGenerator.d";

export class BlockchainNode extends EventEmitter implements IBlockchain {
	public Cache: BlockEntry[] = [];

	constructor() {
		super();

		(async () => {
			this.emit("ready");
		})();
	}

	obtainLatestBlock(): BlockEntry {
		return this.Cache[this.Cache.length -1];
	}

	async generateEntry(blockData: BlockEntry): Promise<BlockEntry | null> {
		const lastBlock = this.obtainLatestBlock();
		if(blockData.meta.nonce == lastBlock?.meta.nonce) return null; // Duplicate entry or (almost impossible) entropy

		// Populate block
		blockData.lastBlock = lastBlock?.hash || null;

		this.Cache.push(blockData);
		return blockData;
	}
}
