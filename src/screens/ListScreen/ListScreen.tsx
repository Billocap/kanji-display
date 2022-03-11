import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"

import useScrollSpy from "../../hooks/useScrollSpy"
import KanjiList from "../../components/KanjiList"
import { AppContext } from "../../contexts/AppContext"
import { ScreenContext } from "../../contexts/ScreenContext"

export default function ListScreen() {
  const [scrolled, backToTop] = useScrollSpy()

  const {kanjiList, loadKanji} = useContext(AppContext)
  const {navigate} = useContext(ScreenContext)

  return (
    <div ref={scrolled} className="overflow-y-scroll">
      {
        kanjiList.map((list: any, id: number) => {
          return <KanjiList key={id} list={list} onClick={kanji => {
            loadKanji(kanji).then(() => {
              navigate("kanji")
            })
            
            navigate("loading")
          }}/>
        })
      }
      <button onClick={() => backToTop()} className="scroll-spy">
        <FontAwesomeIcon icon={faChevronUp}/>
      </button>
    </div>
  )
}
