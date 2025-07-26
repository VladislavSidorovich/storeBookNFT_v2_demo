"use client";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SliderItem from "./SliderItem";
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

  // Идентификаторы индексов, которые нужно отобразить
  const indicesToShow = [4];

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
      {titlesData && status === "success" ? (
        titlesData.map((el, index) => (
          <SwiperSlide key={index} className={!indicesToShow.includes(index + 1) ? 'hidden-slide' : ''}>
            <SliderItem
              id={index + 1}
              price={el?.result?.price ? el?.result?.price : BigInt(0)}
              supplyRemain={
                el.result?.supplyRemain ? Number(el?.result?.supplyRemain) : 0
              }
              uri={el?.result?.uri ? el?.result?.uri : ""}
              previewText={
                index === 3 ? "Превью" : "Превью статьи"
              }
              actionText={
                index === 3 ? "Смотреть" : "Читать статью"
              }
            />
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