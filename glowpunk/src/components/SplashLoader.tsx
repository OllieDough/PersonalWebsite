// src/components/SplashLoader.tsx
import { useEffect, useState } from 'react'

type Props = {
  onFinish: () => void
}

export default function SplashLoader({ onFinish }: Props) {
  const [progress, setProgress] = useState(0)
  const [readyToClick, setReadyToClick] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setReadyToClick(true)
          return 100
        }
        return prev + 2
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (!readyToClick) return
    setFadingOut(true)
    setTimeout(onFinish, 500)
  }

  return (
    <div
      style={{
        ...styles.loader,
        opacity: fadingOut ? 0 : 1,
        cursor: readyToClick ? 'pointer' : 'default',
      }}
      onClick={handleClick}
    >
      <div style={styles.barWrapper}>
        <div style={{ ...styles.bar, width: `${progress}%` }} />
      </div>
      <p style={styles.text}>
        {readyToClick ? 'Click to enter' : `${progress}%`}
      </p>
    </div>
  )
}

const styles = {
  loader: {
    position: 'fixed' as const,
    inset: 0,
    background: 'black',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    zIndex: 9999,
    transition: 'opacity 0.5s ease',
    flexDirection: 'column' as const,
  },
  barWrapper: {
    width: 300,
    height: 10,
    background: '#444',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  bar: {
    height: '100%',
    background: 'white',
    transition: 'width 0.2s ease-out',
  },
  text: {
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
}