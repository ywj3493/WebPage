import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-full min-h-[85vh] bg-slate-200">{children}</div>
      <Footer />
    </div>
  );
}
