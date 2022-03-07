import styles from "./kanji-info.module.css"

interface Props {
  kanji: KanjiData
}

export default function KanjiInfo({kanji}: Props) {
  const meaning = kanji.heisig_en || kanji.meanings[0] || "-/-"

  const removeClick = (e: any) => e.preventDefault()

  return (
    <div className={styles.container}>
      <div className={styles.character}>
        <h2 onClick={removeClick}>{kanji.kanji}</h2>
        <span className="tool-tip-holder" onClick={removeClick}>
          {kanji.unicode.toUpperCase()}
          <div className="tool-tip">Unicode</div>
        </span>
      </div>
      <div className={styles.information}>
        <div>
          <h2 className="tool-tip-holder" onClick={removeClick}>
            {meaning.toUpperCase()}
            <div className="tool-tip">{meaning.toUpperCase()}</div>
          </h2>
        </div>
        <div>
          <span>STROKE COUNT: {kanji.stroke_count}</span>
          <span>GRADE: {kanji.grade || "-/-"}</span>
          <span>JLPT: {kanji.jlpt || "-/-"}</span>
        </div>
      </div>
    </div>
  )
}
