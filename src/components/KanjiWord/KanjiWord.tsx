import { useMemo } from "react"

import Variant from "./Variant"
import Meaning from "./Meaning"

interface Props {
  word: KanjiWord
}

export default function KanjiWord({word}: Props) {
  const variants = useMemo(
    () => word.variants.map((variant, id) => {
      return <Variant key={id} variant={variant}/>
    }),
    [word]
  )

  const meanings = useMemo(
    () => word.meanings.map((meaning, id) => {
      return <Meaning key={id} meaning={meaning}/>
    }),
    [word]
  )
  
  return (
    <div className="my-2">
      {variants}
      {meanings}
    </div>
  )
}
