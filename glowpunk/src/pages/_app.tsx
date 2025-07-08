import "@/styles/globals.css"
import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import SplashLoader from "@/components/SplashLoader"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "@fontsource/orbitron"

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem("splash-loaded")
    if (seen) setShowSplash(false)
  }, [])

  const handleSplashFinish = () => {
    sessionStorage.setItem("splash-loaded", "true")
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashLoader onFinish={handleSplashFinish} />
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}