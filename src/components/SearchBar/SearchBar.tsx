import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useContext, useState } from "react"
import { isHiragana, toHiragana, toKatakana } from "wanakana"

import { AppContext } from "../../contexts/AppContext"

import styles from "./search-bar.module.css"

interface Props {
  searchKanji: (kanji: string) => void,
  searchOnyomi: (onyomi: string) => void,
  searchKunyomi: (kunyomi: string) => void
}

export default function SearchBar({searchKanji, searchOnyomi, searchKunyomi}: Props) {
  const [query, setQuery] = useState("")
  const [extended, setExtended] = useState(false)

  const {kanjis, cache} = useContext(AppContext)

  const previousKanjis = cache.get("kanjis")
  const previousReadings = cache.get("readings")

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
          if (previousReadings.size || previousKanjis.size || query.length) setExtended(true)
          
          setQuery(e.target.value)
        }}
        onFocus={() => {
          if (previousReadings.size || previousKanjis.size || query.length) setExtended(true)
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
        {Array.from<any>(previousKanjis.keys()).map((item, id) => {
          return (
            <button key={id} onClick={() => searchKanji(item)}>
              {item}
              <span>漢字</span>
            </button>
          )
        })}
        {Array.from<any>(previousReadings.keys()).map((item, id) => {
          return (
            <button key={id} onClick={() => {
              if (isHiragana(item)) {
                searchKunyomi(item)
              } else {
                searchOnyomi(item)
              }
            }}>
              {item}
              <span>
                {item}
                -
                {isHiragana(item) ? "訓読み" : "音読み"}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
