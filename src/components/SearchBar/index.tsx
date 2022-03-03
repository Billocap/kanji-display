import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useState } from "react";
import { toHiragana, toKatakana } from "wanakana";

import { AppContext } from "../../contexts/AppContext";

import styles from "./style.module.css";

interface Props {
  searchKanji: (kanji: string) => void,
  searchOnyomi: (onyomi: string) => void,
  searchKunyomi: (kunyomi: string) => void
}

export default function SearchBar({searchKanji, searchOnyomi, searchKunyomi}: Props) {
  const [query, setQuery] = useState("");
  const {kanjis} = useContext(AppContext);

  const searchKanjiHandler = () => {
    if (kanjis.includes(query)) {
      searchKanji(query)
    } else {
      alert("Invalid Kanji!");
    }
  };

  const getClass = () => {
    return query.length ? styles.open : "";
  };

  const searchOptions = () => {
    if (query.length) {
      if (kanjis.includes(query)) {
        return (
          <button onClick={searchKanjiHandler}>
            {query}
            <span>漢字</span>
          </button>
        );
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
        );
      }
    }
  };
  
  return (
    <div className={[styles.container, getClass()].join(" ")}>
      <input onChange={e => setQuery(e.target.value)}/>
      <span>
        <FontAwesomeIcon icon={faSearch}/>
      </span>
      <div
        style={{
          display: query.length ? "block" : "none"
        }}
        className={styles.searchOptions}
      >
        {searchOptions()}
      </div>
    </div>
  );
}