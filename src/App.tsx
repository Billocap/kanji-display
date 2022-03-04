import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { toHiragana, toKatakana } from "wanakana";

import DropDown from "./components/DropDown";
import SearchBar from "./components/SearchBar";

import { AppContext } from "./contexts/AppContext";
import { ScreenContext } from "./contexts/ScreenContext";

import AppConstants from "./lib/constants";

export default function App() {
  const {
    loadList,
    loadKanji,
    loadReadings
  } = useContext(AppContext)

  const {
    CurrentScreen, navigate
  } = useContext(ScreenContext)

  useEffect(() => {
    loadList({
      label: "Grade 1",
      name: "grade-1"
    })
  }, [])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-gray-100 border border-gray-200 text-white flex justify-between items-center px-2">
        <div className="p-2 font-bold flex flex-nowrap items-center">
          <h1 className="md:inline hidden mr-4">
            Kanji Display
          </h1>
          <SearchBar
            searchKanji={kanji => {
              loadKanji(kanji).then(() => {
                navigate(1)
              });
              
              navigate(2)
            }}
            searchOnyomi={onyomi => {
              loadReadings(toKatakana(onyomi, {
                customKanaMapping: {
                  "-": "-"
                }
              })).then(() => {
                navigate(0)
              });
              
              navigate(2)
            }}
            searchKunyomi={kunyomi => {
              loadReadings(toHiragana(kunyomi, {
                customKanaMapping: {
                  "-": "-"
                }
              })).then(() => {
                navigate(0)
              });
              
              navigate(2)
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <DropDown
            text="Lists"
            onClick={list => {
              loadList(list).then(() => {
                navigate(0)
              });
              
              navigate(2)
            }}
            items={AppConstants.lists as any}
          />
          <a href="https://github.com/Billocap/Kanji-Display" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              className="text-2xl hover:text-white text-gray-500 md:mx-4 mx-2"
              icon={faGithub}
            />
          </a>
        </div>
      </div>
      {CurrentScreen}
    </div>
  )
}