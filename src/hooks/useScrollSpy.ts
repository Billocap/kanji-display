import { MutableRefObject, useRef } from "react"

type ScrollData = [
  /**
   * The component to be scrolled.
   */
  MutableRefObject<HTMLDivElement | null>,
  /**
   * Triggers the scrolling behavior.
   * @param top y coordinate to scroll to.
   */
  (y?: number) => void
]

/**
 * A scroll spy is a component that scrolls another element to a desired
 * coordinate when triggered.
 * 
 * This hook returns an array where:
 * - The first element is a ref to the component to be scrolled
 * - The second one is a function that triggers the scrolling behavior
 * 
 * @returns [scrolled, scrollTo]
 */
export default function useScrollSpy(): ScrollData {
  const scrolled = useRef<null | HTMLDivElement>(null)

  const scrollTo = (y: number = 0) => {
    scrolled.current?.scrollTo({
      top: y,
      behavior: "smooth"
    })
  }

  return [scrolled, scrollTo]
}
