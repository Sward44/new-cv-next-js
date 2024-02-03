import React from "react";
import Favicons from "../components/favicons/Favions";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Favicons />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
