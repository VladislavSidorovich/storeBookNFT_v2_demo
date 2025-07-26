import ABIjson from "./ABI.json";
import { Abi } from "viem";

type FetchStatus = "fetching" | "paused" | "idle";
type Status = "error" | "success" | "pending";

const contractAddress: `0x${string}` =
  "0x7d08e18145e6F1092D77a00492C63bfa3B680e54";

const ABI: Abi = ABIjson as Abi;

export { ABI, contractAddress, type FetchStatus, type Status };
