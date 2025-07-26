import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeBookIframe } from "../../store/features/orderSlice";
import { useEffect, useState } from "react";
import { fetchIPFSData } from "../../methods/api/fetchIPSF";
import { IPFSData } from "../SliderItem";

function BookIframe() {
  const dispatch = useAppDispatch();
  const { isChecked, products } = useAppSelector((state) => state.order);

  const [content, setContent] = useState<IPFSData>();

  const uri = products[(isChecked as number) - 1]?.uri;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => dispatch(closeBookIframe())}
      className="modal"
      id="modal"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content full"
        style={{ height: "100%" }}
      >
        <button
          onClick={() => dispatch(closeBookIframe())}
          className="modal-close wrap"
        >
          &times;
        </button>
        {content && (
          <iframe
            title="book"
            src={content?.fulltitle}
            width="100%"
            height="100%"
            allowFullScreen
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default BookIframe;
