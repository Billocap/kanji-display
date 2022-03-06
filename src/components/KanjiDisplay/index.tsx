import Word from "./Word"

import styles from "./style.module.css"
import { useRef, useState } from "react";

interface Props {
  kanji: any,
  onClick: any
}

export default function KanjiDisplay({kanji, onClick}: Props) {
  const [page, setPage] = useState(50)
  const list = useRef<null | HTMLDivElement>(null)
  const controlHeader = useRef<null | HTMLHeadingElement>(null)
  const baseHeader = useRef<null | HTMLHeadingElement>(null)

  const textFit = () => {
    const control = controlHeader.current
    const base = baseHeader.current

    if (!control || !base) return false

    return control.getBoundingClientRect().width < base.getBoundingClientRect().width
  }

  const ToolTip = () => {
    // if (!textFit()) return null

    return (
      <div className="tool-tip">
        {(kanji.data.heisig_en || kanji.data.meanings[0] || "").toUpperCase()}
      </div>
    )
  }

  const handleScroll = () => {
    const target = list.current

    if (target) {
      const rect = target.getBoundingClientRect()

      if (rect.top <= window.innerHeight - rect.height) {
        setPage(page => page + 50)
      }
    }
  }

  const SimpleList = ({list}: any) => {
    return (
      <ul>
        {
          list.map((item: any, id: number) => {
            return <li key={id}>{item}</li>;
          })
        }
      </ul>
    );
  };

  const ButtonList = ({list}: any) => {
    return (
      <ul>
        {
          list.map((item: any, id: number) => {
            return (
              <li key={id}>
                <button onClick={() => onClick(item)}>
                  {item}
                </button>
              </li>
            );
          })
        }
      </ul>
    );
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <h2 ref={controlHeader} className="opacity-0 absolute inline text-white font-bold text-7xl sm:text-8xl text-center sm:text-left">
        {(kanji.data.heisig_en || kanji.data.meanings[0] || "").toUpperCase()}
      </h2>
      <header>
        <div className={styles.character}>
          <h2>{kanji.data.kanji}</h2>
          <span>{kanji.data.unicode.toUpperCase()}</span>
        </div>
        <div className={styles.information}>
          <h2 ref={baseHeader} className="tool-tip-holder">
            {(kanji.data.heisig_en || kanji.data.meanings[0] || "").toUpperCase()}
            <ToolTip/>
          </h2>
          <div>
            <span>STROKE COUNT {kanji.data.stroke_count}</span>
            <span>GRADE {kanji.data.grade || "-/-"}</span>
            <span>JLPT {kanji.data.jlpt || "-/-"}</span>
          </div>
        </div>
      </header>
      <div className={styles.grammar}>
        <div>
          <p>Meanings</p>
          <SimpleList list={kanji.data.meanings}/>
        </div>
        <div>
          <p>Names</p>
          <ButtonList list={kanji.data.name_readings}/>
        </div>
        <div>
          <p>Onyomis</p>
          <ButtonList list={kanji.data.on_readings}/>
        </div>
        <div>
          <p>Kunyomis</p>
          <ButtonList list={kanji.data.kun_readings}/>
        </div>
      </div>
      <div ref={list} className={styles.words}>
        <p>Words</p>
        {kanji.words.slice(0, page).map((word: any, id: number) => <Word key={id} word={word}/>)}
      </div>
    </div>
  );
}