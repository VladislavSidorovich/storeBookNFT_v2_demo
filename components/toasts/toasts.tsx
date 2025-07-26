import { toast, Bounce } from "react-toastify";
import styles from "./toasts.module.css";

interface ToastProps {
  title: string;
  description: string;
}

const CustomToast = ({ title, description }: ToastProps) => (
  <div className={styles.toast}>
    <h4>{title} </h4>
    <p>{description}</p>
  </div>
);

export const notifyError = (description: string) =>
  toast.error(<CustomToast title="Ошибка" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const notifySuccess = (text: string) =>
  toast.success(text, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const notifyInfo = (text: string) =>
  toast.info(text, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
