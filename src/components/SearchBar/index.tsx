import { useRef } from "react";

import styles from "./style.module.css";

interface Props {
  searchKanji: (kanji: string) => void,
  searchOnyomi: (onyomi: string) => void,
  searchKunyomi: (kunyomi: string) => void
}

export default function SearchBar({searchKanji, searchOnyomi, searchKunyomi}: Props) {
  const searchBar = useRef("");
  
  return (
    <div className={styles.container}>
      <input onChange={e => searchBar.current = e.target.value}/>
      <button onClick={_ => searchKanji(searchBar.current)}>漢字</button>
      <button onClick={_ => searchOnyomi(searchBar.current)}>音</button>
      <button onClick={_ => searchKunyomi(searchBar.current)}>訓</button>
    </div>
  );
}