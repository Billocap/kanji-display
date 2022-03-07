import { MutableRefObject, useRef } from "react"

type scrollData = [
  MutableRefObject<HTMLDivElement | null>,
  () => void
]

export default function useScrollSpy(): scrollData {
  const scrolled = useRef<null | HTMLDivElement>(null)

  const scrollTo = () => {
    scrolled.current?.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return [scrolled, scrollTo]
}
