import { Toaster } from "react-hot-toast";
import { sans, roboto_mono, satisfy, kalam, cabin } from "@app/styles/fonts";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-100 ${sans.className} ${roboto_mono.variable} ${satisfy.variable} ${kalam.variable} ${cabin.variable}`}>
        <section>
          <div>

            {children}
            <Toaster />
          </div>
        </section>

      </body>
    </html>
  );
}
