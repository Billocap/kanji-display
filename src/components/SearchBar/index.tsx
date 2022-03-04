import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useContext, useState } from "react"
import { toHiragana, toKatakana } from "wanakana"

import { AppContext } from "../../contexts/AppContext"

import styles from "./style.module.css"

interface Props {
  searchKanji: (kanji: string) => void,
  searchOnyomi: (onyomi: string) => void,
  searchKunyomi: (kunyomi: string) => void
}

export default function SearchBar({searchKanji, searchOnyomi, searchKunyomi}: Props) {
  const [query, setQuery] = useState("")
  const [extended, setExtended] = useState(false)

  const {kanjis, cache} = useContext(AppContext)

  const previousKanjis = cache.get("previous@kanjis")

  const searchKanjiHandler = () => {
    if (kanjis.includes(query)) {
      searchKanji(query)
    } else {
      alert("Invalid Kanji!")
    }
  }

  const getClass = () => {
    return extended ? styles.open : ""
  }

  const searchOptions = () => {
    if (query.length) {
      if (kanjis.includes(query)) {
        return (
          <button onClick={searchKanjiHandler}>
            {query}
            <span>漢字</span>
          </button>
        )
      } else {
        return (
          <Fragment>
            <button onClick={() => searchOnyomi(query)}>
              {query}
              <span>
                {toKatakana(query)}
                -
                音読み
              </span>
            </button>
            <button onClick={() => searchKunyomi(query)}>
              {query}
              <span>
                {toHiragana(query)}
                -
                訓読み
              </span>
            </button>
          </Fragment>
        )
      }
    }
  }
  
  return (
    <div className={[styles.container, getClass()].join(" ")}>
      <input
        onChange={e => {
          if (previousKanjis.size || query.length) setExtended(true)
          
          setQuery(e.target.value)
        }}
        onFocus={() => {
          if (previousKanjis.size || query.length) setExtended(true)
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
        {Array.from<any>(previousKanjis.keys()).slice(0, 10).map((item, id) => {
          return (
            <button key={id} onClick={() => searchKanji(item)}>
              {item}
              <span>漢字</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
