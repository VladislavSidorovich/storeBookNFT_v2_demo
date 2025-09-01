import { useState } from "react";
import style from "./instruction.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import svg from "../../static/svg/svg";
const slideVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const Instruction = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={style.instruction}>
      <a onClick={() => setShow(!show)} className={style["instruction__text"]}>
        <motion.div
          animate={{ rotate: show ? 90 : 0 }}
          transition={{ duration: 0.07 }}
        >
          &#9658;
        </motion.div>

        <u>Ранее не сталкивались с криптовалютой?</u>
      </a>
      {show && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={slideVariants}
          transition={{ duration: 0.1 }}
          className={style.instruction__details}
        >
          <span>Для покупки NFT Вам необходимо:</span>
          <ol type="a">
            <li>
              <a href="https://drive.google.com/file/d/16xO1Lr_km13KWJcZIEFw6oPCz4-vwKuF/view?usp=sharing" target="_blank">
                Создать криптокошелек OKX
                <Image
                  src={svg.click}
                  alt="click"
                  className={style["instruction__details__img"]}
                />
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1tLNxvJ7wyvRGpprjeqvGJEOl7c1Vwsw2/view?usp=sharing" target="_blank">
                Приобрести криптовалюту на кошелек
                <Image
                  src={svg.click}
                  alt="click"
                  className={style["instruction__details__img"]}
                />
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/138TzHvksewxeKLv1uroNgK5mcn6OWnsa/view?usp=sharing" target="_blank">
                Создать NFT нужной Вам статьи на данном сайте
                <Image
                  src={svg.click}
                  alt="click"
                  className={style["instruction__details__img"]}
                />
              </a>
            </li>
          </ol>
        </motion.div>
      )}
    </div>
  );
};

export default Instruction;
