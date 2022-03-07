import { useMemo } from "react"

import styles from "./grammar-list.module.css"

interface Props {
  title: string,
  list: string[],
  render: (props: {item: string}) => JSX.Element
}

export default function GrammarList({title, list, render: ListItem}: Props) {
  const items = useMemo(
    () => list.map((item, id) => {
      return (
        <li key={id}>
          <ListItem item={item}/>
        </li>
      )
    }), [list]
  )

  return (
    <div className={styles.container}>
      <p>{title}</p>
      <ul>
        {items}
      </ul>
    </div>
  )
}
