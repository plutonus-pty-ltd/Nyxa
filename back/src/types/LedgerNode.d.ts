import type { BlockEntry } from "../BlockGenerator.d";

declare type IBlockchain = {
	Cache: BlockEntry[];
	obtainLatestBlock: () => BlockEntry;
	generateEntry: (blockData: BlockEntry) => Promise<BlockEntry | null>;
}

export {
	IBlockchain
}
