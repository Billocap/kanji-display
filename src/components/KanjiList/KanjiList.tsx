import styles from "./kanji-list.module.css"

interface Props {
  list: {
    label: string,
    items: string[]
  },
  onClick: (kanji: string) => void
}

export default function KanjiList({list, onClick}: Props) {
  const kanjiList = list.items.map((kanji, id) => {
    return (
      <li key={id}>
        <button onClick={() => onClick(kanji)}>
          {kanji}
        </button>
      </li>
    )
  })

  return (
    <div  className={styles.container}>
      <header>
        <p>{list.label}</p>
        <span>{list.items.length} results</span>
      </header>
      <ul>
        {kanjiList}
      </ul>
    </div>
  )
}
