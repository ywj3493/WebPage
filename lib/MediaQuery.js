import { useMediaQuery } from "react-responsive";

const isMobile = useMediaQuery({
  query: "(max-width:767px)",
});

const isPC = useMediaQuery({
  query: "(min-width:768px)",
});

export { isMobile, isPC };
