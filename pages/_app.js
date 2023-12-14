import "../styles/globals.css";
import "../styles/custom.css";
import { useState, useEffect } from "react";
import liff from "@line/liff";
import { useRouter } from 'next/router'
import { isEmpty } from "lodash"


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(async () => {
    try {
      console.log('open _app')
      console.log("start liff.init()...");
      await liff.init({ liffId: process.env.LIFF_ID })
      setLiffObject(liff);
    } catch (error) {
      console.log(`liff.init() failed: ${error}`);
      if (!process.env.LIFF_ID) {
        console.info(
          "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
        );
      }
      setLiffError(error.toString());
    }
  }, [])

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
