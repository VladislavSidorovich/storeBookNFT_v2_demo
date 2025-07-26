import styles from "./aboutNFT.module.css";

const AboutNFT = () => {
  return (
    <div className={styles.aboutNFT}>
      <span className={styles["aboutNFT__text"]}>
        NFT (от англ. Non-Fungible Token) — это уникальный токен, представляющий
        собой цифровой актив в блокчейне. Технология NFT позволяет обеспечить
        идентичность авторских статей, гарантировать их подлинность и Ваше право
        владения официально цифровой копией данной статьи.
      </span>
    </div>
  );
};

export default AboutNFT;
