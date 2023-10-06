import {
  Josefin_Sans,
  Roboto_Mono,
  Satisfy,
  Kalam,
  Cabin,
} from "next/font/google";
import "@app/styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-Josefin-Sans",
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-satisfy",
});
export const kalam = Kalam({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-kalam",
});

export const cabin = Cabin({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cabin",
});
