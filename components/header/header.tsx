import Image from "next/image";
import styles from "./header.module.css";
import logo from "../../static/png/MMACC.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CustomConnectButton from "../CustomConnectButton";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <div className={styles["header__container__left"]}>
          <Image
            src={logo}
            alt={"logo"}
            className={styles.header__container__left__image}
          ></Image>
          <div className={styles["header__container__left__text"]}>
            <div className={styles["header__container__left__text__head"]}>
              <h1>Международная методологическая ассоциация</h1>
              <h1>(MMACC)</h1>
              <h3>Цифровое издательство</h3>
            </div>
            <p
              className={
                styles["header__container__left__text__head__description"]
              }
            >
              Здесь Вы можете приобрести авторские статьи группы Сергея Попова в
              цифровом формате NFT
            </p>
          </div>
        </div>
        <div className={styles["header__container__right"]}>
          <CustomConnectButton />
          <a
            href="/"
            target="_blank"
            className={styles["header__container__right__box"]}
          >
            <p>Библиотека</p>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
