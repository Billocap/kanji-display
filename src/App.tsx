import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useRef, useState } from "react";
import { toHiragana, toKatakana } from "wanakana";

import DropDown from "./components/DropDown";
import KanjiList from "./components/KanjiList";
import KanjiDisplay from "./components/KanjiDisplay";

import api from "./lib/api";

const kanjiLists: any = {
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
};

export default function App() {
  const [kanjiList, setKanjiList] = useState([{
    label: "",
    items: []
  }]);
  const [kanji, setKanji] = useState<any>({
    meanings: [""],
    on_readings: [""],
    name_readings: [""],
    kun_readings: [""],
    stroke_count: 8,
    unicode: "",
    grade: 1,
    jlpt: ""
  });
  const [screen, navigate] = useState(0);

  const searchBar = useRef<any>(null);

  const screens = [
    <div className="overflow-y-scroll">
      {
        kanjiList.map((list, id) => {
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
    <KanjiDisplay kanji={kanji}/>,
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

  useEffect(() => {
    loadList({
      label: "Grade 1",
      name: "grade-1"
    });

    api.kanji("斡").then(setKanji);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-gray-100 border border-gray-200 text-white flex justify-between items-center px-2">
        <div className="p-2 font-bold flex flex-nowrap items-center">
          <h1 className="md:inline hidden mr-4">
            Kanji Display
          </h1>
          <div className="search-bar">
            <input ref={searchBar}/>
            <button
              onClick={() => {
                const reading = searchBar.current;

                if (reading) {
                  api.kanji(reading.value).then(response => {
                    console.log(response, reading.value);
                    setKanji(response);

                    navigate(1);
                  });
                  
                  navigate(2);
                }
              }}
            >漢字</button>
            <button
              onClick={() => {
                const reading = searchBar.current;

                if (reading) {
                  api.readings(toHiragana(reading.value)).then(response => {
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
                }
              }}
            >音</button>
            <button
              onClick={() => {
                const reading = searchBar.current;

                if (reading) {
                  api.readings(toKatakana(reading.value)).then(response => {
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
                }
              }}
            >訓</button>
          </div>
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