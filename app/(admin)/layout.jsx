import AuthProvider from "@app/components/providers/AuthProvider";
import AdminLogo from "@app/components/admin/AdminLogo";
import Footer from "@app/components/Footer";
import Navbar from "@app/components/admin/Navbar";

//main Layout to be used in admin pages
export default function AdminLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <section>
          <div className="px-[4%] pb-2 md:px-[10%]">
            <AdminLogo />
            <Navbar />
            <div className="min-h-[80vh] pt-32 sm:pt-20">{children}</div>
            <Footer />
          </div>
        </section>
      </AuthProvider>
    </>
  );
}
