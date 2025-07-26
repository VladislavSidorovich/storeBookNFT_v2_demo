import merge from "lodash.merge";
import { lightTheme, Theme } from "@rainbow-me/rainbowkit";

export const customTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#323232",
    modalBackground: "#fffbf1",
    accentColorForeground: "#fffbf1",
    actionButtonBorder: "#a1a1a1",
    connectButtonBackgroundError: "#fb8176",
  },

  fonts: {
    body: "'__Montserrat_a82cf9', '__Montserrat_Fallback_a82cf9'",
  },
} as Theme);
