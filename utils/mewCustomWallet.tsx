import { Wallet, getWalletConnectConnector } from "@rainbow-me/rainbowkit";

export interface MyWalletOptions {
  projectId: string;
}
export const mewCustomWallet = ({ projectId, walletConnectParameters }: MyWalletOptions | any): Wallet => ({
  id: "mew",
  name: "MEW wallet",
  iconUrl: async () =>
    "https://www.myetherwallet.com/mew-landing-page/assets/static/mewwallet-logo.7f48106f.svg",
  iconBackground: "#fff",
  //   installed: hasInjectedProvider({ flag: "isMEWwallet" }),
  downloadUrls: {
    android:
      "https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow",
    ios: "https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow",
    mobile: "https://mewwallet.com",
    qrCode: "https://mewwallet.com",
  },
  qrCode: {
    getUri: (uri) => uri,
    instructions: {
      learnMoreUrl: "https://mewwallet.com",
      steps: [
        {
          description: "wallet_connectors.mew.qr_code.step1.description",
          step: "install",
          title: "wallet_connectors.mew.qr_code.step1.title",
        },
        {
          description: "wallet_connectors.mew.qr_code.step2.description",
          step: "create",
          title: "wallet_connectors.mew.qr_code.step2.title",
        },
        {
          description: "wallet_connectors.mew.qr_code.step3.description",
          step: "scan",
          title: "wallet_connectors.mew.qr_code.step3.title",
        },
      ],
    },
  },
  mobile: {
    getUri: (uri: string) => uri,
  },
  createConnector: getWalletConnectConnector({ projectId, walletConnectParameters }),
});
