import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { toHiragana, toKatakana } from "wanakana";

import DropDown from "./components/DropDown";
import KanjiList from "./components/KanjiList";
import KanjiDisplay from "./components/KanjiDisplay";
import SearchBar from "./components/SearchBar";

import { AppContext } from "./contexts/AppContext";

import { defaultKanji, kanjiLists } from "./lib/constants";
import api from "./lib/api";

export default function App() {
  const {kanjiList, setKanjiList} = useContext(AppContext);

  const [kanji, setKanji] = useState<any>(defaultKanji);
  const [screen, navigate] = useState(1);

  const screens = [
    <div className="overflow-y-scroll">
      {
        kanjiList.map((list: any, id: number) => {
          return <KanjiList key={id} list={list} onClick={kanji => {
            api.kanji(kanji).then(response => {
              setKanji(response);
  
              navigate(1);
            });
  
            navigate(2);
          }}/>;
        })
      }
    </div>,
    <KanjiDisplay
      kanji={kanji}
      onClick={
        (reading: string) => {
          loadReadings(reading);
        }
      }
    />,
    <div className="text-5xl font-bold text-red-500 flex justify-center items-center w-full h-full">
      Please Wait
    </div>
  ];

  const loadList = (list: KanjiListObject) => {
    api.list(list.name).then(items => {
      setKanjiList([{
        label: list.label,
        items
      }]);

      navigate(0);
    });

    navigate(2);
  };

  const loadReadings = (reading: string) => {
    api.readings(reading).then(response => {
      setKanjiList([
        {
          label: `Kanjis for ${response.reading}`,
          items: response.main_kanji
        },
        {
          label: `Name kanjis for ${response.reading}`,
          items: response.name_kanji
        }
      ]);

      navigate(0);
    });

    navigate(2);
  };

  const loadKanji = (kanji: string) => {
    api.kanji(kanji).then(response => {
      setKanji(response);

      navigate(1);
    });
    
    navigate(2);
  };

  useEffect(() => {
    // loadList({
    //   label: "Grade 1",
    //   name: "grade-1"
    // });

    api.kanji("雨").then(setKanji);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-gray-100 border border-gray-200 text-white flex justify-between items-center px-2">
        <div className="p-2 font-bold flex flex-nowrap items-center">
          <h1 className="md:inline hidden mr-4">
            Kanji Display
          </h1>
          <SearchBar
            searchKanji={loadKanji}
            searchOnyomi={onyomi => loadReadings(toKatakana(onyomi, {
              customKanaMapping: {
                "-": "-"
              }
            }))}
            searchKunyomi={kunyomi => loadReadings(toHiragana(kunyomi, {
              customKanaMapping: {
                "-": "-"
              }
            }))}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <DropDown
            text="Lists"
            onClick={loadList}
            items={kanjiLists}
          />
          <a href="https://github.com/Billocap/Kanji-Display" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              className="text-2xl hover:text-white text-gray-500 md:mx-4 mx-2"
              icon={faGithub}
            />
          </a>
        </div>
      </div>
      {screens[screen]}
    </div>
  )
}