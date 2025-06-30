import "@/styles/globals.css";
// src/pages/_app.tsx
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import SplashLoader from '@/components/SplashLoader'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem('splash-loaded')
    if (seen) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashFinish = () => {
    sessionStorage.setItem('splash-loaded', 'true')
    setShowSplash(false)
  }

  return showSplash ? (
    <SplashLoader onFinish={handleSplashFinish} />
  ) : (
    <Component {...pageProps} />
  )
}