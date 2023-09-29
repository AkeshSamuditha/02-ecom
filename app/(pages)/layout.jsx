import Navbar from "../components/navbar/Navbar";
import AuthProvider from "../components/providers/AuthProvider";
import ProductsProvider from "../contexts/productsContext";
import CartContextProvider from "@app/contexts/cartContext";

export const metadata = {
  title: "Pulse",
  description: "Find the perfect dress for your next occasion.",
};

export default function RootLayout({ children }) {
  return (
<>
        <AuthProvider>
          <ProductsProvider>
            <CartContextProvider>
              <section>
                <div className="px-[4%] md:px-[10%] pb-2">
                  <Navbar />
                  <div className="pt-32 sm:pt-20 min-h-[80vh]">{children}
                  </div>
                </div>
              </section>
            </CartContextProvider>
          </ProductsProvider>
        </AuthProvider>
        </>
  );
}
