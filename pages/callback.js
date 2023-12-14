import { useState, useEffect } from "react";
import liff from "@line/liff";

const Callback = (props) => {
  const [params, setParams] = useState('')
  const [profile, setProfile] = useState({})
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    await liff.init({ liffId: process.env.LIFF_ID })
    liff.login()
    const profile = await liff.getProfile()
    setProfile(profile)
    setParams(window.location.search)
    liff.openWindow()
  }

  return <div>
    <p>{params}</p>
  <p>{JSON.stringify(profile)}</p>
  </div>;
}

export default Callback
