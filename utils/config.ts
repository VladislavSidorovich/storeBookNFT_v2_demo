import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import * as wallet from "@rainbow-me/rainbowkit/wallets";
import { http, createConfig } from "wagmi";
import {
  createConfig as createConfigCore,
  http as httpCore,
} from "@wagmi/core";

const projectId = String("e72d14a5fb360f017c6b06b34506f00b");

const connectors = connectorsForWallets(
  [
    {
      groupName: "Кошельки для приложения",
      wallets: [
        wallet.okxWallet,
        wallet.metaMaskWallet,
        wallet.walletConnectWallet,
        wallet.trustWallet,
        wallet.phantomWallet,
        wallet.coinbaseWallet,
        wallet.ledgerWallet,
        wallet.rainbowWallet,
        wallet.injectedWallet,
      ],
    },
  ],
  {
    appName: "NFT Sale",
    projectId: projectId,
  }
);

export const coreConfig = createConfigCore({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});

export const config = createConfig({
  connectors,
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  ssr: true,
});
