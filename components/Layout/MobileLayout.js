import MobileNav from "../Nav/MobileNav";
import MobileFooter from "../Footer/MobileFooter";

export default function MobileLayout({ children }) {
  return (
    <div>
      <MobileNav />
      <div className="flex justify-center items-center w-full min-h-[85vh] bg-slate-200">
        {children}
      </div>
      <MobileFooter />
    </div>
  );
}
