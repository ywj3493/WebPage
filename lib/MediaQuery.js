import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return <>{isMobile && children}</>;
};

const PC = ({ children }) => {
  const isPC = useMediaQuery({
    query: "(min-width:768px)",
  });
  return <>{isPC && children}</>;
};

export { Mobile, PC };
