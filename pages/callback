import { useState, useEffect } from "react";
import liff from "@line/liff";

const Callback = (props) => {
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    await liff.init({ liffId: process.env.LIFF_ID })
    liff.getContext()
    liff.login()
  }

  const params = new URLSearchParams(window.location.search);
  return <p>{JSON.stringify(params)}</p>;
}

export default Callback
