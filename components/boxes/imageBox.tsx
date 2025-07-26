import { motion } from "framer-motion";
import styles from "./imageBox.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import svg from "../../static/svg/svg";
import dynamic from "next/dynamic";

// 1. Динамический импорт с защитой от SSR + fallback
const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="loading-placeholder" /> // Fallback при загрузке
  }
);

interface ImageBoxProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  onClose: () => void;
}

const ImageBox = ({ url, alt, width, height, onClose }: ImageBoxProps) => {
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 2. Гарантируем выполнение только на клиенте
  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (imageBoxRef.current && !imageBoxRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 3. Двойная защита для Lottie
  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
      className={styles.imageBox}
    >
      <div className={styles.imageBox__block} ref={imageBoxRef}>
        {!isImageLoading && (
          <Image
            src={svg.close}
            alt="close"
            onClick={onClose}
            className={styles["imageBox__block__close"]}
            priority
          />
        )}

        {/* 4. Полностью безопасный рендер Lottie */}
        {isImageLoading && isMounted && (
          <div className={styles["img_loading"]}>
         {/*    <Lottie 
              animationData={require("../../static/lottie/loadingAnimation.json")} 
              className="loading-block-animation"
            />
            */} 
          </div>
        )}

        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={styles["imageBox__block__image"]}
          onLoadingComplete={() => setIsImageLoading(false)}
          priority
        />
      </div>
    </motion.div>
  );
};

export default ImageBox;