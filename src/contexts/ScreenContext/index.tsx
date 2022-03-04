import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {createContext, useContext, useState} from "react"

import KanjiDisplay from "../../components/KanjiDisplay";
import KanjiList from "../../components/KanjiList";
import { AppContext } from "../AppContext";

interface Props {
  children: any
}

export const ScreenContext = createContext({} as any)

export default function ScreenNavigator({children}: Props) {
  const {
    kanjiList,
    kanji,
    loadKanji,
    loadReadings
  } = useContext(AppContext);
  
  const [screen, navigate] = useState(0);

  const screens = [
    <div className="overflow-y-scroll">
      {
        kanjiList.map((list: any, id: number) => {
          return <KanjiList key={id} list={list} onClick={kanji => {
            loadKanji(kanji).then(() => {
              navigate(1)
            });
            
            navigate(2)
          }}/>;
        })
      }
    </div>,
    <KanjiDisplay kanji={kanji} onClick={(reading: any) => {
        loadReadings(reading).then(() => {
          navigate(0)
        });

        navigate(2)
      }
    }/>,
    <div className="text-5xl font-bold text-red-500 flex justify-center items-center w-full h-full">
      <FontAwesomeIcon className="spinner m-2" icon={faYinYang}/>
      Please Wait
    </div>
  ];
  
  const context = {
    get CurrentScreen() {
      return screens[screen]
    },
    navigate
  }

  return (
    <ScreenContext.Provider value={context}>
      {children}
    </ScreenContext.Provider>
  )
}