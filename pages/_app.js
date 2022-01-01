import { Layout } from "../components/Layout";
import "../styles/globals.css";
import React from "react";
import { Provider } from "next-auth/client";
function MyApp({ Component, pageProps }) {
  return (
    //cover layout with Provider=>allows use of next-auth/client session hook and functions
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
