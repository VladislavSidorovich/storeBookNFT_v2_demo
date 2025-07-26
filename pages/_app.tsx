import "../styles/swiper.css";
import "../styles/style.sass";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/search.sass"
import "../styles/ModalСlosedSection.sass"
import { initializeApp } from "firebase/app";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Montserrat } from "next/font/google";
import { customTheme } from "../utils/rainbowkitTheme";
import Providers from "../components/Provider";
//import Header from "../components/header/header";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { config } from "../utils/config";


const firebaseConfig = {
  apiKey: "AIzaSyAGhRmiiBkjJfjCb5SlS7E0EhqE5QhMZuc",
  authDomain: "article-79590.firebaseapp.com",
  projectId: "article-79590",
  storageBucket: "article-79590.appspot.com",
  messagingSenderId: "848397592461",
  appId: "1:848397592461:web:bda470c721d9fb0329bfc4",
  measurementId: "G-7R3V90QLF1",
};

export const app = initializeApp(firebaseConfig);

const queryClient = new QueryClient();

const monserat = Montserrat({
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic-ext", "cyrillic"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // avatar={"hidden"}
          theme={customTheme}
          locale="ru-RU"
        >
          <div className={monserat.className}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0 }}
            >
              <Providers>
                <Component {...pageProps} />
              </Providers>
              <ToastContainer />
            </motion.div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
