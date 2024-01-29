import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface Props {
  text: string
}

export const TextAnimation = ({ text }: Props) => {
  const textRef = useRef(null)

  useEffect(() => {
    const elements = textRef.current.children
    gsap.fromTo(
      elements,
      { opacity: 0, scale: 4 },
      { opacity: 1, scale: 1, stagger: 0.07, duration: 1, ease: 'expo.out' }
    )
  }, [])

  const splitTextIntoSpans = (text) => {
    return text.split('').map((char, index) =>
      char.trim() ? (
        <span key={index} className="inline-block">
          {char}
        </span>
      ) : (
        <span key={index}>{char}</span>
      )
    )
  }

  return (
    <h1 ref={textRef} className="block text-1xl whitespace-nowrap font-bold">
      {splitTextIntoSpans(text)}
    </h1>
  )
}
