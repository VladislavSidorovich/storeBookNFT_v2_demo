import { TitleCounters, Titles } from "../methods/blockchain/readContract";

export type TitleResult = {
  supplyRemain: bigint;
  price: bigint;
  uri: string;
};

export const convertIPFSUriToHttpUrl = (ipfsUri: string) => {
  const baseHttpUrl = "https://ipfs.io/ipfs/";

  return ipfsUri.replace("ipfs://", baseHttpUrl);
};

export const filterMultipleTitleCounters = (
  tokenIdTitleCounters: TitleCounters
) => {
  if (!tokenIdTitleCounters) return;

  const filteredTitleCounters: TitleCounters = tokenIdTitleCounters
    ? tokenIdTitleCounters.reduce((acc: TitleCounters, current) => {
        if (current.status === "success") {
          if (!acc) return;

          const exists = acc.some((item) => item?.result === current?.result);
          if (!exists) {
            acc.push(current);
          }
        }
        return acc;
      }, [] as TitleCounters)
    : undefined;

  return filteredTitleCounters;
};

export const filterMultipleTitleCountersResult = (
  tokenIdTitleCounters: TitleCounters
) => {
  if (!tokenIdTitleCounters) return;

  const filteredTitleCounters: TitleCounters =
    filterMultipleTitleCounters(tokenIdTitleCounters);

  return (filteredTitleCounters?.map((item) => Number(item?.result)) ||
    []) as number[];
};

export const filterTitlesResultPrice = (titles: Titles) => {
  if (!titles) return;

  return (titles?.map((item) => item?.result?.price) || []) as bigint[];
};

export const filterTitleResult = (titles: Titles) => {
  if (!titles) return;

  return (titles?.map((item) => item?.result) || []) as TitleResult[];
};
