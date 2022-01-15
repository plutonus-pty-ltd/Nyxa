import { Hash } from "crypto";

declare type BlockData = string | {
	opCode: string;
	asset?: string | null;
	sender_add: string;
	recipient_add?: string;
	metadata: string;
}

declare type BlockEntry = {
	hash: string,
	lastBlock: string | null,
	data: BlockData;
	meta: {
		encrypted: boolean;
		nonce: string;
		timestamp: number,
		signature: string | null;
	}
	computeHash: () => Hash;
}

export {
	BlockData,
	BlockEntry
}
