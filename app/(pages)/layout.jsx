import { Josefin_Sans } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import "../styles/globals.css";
import AuthProvider from "../components/providers/AuthProvider";
import ProductsProvider from "../contexts/products";
import CartContextProvider from "@app/contexts/cartContext";
const sans = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "dress",
  description: "Find the perfect dress for your next occasion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-slate-100 ${sans.variable}`}>
        <AuthProvider>
          <ProductsProvider>
            <CartContextProvider>
              <section>
                <div className="px-[4%] md:px-[10%] pb-2">
                  <Navbar />
                  <div className="pt-32 sm:pt-20 min-h-[80vh]">{children}</div>
                </div>
              </section>
            </CartContextProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
