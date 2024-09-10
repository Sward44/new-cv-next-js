import React from "react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
import Favicons from "../components/favicons/Favions";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Favicons />
      <Component {...pageProps} />
      {/* <SpeedInsights />
      <Analytics /> */}
    </>
  );
}

export default MyApp;
