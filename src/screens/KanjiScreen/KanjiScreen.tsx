import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useRef, useState } from "react"

import useScrollSpy from "../../hooks/useScrollSpy"
import { AppContext } from "../../contexts/AppContext"
import { ScreenContext } from "../../contexts/ScreenContext"
import GrammarList from "../../components/GrammarList"
import KanjiInfo from "../../components/KanjiInfo"
import KanjiWord from "../../components/KanjiWord"

import styles from "./kanji-screen.module.css"

export default function KanjiScreen() {
  const [page, setPage] = useState(50)
  const loaded = useRef<null | HTMLDivElement>(null)
  const [scrolled, backToTop] = useScrollSpy()

  const {kanji, loadReadings} = useContext(AppContext)
  const {navigate} = useContext(ScreenContext)

  const loadOnScroll = () => {
    const target = loaded.current

    if (target) {
      const rect = target.getBoundingClientRect()

      if (rect.top <= window.innerHeight - rect.height) {
        setPage(page => page + 50)
      }
    }
  }

  const clickHandler = (reading: string) => {
    loadReadings(reading).then(() => {
      navigate("list")
    })

    navigate("loading")
  }

  return (
    <div ref={scrolled} className={styles.container} onScroll={loadOnScroll}>
      <KanjiInfo kanji={kanji.data}/>
      <div className={styles.grammar}>
        <GrammarList
          title="Meanings"
          list={kanji.data.meanings}
          render={({item}) => <span>{item}</span>}
        />
        <GrammarList
          title="Names"
          list={kanji.data.name_readings}
          render={({item}) => {
            return <button onClick={() => clickHandler(item)}>{item}</button>
          }}
        />
        <GrammarList
          title="Onyomis"
          list={kanji.data.on_readings}
          render={({item}) => {
            return <button onClick={() => clickHandler(item)}>{item}</button>
          }}
        />
        <GrammarList
          title="Kunyomis"
          list={kanji.data.kun_readings}
          render={({item}) => {
            return <button onClick={() => clickHandler(item)}>{item}</button>
          }}
        />
      </div>
      <div ref={loaded} className={styles.words}>
        <p>Words</p>
        {kanji.words.slice(0, page).map((word: any, id: number) => {
          return <KanjiWord key={id} word={word}/>
        })}
      </div>
      <button onClick={() => backToTop()} className="scroll-spy">
        <FontAwesomeIcon icon={faChevronUp}/>
      </button>
    </div>
  )
}
