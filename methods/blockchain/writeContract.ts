import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ABI, contractAddress } from "./contractData";

interface BuyPlanProps {
  titleCounter: number | null;
  msgValue: bigint | undefined;
}

export const MintNFt = ({ titleCounter, msgValue }: BuyPlanProps) => {
  const config = {
    address: contractAddress,
    abi: ABI,
    functionName: "mint",
    args: [titleCounter],
    value: msgValue ? msgValue : BigInt(0),
  };

  const {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    writeContract: mintNFT,
  } = useWriteContract();

  const { status: txStatus } = useWaitForTransactionReceipt({
    hash: data,
  });

  const mintNFTWrite = async () => {
    mintNFT(config);
  };

  return {
    txStatus,
    error,
    data,
    isPending,
    isSuccess,
    isError,
    mintNFTWrite,
  };
};
