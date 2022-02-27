import styles from "./style.module.css";

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
    );
  });

  return (
    <section className={styles.container}>
      <header>
        <h2>{list.label}</h2>
        <span>{list.items.length} results</span>
      </header>
      <ul>
        {kanjiList}
      </ul>
    </section>
  );
}