"use client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  open,
  openBookIframe,
  openPreviewIframe,
} from "../store/features/orderSlice";
import cn from "classnames";
import { useEffect, useState } from "react";

type SliderItemProps = {
  id: number;
  name: string,
  price: string; // Изменено с bigint на number для простоты
  supplyRemain: number;
  uri: string;
  previewText: string;
  actionText: string;
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

function SliderItem({ id, price, name, supplyRemain, uri, previewText, actionText }: SliderItemProps) {
  const [content, setContent] = useState<IPFSData>();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.order);
  const product = products.find((el) => el.id === id);


  useEffect(() => {
    // Имитируем загрузку данных
    const loadData = async () => {
      try {
        // Замените на реальную загрузку данных, если необходимо
        const data = {
          name: "",
          image: "",
          description: "Описание...",
          author: "",
          date: "",
          fulltitle: "",
          preview: "",
          authorInfo: "",
          attributes: ["атрибут1", "атрибут2"],
        };
        
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
        <div className="nft nftNotBlockchain">
          <h3 className="nft__heading">{name}</h3>
          <p className="nft__caption"></p>
          <p className="nft__price">{price}</p>
          <p className="nft__caption">текст</p>
          <br />
          <p className="nft__heading">{content?.authorInfo}</p>
          <p className="nft__caption"></p>
          <button
            className={cn("btn", "btn_1", "btn_NotBlockchain", { active: product?.isCompleted })}
          >
            Ненаписанное,
            но обозначенное
          </button>
        
          
        </div>
      )}
    </>
  );
}

export default SliderItem;
