import "../styles/globals.css";
import React from "react";
import { Provider } from "next-auth/client";
import { useMediaQuery } from "react-responsive";
import MobileLayout from "../components/Layout/MobileLayout";
import PCLayout from "../components/Layout/PCLayout";

function MyApp({ Component, pageProps }) {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  return (
    //cover layout with Provider=>allows use of next-auth/client session hook and functions

    <Provider session={pageProps.session}>
      {isMobile ? (
        <MobileLayout>
          <Component {...pageProps} />
        </MobileLayout>
      ) : (
        <PCLayout>
          <Component {...pageProps} />
        </PCLayout>
      )}
    </Provider>
  );
}
export const getServerSideProps = () => {
  return { props: {} };
};

export default MyApp;
