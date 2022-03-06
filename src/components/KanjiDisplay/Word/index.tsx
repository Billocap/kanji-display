import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useMemo } from "react"

import styles from "./style.module.css"

function Variant({variant}: any) {
  const Priorities = () => {
    if (!variant.priorities.length) return null
    
    const priorities = variant.priorities.map((priority: any, id: number) => {
      return <span key={id} className="mx-1">{priority}</span>
    })

    return(
      <Fragment>
        <FontAwesomeIcon
          className="text-red-500 text-[7px] ml-1"
          icon={faStar}
        />
        <div className="tool-tip">
          {priorities}
        </div>
      </Fragment>
    )
  }

  return (
    <span className="inline-block mr-2 tool-tip-holder">
      <span className={styles.special}>
        {variant.pronounced}
      </span>
      <span className="relative text-xl block">
        {variant.written}
        <Priorities/>
      </span>
    </span>
  )
}

function Meaning({meaning}: any) {
  const glosses = meaning.glosses.map((gloss: any, id: number) => {
    return <li key={id} className={styles.gloss}>{gloss}</li>
  })

  return (
    <ul className="overflow-auto">
      {glosses}
    </ul>
  )
}

export default function Word({word}: any) {
  const variants = useMemo(
    () => word.variants.map((variant: any, id: number) => {
      return <Variant key={id} variant={variant}/>
    }),
    [word]
  )

  const meanings = useMemo(
    () => word.meanings.map((meaning: any, id: number) => {
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