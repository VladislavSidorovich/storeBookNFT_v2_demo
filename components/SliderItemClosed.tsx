"use client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  open,
  openBookIframe,
  openPreviewIframe,
} from "../store/features/orderSlice";
import cn from "classnames";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";
import { fetchIPFSData } from "../methods/api/fetchIPSF";

type SliderItemProps = {
  id: number;
  price: bigint;
  supplyRemain: number;
  uri: string;
  previewText: string;
  actionText: string;
  isAuthorized: boolean; // Новый проп
};

export type IPFSData = {
  name: string;
  image: string;
  description: string;
  author: string;
  date: string;
  fulltitle: string;
  preview: string;
  authorInfo: string;
  attributes: string[];
};

function SliderItem({ id, price, supplyRemain, uri, previewText, actionText, isAuthorized }: SliderItemProps) {
  const [content, setContent] = useState<IPFSData>();

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.order);
  const product = products.find((el) => el.id === id);

  const redirectToArticle = () => {
    window.open(content?.fulltitle, "_blank");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIPFSData(uri);

        setContent(data);
      } catch (error) {
        setContent(undefined);
      }
    };

    loadData();
  }, [uri]);

  return (
    <>
      {content && (
        <div className="nft">
          <h3 className="nft__heading">{content?.name}</h3>
          <p className="nft__heading">{content?.authorInfo}</p>
          <p className="nft__caption">Стоимость:</p>
          <p className="nft__price">{formatUnits(price, 18)} POL <span className="nft__priceMATIC">(ex. MATIC)</span></p>

          <br />
          <p className="nft__caption">Оставшееся количество: {supplyRemain}</p>
          <p className="nft__time">{content?.date}</p>
          <button
            onClick={() => dispatch(openPreviewIframe(id))}
            className={cn("btn", "btn_1", {
              active: product?.isCompleted,
              "btn_margin-bottom": !isAuthorized, // Добавляем класс, если кнопка "Приобрести NFT" не отображается
            })}
          >
            {previewText}
          </button>
          {isAuthorized && ( // Отображение кнопки только при авторизации
            <button
              onClick={() => dispatch(open(id))}
              className={cn("btn", "btn_2", { active: product?.isCompleted })}
            >
              Приобрести NFT
            </button>
          )}
          {product?.isCompleted && (
            <button
              onClick={() => dispatch(openBookIframe(id))}
              className={cn("btn", "btn_3", { active: product?.isCompleted })}
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default SliderItem;