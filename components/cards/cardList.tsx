import { useTitlesData } from "../../methods/blockchain/readContract";
import animation from "../../static/lottie/loadingAnimation.json";
import Card from "./card";
import Lottie from "lottie-react";
import styles from "./cardList.module.css";
import { motion } from "framer-motion";

const CardList = () => {
  const { data, status } = useTitlesData();

  return (
    <div className={styles.cardList}>
      {data &&
      status === "success" &&
      data[data.length - 1]?.status === "success" ? (
        data?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            className={styles["cardList__cards"]}
          >
            <Card
              titleCounter={index + 1}
              price={item.result?.price ? item.result?.price : BigInt(0)}
              supplyRemain={
                item.result?.supplyRemain
                  ? Number(item.result?.supplyRemain)
                  : 0
              }
              uri={item.result?.uri ? item.result?.uri : ""}
            />
          </motion.div>
        ))
      ) : (
        <div className={styles["cardList__loading"]}>
       {/*    <Lottie
            animationData={animation}
            className={styles["cardList__loading__animation"]}
          />*/} 
        </div>
      )}
    </div>
  );
};

export default CardList;
