import { BlockchainNode as Blockchain } from "./struct/LedgerNode";
import { BlockGenerator } from "./struct/BlockGenerator";
import type { BlockEntry } from "./types/BlockGenerator.d";

const BlockchainInstance = new Blockchain();

BlockchainInstance.on("ready", () => console.log("Blockchain online."));
