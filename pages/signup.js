import { useState, useEffect } from "react";
import liff from "@line/liff";

const Login = (props) => {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    await liff.init({ liffId: process.env.LIFF_ID })
    setProfile(liff.getContext())
  }

  return (<div>
    {JSON.stringify(profile)}
  </div>)
}

export default Login
