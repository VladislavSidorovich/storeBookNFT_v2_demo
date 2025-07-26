import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SliderItem from "./SliderItem";
import SliderItemNotBlockchainMMACCReports from "./SliderItemNotBlockchainMMACCReports";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { Titles, useTitlesData } from "../methods/blockchain/readContract";
import { getAddressNFTdataCounters } from "../methods/blockchain/readContractCore";
import {
  setProducts,
  setCompletedIds,
  setAllProductsToNotCompleted,
} from "../store/features/orderSlice";
import { useAppDispatch } from "../store/hooks";
import { useAccount } from "wagmi";
import {
  filterMultipleTitleCountersResult,
  filterTitleResult,
} from "../utils/converter";
import Lottie from "lottie-react";
import animation from "../static/lottie/loadingAnimation.json";

interface BlockchainData {
  error?: undefined;
  result: any;
  status: "success";
}

interface StaticData {
  id: number;
  name: string;
  price: string;
  supplyRemain: number;
  uri: string;
  previewText: string;
  actionText: string;
  authorInfo: string;
}

type CombinedData = BlockchainData | StaticData;

function Index() {
  const [firstTitlesDataReceived, setFirstTitlesDataReceived] = useState(false);
  const [newTitlesData, setNewTitlesData] = useState<Titles>();

  const { address } = useAccount();
  const { data: titlesData, status } = useTitlesData();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const func = async (address: `0x${string}`) => {
      getAddressNFTdataCounters(address).then((data) => {
        if (data?.length) {
          const filteredData = filterMultipleTitleCountersResult(data);
          if (filteredData) {
            setTimeout(() => {
              dispatch(setCompletedIds(filteredData));
            }, 1000);
          } else {
            dispatch(setAllProductsToNotCompleted());
          }
        } else {
          dispatch(setAllProductsToNotCompleted());
        }
      });
    };

    if (address) {
      func(address);
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (titlesData && titlesData?.length && !firstTitlesDataReceived) {
      setNewTitlesData(titlesData);
      setFirstTitlesDataReceived(true);
      console.log(titlesData.length);
      console.log(titlesData);
    }
  }, [titlesData, firstTitlesDataReceived]);

  useEffect(() => {
    if (titlesData && titlesData?.length) {
      const result = filterTitleResult(titlesData);

      if (result) dispatch(setProducts(result));
    }
    console.log(newTitlesData);
  }, [dispatch, newTitlesData]);

  // Пример статических данных
  const staticData: StaticData[] = [
    {
      id: 1,
      name: "Обустройство как эманация Духа",
      price: "",
      supplyRemain: 10,
      uri: "uri1",
      authorInfo: "С.В Попов",
      previewText: "Превью статьи 1",
      actionText: "Читать статью 1",
    },
  ];

  // Объединение данных из блокчейна и статических данных
  const combinedData: CombinedData[] = useMemo(() => {
    const successfulBlockchainData = titlesData?.filter(
      (data): data is BlockchainData => 'result' in data && data.status === "success"
    ) || [];

    // Переворачиваем порядок элементов, учитывая только данные из блокчейна
    const reversedBlockchainData = successfulBlockchainData.reverse();

    // Обновляем id на обратный порядок только для данных из блокчейна
    reversedBlockchainData.forEach((el, index) => {
      el.result.id = reversedBlockchainData.length - index;
    });

    // Возвращаем только данные из блокчейна и добавляем статические данные без изменений
    return [...reversedBlockchainData, ...staticData];
  }, [titlesData, staticData]);

  useEffect(() => {
    if (combinedData) {
      combinedData.forEach((el) => {
        const previewUri = "result" in el ? el.result.uri : el.uri;
      });
    }
  }, [combinedData]);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      navigation
      pagination={{ clickable: true }}
      className="custom-swiper"
    >
      {combinedData && status === "success" ? (
        combinedData.map((el, index) => (
          <SwiperSlide
            key={index}
            className={index === 0 || index === 1 ||index === 2 || index === 3 || index === 5 || index === 4 || index === 7 || index === 6 || index === 8 || index === 10 || index === 11 || index === 12 || index === 13 || index === 14 || index === 15 ? "hidden-slide" : ""}
          >
            {"result" in el ? (
              <SliderItem
                id={el.result.id}
                price={el.result.price ? el.result.price : BigInt(0)}
                supplyRemain={
                  el.result.supplyRemain ? Number(el.result.supplyRemain) : 0
                }
                uri={el.result.uri ? el.result.uri : ""}
                previewText={index === 2 ? "Превью" : "Превью"}
                actionText={index === 2 ? "Смотреть" : "Читать статью"}
              />
            ) : (
              <SliderItemNotBlockchainMMACCReports
                id={el.id}
                name={el.name}
                price={el.price}
                supplyRemain={el.supplyRemain}
                uri={el.uri}
                previewText={el.previewText}
                actionText={el.actionText}
              />
            )}
          </SwiperSlide>
        ))
      ) : (
        <div className="loading-block">
          {/* <Lottie animationData={animation} className={"loading-block-animation"} />*/} 
        </div>
      )}
    </Swiper>
  );
}

export default Index;
