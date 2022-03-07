import { Fragment, useMemo } from "react";

import styles from "./drop-down-items.module.css"

interface Props {
  items: KanjiCategoryRequest[],
  onClick: (name: KanjiCategoryRequest) => void
}

export default function DropDownItems({items, onClick}: Props) {
  const listItems = useMemo(
    () => items.map(
      (item, id) => {
        const config = {
          key: id,
          className: styles.item,
          onClick: () => onClick(item)
        }

        return <button {...config}>{item.label}</button>
      }
    ),
    [items]
  )

  return (
    <Fragment>
      {listItems}
    </Fragment>
  )
}