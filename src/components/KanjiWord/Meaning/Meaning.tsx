import styles from "./meaning.module.css"

interface Props {
  meaning: KanjiWordMeaning
}

export default function Meaning({meaning}: Props) {
  const glosses = meaning.glosses.map((gloss, id) => {
    return <li key={id} className={styles.gloss}>{gloss}</li>
  })

  return (
    <ul className="overflow-auto">
      {glosses}
    </ul>
  )
}
