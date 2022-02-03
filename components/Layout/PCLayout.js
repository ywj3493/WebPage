import PCFooter from "../Footer/PCFooter";
import PCNav from "../Nav/PCNav";

export default function PCLayout({ children }) {
  return (
    <div>
      <PCNav />
      <div className="flex justify-center items-center w-full min-h-[85vh] bg-slate-200">
        {children}
      </div>
      <PCFooter />
    </div>
  );
}
