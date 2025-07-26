import { readContract, readContracts } from "@wagmi/core";
import { ABI, contractAddress } from "./contractData";
import { coreConfig as config } from "../../utils/config";

export type TitleCounterCoreResult = (
  | {
      error?: undefined;
      result: bigint;
      status: "success";
    }
  | {
      error: Error;
      result?: undefined;
      status: "failure";
    }
)[];

type RawTitle = [bigint, bigint, string];

export type Title =
  | {
      supplyRemain: bigint;
      price: bigint;
      uri: string;
    }
  | undefined;

const contract = {
  address: contractAddress,
  abi: ABI,
  // chainId: 137,
};

export const getTokensOfOwner = async (address: `0x${string}` | undefined) => {
  const result = await readContract(config, {
    ...contract,
    functionName: "tokensOfOwner",
    args: [address],
  });

  return result as bigint[] | undefined;
};
export const getTokenIdTitleCounters = async (tokenIds: bigint[]) => {
  const result: TitleCounterCoreResult = await readContracts(config, {
    contracts: tokenIds.map((item) => ({
      ...contract,
      functionName: "tokenIdTitleCounters",
      args: [item],
      item,
    })),
  }).then((data) =>
    data.map((item) =>
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
  );

  return result;
};

export const getAddressNFTdataCounters = async (
  address: `0x${string}` | undefined
) => {
  const tokensOfOwner = await getTokensOfOwner(address);

  if (!tokensOfOwner || !tokensOfOwner?.length) return [];

  const data = await getTokenIdTitleCounters(tokensOfOwner);

  return data;
};

// /**
//  * Custom hook that fetches the current title counter from the contract.
//  * @returns An object containing the fetched data, fetch status, and status.
//  */
// export const getCurrentTitleCounter = async () => {
//   const result = await readContract(config, {
//     ...contract,
//     functionName: "currentTitleCounter",
//   });

//   return result as bigint | undefined;
// };

// /**
//  * Custom hook to fetch title data from a smart contract.
//  * @param titleCounter - The counter of the title.
//  * @returns An object containing the fetched title data, fetch status, and status.
//  */
// export const getTitle = async (titleCounter: number) => {
//   const result = await readContract(config, {
//     ...contract,
//     abi: ABI,
//     functionName: "titles",
//     args: [titleCounter],
//   });

//   const data: Title = result
//     ? {
//         supplyRemain: (result as RawTitle)[0],
//         price: (result as RawTitle)[1],
//         uri: (result as RawTitle)[2],
//       }
//     : undefined;

//   return data;
// };

// /**
//  * Retrieves titles from the blockchain contract.
//  *
//  * @param titleCounters - The number of title counters.
//  * @returns An object containing the retrieved data, fetch status, and status.
//  */
// export const useTitles = (titleCounters: number | bigint) => {
//   const {
//     data: rawData,
//     fetchStatus,
//     status,
//   } = useReadContracts({
//     contracts: Array.from({ length: Number(titleCounters) - 1 }, (_, i) => ({
//       ...contract,
//       functionName: "titles",
//       args: [i + 1],
//     })),
//   });

//   const data: Titles = rawData
//     ? rawData.map((item) =>
//         item.error
//           ? {
//               error: item.error,
//               result: undefined,
//               status: "failure",
//             }
//           : {
//               error: undefined,
//               result: {
//                 supplyRemain: (item.result as RawTitle)[0],
//                 price: (item.result as RawTitle)[1],
//                 uri: (item.result as RawTitle)[2],
//               },
//               status: "success",
//             }
//       )
//     : undefined;

//   return { data, fetchStatus, status };
// };

// /**
//  * Retrieves data related to titles using the `useTitles` and `useCurrentTitleCounter` hooks.
//  * @returns An object containing the data, fetch status, and status of the titles and counter.
//  */
// export const useTitlesData = () => {
//   const {
//     data: counterData,
//     fetchStatus: counterFetchStatus,
//     status: counterStatus,
//   } = useCurrentTitleCounter();

//   const { data, fetchStatus, status } = useTitles(
//     counterData ? counterData : 0
//   );

//   return {
//     data,
//     fetchStatus,
//     status,
//     counterData,
//     counterFetchStatus,
//     counterStatus,
//   };
// };
