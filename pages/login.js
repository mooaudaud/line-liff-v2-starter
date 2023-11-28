import { useState, useEffect } from "react";
import liff from "@line/liff";

const Login = (props) => {
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    await liff.init({ liffId: process.env.LIFF_ID })
    liff.getContext()
    liff.login()
  }

  return (<></>)
}

export default Login
