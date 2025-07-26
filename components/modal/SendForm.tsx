"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { app } from "../../pages/_app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { close, setCompleted } from "../../store/features/orderSlice";
import { MintNFt } from "../../methods/blockchain/writeContract";
import { toast } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "../toasts/toasts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import closeModalicon from '../../static/svg/closeModal.svg';
import like from '../../static/svg/like.svg';

type Inputs = {
  fio: string;
  add: string;
  email: string;
};

function SendForm() {
  const dispatch = useAppDispatch();
  const { isChecked, products } = useAppSelector((state) => state.order);
  const db = getFirestore(app);
  const { register, handleSubmit } = useForm<Inputs>();

  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState<Inputs | null>(null);

  const { data, txStatus, error, isPending, isSuccess, mintNFTWrite } = MintNFt({
    titleCounter: isChecked,
    msgValue: isChecked ? products[isChecked - 1]?.price : BigInt(0),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mintNFTWrite) {
      mintNFTWrite();
      setFormData(data);
    }
  };

  useEffect(() => {
    const addDocument = async () => {
      if (txStatus === "success" && formData) {
        try {
          const docRef = await addDoc(collection(db, "sender"), {
            fio: formData.fio,
            tel: formData.add || "",
            email: formData.email,
          });
          setIsSend(true);
          dispatch(setCompleted(isChecked as number));
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    };

    addDocument();
  }, [txStatus, formData, isChecked, dispatch, db]);

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
    }

    if (txStatus === "success") {
      toast.dismiss();
      notifySuccess("Транзакция успешно выполнена");
    }

    return () => clearTimeout(timeout);
  }, [error, isPending, isSuccess, txStatus]);

  const closeModal = () => dispatch(close());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={
        !((data && txStatus === "pending") || isPending)
          ? closeModal
          : undefined
      }
      className="modal"
      id="modal"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {isSend ? (
          <div className="modal-overlays" onClick={closeModal}>
            <div className="modals" onClick={(e) => e.stopPropagation()}>
              <div className="modals-contents">
                <button className="modals-closes" onClick={closeModal}>
                  <Image src={closeModalicon} alt="Close" />
                </button>
                <div className="modals-icons">
                  <Image src={like} alt="Like" />
                </div>
                <div className="modals-messages">
                  Покупка совершена
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-content">
            {!((data && txStatus === "pending") || isPending) && (
              <button
                onClick={closeModal}
                className="modal-close wrap"
              >
                &times;
              </button>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="fio1">Имя, Фамилия</label>
              <input type="text" {...register("fio")} required />
              <label htmlFor="phone1">Эл. почта</label>
              <input
                type="email"
                required
                className="email"
                {...register("email")}
              />
              <label htmlFor="email1">Дополнительно</label>
              <input type="text" {...register("add")} />

              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div>
                      {!connected && (
                        <button
                          className="btn btn_4"
                          onClick={openConnectModal}
                          type="button"
                        >
                          Подключить кошелек
                        </button>
                      )}
                      {chain && chain?.unsupported && (
                        <button
                          className="btn btn_4"
                          onClick={openChainModal}
                          type="button"
                        >
                          Неверная сеть
                        </button>
                      )}
                      {connected && chain && chain?.unsupported === false && (
                        <button type="submit" className="btn btn_4">
                          Продолжить
                        </button>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </form>
  {/*         <p className="policy">
              Нажимая на кнопку, Вы соглашаетесь с условиями{" "}
              <b>
                <a target="_blank" href="https://arweave.net/ZVmszxUmw-IaKSLRRwhDdMQ8fsjXod55tOCBKoqPAnE">
                  лицензионного соглашения
                </a>
              </b>
            </p>*/}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SendForm;
