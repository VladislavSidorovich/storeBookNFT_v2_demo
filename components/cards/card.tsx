import { formatUnits } from "viem";
import styles from "./card.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchIPFSData } from "../../methods/api/fetchIPSF";
import { convertIPFSUriToHttpUrl } from "../../utils/converter";
import Image from "next/image";
import { motion } from "framer-motion";
import svg from "../../static/svg/svg";
import ImageBox from "../boxes/imageBox";
import { MintNFt } from "../../methods/blockchain/writeContract";
import { toast } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "../toasts/toasts";
import Lottie from "lottie-react";
import animation from "../../static/lottie/loadingAnimation.json";

interface CardProps {
  titleCounter: number;
  price: bigint;
  supplyRemain: number;
  uri: string;
}

type IPFSData = {
  name: string;
  image: string;
  description: string;
  author: string;
  authorInfo: string;
  date: string;
  fulltitle: string;
  preview: string;
  attributes: string[];
};

const Card = ({ titleCounter, price, supplyRemain, uri }: CardProps) => {
  const [content, setContent] = useState<IPFSData>();
  const [imageURL, setImageURL] = useState<string>();
  const [scrollY, setScrollY] = useState(72);
  const [isVisable, setIsVisable] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const { txStatus, error, isPending, isSuccess, mintNFTWrite } = MintNFt({
    titleCounter,
    msgValue: price,
  });

  const containerRef = useRef(null);

  const handleMint = () => {
    mintNFTWrite?.();
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current as HTMLElement;
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      setScrollY(scrollTop + height / 2);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const message = error.message.includes("User rejected")
        ? "Транзакция отклонена"
        : error.message.includes("The total cost")
        ? "Недостаточно средств на балансе"
        : error.message.includes("Connector not connected")
        ? "Требуется подключение кошелька"
        : error.message.includes("no more tokens left")
        ? "Все NFT распроданы"
        : error.message.includes("unknown error")
        ? "Неизвестная ошибка"
        : error.message;

      toast.dismiss();
      notifyError(message);
      return;
    }

    const timeout = setTimeout(() => {
      if (isPending) {
        toast.dismiss();
        notifyInfo("Требуется подтверждение транзакции");
      }
    }, 500);

    if (isSuccess && txStatus !== "success") {
      toast.dismiss();
      notifySuccess("Транзакция успешно подписана");
      setWarningVisible(false);
    }

    if (txStatus === "success") {
      toast.dismiss();
      notifySuccess("Транзакция успешно выполнена");
    }

    return () => clearTimeout(timeout);
  }, [error, isPending, isSuccess, txStatus]);

  useEffect(() => {
    const container = containerRef.current as HTMLElement | null;
    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIPFSData(uri);
        const imgURL = convertIPFSUriToHttpUrl(data.image);

        setContent(data);
        setImageURL(imgURL);
      } catch (error) {
        setContent(undefined);
      }
    };

    loadData();
  }, [uri]);

  return (
    <>
      {isVisable && imageURL && (
        <ImageBox
          url={imageURL}
          alt="NFT"
          width={900}
          height={900}
          onClose={() => setIsVisable(false)}
        />
      )}
      <div className={styles.card}>
        <div className={styles["card__body"]}>
          <div className={styles["card__body__text"]}>
            <h1>«{content ? content?.name : "Название"}»</h1>
            <h3>
              Автор: {content ? content?.author : "ФИО"}
              <br />
              {content ? content?.date : "Дата"}
            </h3>
            <p>
              Оставшееся количество: {supplyRemain}
              <br />
              <u>Стоимость: {formatUnits(price, 18)} ETH</u>
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisable(true)}
            ref={containerRef}
            className={styles["card__body__img_block"]}
          >
            {!isImageLoading ? (
              <Image
                src={svg.loupe}
                alt="increase"
                className={styles["increase_img"]}
                width={35}
                style={{ top: `${scrollY}px` }}
              />
            ) : (
              <div
                className={styles["img_loading"]}
              >
            {/*     <Lottie animationData={animation} />*/}
              </div>
            )}
            {imageURL && (
              <Image
                src={imageURL}
                alt="NFT"
                className={styles["card__body__img_block__image"]}
                width={700}
                height={1000}
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            )}
          </motion.div>
          <div className={styles["card__body__button"]}>
            <button
              className={styles["card__body__button"]}
              onClick={
                warningVisible ? handleMint : () => setWarningVisible(true)
              }
            >
              {supplyRemain
                ? warningVisible
                  ? "Продолжить"
                  : "Создать и приобрести статью в формате NFT"
                : "Все NFT распроданы"}
            </button>
            {warningVisible && (
              <a href="https://arweave.net/ZVmszxUmw-IaKSLRRwhDdMQ8fsjXod55tOCBKoqPAnE" target="_blank">
                *Покупая NFT, вы соглашаетесь с условиями{" "}
                <u>лицензионного соглашения</u>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
