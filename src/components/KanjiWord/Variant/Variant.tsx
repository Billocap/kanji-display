import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react"

import styles from "./variant.module.css"

interface Props {
  variant: KanjiWordVariant
}

export default function Variant({variant}: Props) {
  const Priorities = () => {
    if (!variant.priorities.length) return null
    
    const priorities = variant.priorities.map((priority, id) => {
      return <span key={id} className="mx-1">{priority}</span>
    })

    return(
      <Fragment>
        <FontAwesomeIcon className={styles.star} icon={faStar}/>
        <div className="tool-tip">{priorities}</div>
      </Fragment>
    )
  }

  return (
    <span className={["tool-tip-holder", styles.variant].join(" ")}>
      <span>{variant.pronounced}</span>
      <span onClick={e => e.preventDefault()}>
        {variant.written}
        <Priorities/>
      </span>
    </span>
  )
}
