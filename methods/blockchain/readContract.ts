import { useReadContract, useReadContracts } from "wagmi";
import { ABI, contractAddress } from "./contractData";

type RawTitle = [bigint, bigint, string];

export type Title =
  | {
      supplyRemain: bigint;
      price: bigint;
      uri: string;
    }
  | undefined;

export type Titles =
  | (
      | {
          error?: undefined;
          result: Title;
          status: "success";
        }
      | {
          error: Error;
          result?: undefined;
          status: "failure";
        }
    )[]
  | undefined;

export type TitleCounter = bigint | undefined;

export type TitleCounters =
  | (
      | {
          error?: undefined;
          result: TitleCounter;
          status: "success";
        }
      | {
          error: Error;
          result?: undefined;
          status: "failure";
        }
    )[]
  | undefined;

const contract = {
  address: contractAddress,
  abi: ABI,
  chainId: 137,
};

export const useTokensOfOwner = (address: `0x${string}` | undefined) => {
  const { data, fetchStatus, status } = useReadContract({
    ...contract,
    functionName: "tokensOfOwner",
    args: [address],
  });

  return { data: data as bigint[] | undefined, fetchStatus, status };
};

export const useTokenIdTitleCounter = (tokenId: bigint) => {
  const { data, fetchStatus, status } = useReadContract({
    ...contract,
    functionName: "tokenIdTitleCounters",
    args: [tokenId],
  });

  return { data: data as bigint | undefined, fetchStatus, status };
};

export const useTokenIdTitleCounters = (tokenIds: bigint[]) => {
  const {
    data: rawData,
    fetchStatus,
    status,
  } = useReadContracts({
    contracts: tokenIds.map((item) => ({
      ...contract,
      functionName: "tokenIdTitleCounters",
      args: [item],
      item,
    })),
  });

  const data: TitleCounters = rawData
    ? rawData.map((item) =>
        item.error
          ? {
              error: item.error,
              result: undefined,
              status: "failure",
            }
          : {
              error: undefined,
              result: item.result as bigint,
              status: "success",
            }
      )
    : undefined;

  return { data, fetchStatus, status };
};

export const useAddressNFTdataCounters = (
  address: `0x${string}` | undefined
) => {
  const {
    data: tokensData,
    fetchStatus: tokensFetchStatus,
    status: tokensStatus,
  } = useTokensOfOwner(address);

  const { data, fetchStatus, status } = useTokenIdTitleCounters(
    tokensData ? tokensData : []
  );

  return {
    data,
    fetchStatus,
    status,
    tokensData,
    tokensFetchStatus,
    tokensStatus,
  };
};

/**
 * Custom hook that fetches the current title counter from the contract.
 * @returns An object containing the fetched data, fetch status, and status.
 */
export const useCurrentTitleCounter = () => {
  const { data, fetchStatus, status } = useReadContract({
    ...contract,
    functionName: "currentTitleCounter",
  });

  return { data: data as bigint | undefined, fetchStatus, status };
};

/**
 * Custom hook to fetch title data from a smart contract.
 * @param titleCounter - The counter of the title.
 * @returns An object containing the fetched title data, fetch status, and status.
 */
export const useTitle = (titleCounter: number) => {
  const {
    data: rawData,
    fetchStatus,
    status,
  } = useReadContract({
    ...contract,
    abi: ABI,
    functionName: "titles",
    args: [titleCounter],
  });

  const data: Title = rawData
    ? {
        supplyRemain: (rawData as RawTitle)[0],
        price: (rawData as RawTitle)[1],
        uri: (rawData as RawTitle)[2],
      }
    : undefined;

  return { data, fetchStatus, status };
};

/**
 * Retrieves titles from the blockchain contract.
 *
 * @param titleCounters - The number of title counters.
 * @returns An object containing the retrieved data, fetch status, and status.
 */
export const useTitles = (titleCounters: number | bigint) => {
  const {
    data: rawData,
    fetchStatus,
    status,
  } = useReadContracts({
    contracts: Array.from({ length: Number(titleCounters) - 1 }, (_, i) => ({
      ...contract,
      functionName: "titles",
      args: [i + 1],
    })),
  });

  const data: Titles = rawData
    ? rawData.map((item) =>
        item.error
          ? {
              error: item.error,
              result: undefined,
              status: "failure",
            }
          : {
              error: undefined,
              result: {
                supplyRemain: (item.result as RawTitle)[0],
                price: (item.result as RawTitle)[1],
                uri: (item.result as RawTitle)[2],
              },
              status: "success",
            }
      )
    : undefined;

  return { data, fetchStatus, status };
};

/**
 * Retrieves data related to titles using the `useTitles` and `useCurrentTitleCounter` hooks.
 * @returns An object containing the data, fetch status, and status of the titles and counter.
 */
export const useTitlesData = () => {
  const {
    data: counterData,
    fetchStatus: counterFetchStatus,
    status: counterStatus,
  } = useCurrentTitleCounter();

  const { data, fetchStatus, status } = useTitles(
    counterData ? counterData : 0
  );

  return {
    data,
    fetchStatus,
    status,
    counterData,
    counterFetchStatus,
    counterStatus,
  };
};
