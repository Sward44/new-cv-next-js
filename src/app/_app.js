import React from "react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import Favicons from "../components/favicons/Favions";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Favicons />
      <Component {...pageProps} />
      {/* <SpeedInsights />*/}
    </>
  );
}

export default MyApp;
