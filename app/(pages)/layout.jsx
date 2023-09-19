import {
  Josefin_Sans,
  Roboto_Mono,
  Satisfy,
  Kalam,
  Cabin,
} from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import "../styles/globals.css";
import AuthProvider from "../components/providers/AuthProvider";
import ProductsProvider from "../contexts/products";
import CartContextProvider from "@app/contexts/cartContext";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
config.autoAddCss = false;

const sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-Josefin-Sans",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-satisfy",
});
const kalam = Kalam({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-kalam",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-kalam",
});

export const metadata = {
  title: "Pulse",
  description: "Find the perfect dress for your next occasion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-100 ${sans.className} ${roboto_mono.variable} ${satisfy.variable} ${kalam.variable} ${cabin.variable}`}
      >
        <AuthProvider>
          <ProductsProvider>
            <CartContextProvider>
              <section>
                <div className="px-[4%] md:px-[10%] pb-2">
                  <Navbar />
                  <div className="pt-32 sm:pt-20 min-h-[80vh]">{children}</div>
                  <Toaster />
                </div>
              </section>
            </CartContextProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
