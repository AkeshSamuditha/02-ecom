import "@app/styles/globals.css";
import AuthProvider from "@app/components/providers/AuthProvider";
import AdminLogo from "@app/components/admin/AdminLogo";
import Footer from "@app/components/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Nav from "@app/components/admin/Nav";
config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <AuthProvider>
          <section>
            <div className="px-[4%] md:px-[10%] pb-2">
              <AdminLogo />
              <Nav />
              <div className="pt-32 sm:pt-20 min-h-[80vh]">{children}</div>
              <Footer />
            </div>
          </section>
        </AuthProvider>
      </body>
    </html>
  );
}
