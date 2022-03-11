import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useContext, useState } from "react"
import { isHiragana, toHiragana, toKatakana, toRomaji } from "wanakana"

import { AppContext } from "../../contexts/AppContext"

import styles from "./search-bar.module.css"

interface Props {
  searchKanji: (kanji: string) => void,
  searchReading: (reading: string) => void
}

interface ReadingOptionProps {
  reading: string,
  type: string,
  searchReading: (reading: string) => void
}

function ReadingOption({reading, type, searchReading}: ReadingOptionProps) {
  return (
    <button onClick={() => searchReading(reading)}>
      {toRomaji(reading)}
      <span>{reading} - {type}</span>
    </button>
  )
}

interface KanjiOptionProps {
  kanji: string,
  searchKanji: (kanji: string) => void
}

function KanjiOption({kanji, searchKanji}: KanjiOptionProps) {
  return (
    <button onClick={() => searchKanji(kanji)}>
      {kanji}
      <span>漢字</span>
    </button>
  )
}

export default function SearchBar({searchKanji, searchReading}: Props) {
  const [query, setQuery] = useState("")
  const [extended, setExtended] = useState(false)

  const {cache} = useContext(AppContext)

  const previousKanjis: string[] = cache.get("kanjis")
  const previousReadings: string[] = cache.get("readings")

  const getClass = () => {
    return extended ? styles.open : ""
  }

  const searchOptions = () => {
    if (query.length) {
      if (query.match(/[^A-Za-z.-]+/)) {
        return <KanjiOption kanji={query} searchKanji={searchKanji}/>
      } else {
        return (
          <Fragment>
            <ReadingOption
              reading={toKatakana(query)}
              type="音読み"
              searchReading={searchReading}
            />
            <ReadingOption
              reading={toHiragana(query)}
              type="訓読み"
              searchReading={searchReading}
            />
          </Fragment>
        )
      }
    }
  }
  
  return (
    <div className={[styles.container, getClass()].join(" ")}>
      <input
        onChange={e => {
          if (previousReadings.length || previousKanjis.length || query.length) setExtended(true)
          
          setQuery(e.target.value)
        }}
        onFocus={() => {
          if (previousReadings.length || previousKanjis.length || query.length) setExtended(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setExtended(false)
          }, 100)
        }}
      />
      <span>
        <FontAwesomeIcon icon={faSearch}/>
      </span>
      <div
        style={{
          display: extended ? "block" : "none"
        }}
        className={styles.searchOptions}
      >
        {searchOptions()}
        {previousKanjis.map((item, id) => {
          return <KanjiOption
            key={id}
            kanji={item}
            searchKanji={searchKanji}
          />
        })}
        {previousReadings.map((item, id) => {
          return <ReadingOption
            key={id}
            reading={item}
            type={isHiragana(item) ? "訓読み" : "音読み"}
            searchReading={searchReading}
          />
        })}
      </div>
    </div>
  )
}
