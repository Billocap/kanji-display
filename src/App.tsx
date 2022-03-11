import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect } from "react"

import DropDown from "./components/DropDown"
import SearchBar from "./components/SearchBar"
import { AppContext } from "./contexts/AppContext"
import { ScreenContext } from "./contexts/ScreenContext"

const lists = {
  write: [
    {
      name: "all",
      label: "All"
    },
    {
      name: "joyo",
      label: "Joyo"
    },
    {
      name: "jinmeiyo",
      label: "Jinmeiyo"
    }
  ],
  grades: [
    {
      name: "grade-1",
      label: "Grade 1"
    },
    {
      name: "grade-2",
      label: "Grade 2"
    },
    {
      name: "grade-3",
      label: "Grade 3"
    },
    {
      name: "grade-4",
      label: "Grade 4"
    },
    {
      name: "grade-5",
      label: "Grade 5"
    },
    {
      name: "grade-6",
      label: "Grade 6"
    },
    {
      name: "grade-8",
      label: "Grade 8"
    }
  ]
}

export default function App() {
  const {loadCategory, loadKanji, loadReadings} = useContext(AppContext)
  const {CurrentScreen, navigate} = useContext(ScreenContext)

  useEffect(() => {
    loadCategory({
      label: "Grade 1",
      name: "grade-1"
    }).then(() => navigate("list"))
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
                navigate("kanji")
              })
              
              navigate("loading")
            }}
            searchReading={reading => {
              loadReadings(reading).then(() => {
                navigate("list")
              })
              
              navigate("loading")
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-center flex-shrink-0 h-full">
          <DropDown
            text="Lists"
            items={lists as any}
            onClick={list => {
              loadCategory(list).then(() => {
                navigate("list")
              })
              
              navigate("loading")
            }}
            />
          <a className="ml-2" href="https://github.com/Billocap/Kanji-Display" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              className="text-2xl hover:text-white text-gray-500 md:mx-4 mx-2"
              icon={faGithub}
            />
          </a>
        </div>
      </div>
      <CurrentScreen/>
    </div>
  )
}