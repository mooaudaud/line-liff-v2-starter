import { useState, useEffect } from "react";
import liff from "@line/liff";

const Login = (props) => {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    console.log('initPage', process.env.LIFF_ID)
    await liff.init({ liffId: process.env.LIFF_ID })
    const profile = await liff.getProfile()
    setProfile(profile)
  }

  return (
    <div>
      {JSON.stringify(profile)}
    </div>
  )
}

export default Login
