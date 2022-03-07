import {createContext, useEffect, useReducer} from "react"

import api from "../../services/api"
import SessionCache from "../../lib/SessionCache"

import defaultContext from "./default"
import reducer from "./reducer"

interface Props {
  children: any
}

const sessionCache = new SessionCache()

export const AppContext = createContext({} as any)

export default function AppController({children}: Props) {
  const [state, dispatch] = useReducer(reducer, defaultContext)

  useEffect(() => {
    const cached = localStorage.getItem("kanji_list")

    if (cached) {
      dispatch({
        type: "kanjis",
        value: JSON.parse(cached)
      })
    } else {
      api.list("all").then(list => {
        dispatch({
          type: "kanjis",
          value: list
        })

        localStorage.setItem("kanji_list", JSON.stringify(list))
      })
    }
  }, [])

  const context = {
    ...state,
    cache: sessionCache,
    setLang(lang: string) {
      dispatch({
        type: "lang",
        value: lang
      })
    },
    async loadCategory({label, name}: KanjiCategoryRequest) {
      try {
        const cachedList = await sessionCache.loadCategory(label)

        dispatch({
          type: "kanji_list",
          value: cachedList
        })
        
        return true
      } catch(_) {
        const items = await api.list(name)

        if (items) {
          sessionCache.saveList([{
            label, items
          }])

          dispatch({
            type: "kanji_list",
            value: [{
              label,
              items
            }]
          })
        }
  
        return items != null
      }
    },
    async loadKanji(kanji: string) {
      try {
        const cachedKanji = await sessionCache.loadKanji(kanji)

        dispatch({
          type: "kanji",
          value: cachedKanji
        })
      } catch(_) {
        const data = await api.kanji(kanji)
        const words = await api.words(kanji)
        
        if (data && words) {
          sessionCache.saveKanji(kanji, {
            data,
            words
          })

          dispatch({
            type: "kanji",
            value: {
              data,
              words
            }
          })
        }
  
        return data != null && words != null
      }
    },
    async loadReadings(reading: string) {
      try {
        const cachedReading = await sessionCache.loadReading(reading)

        dispatch({
          type: "kanji_list",
          value: cachedReading
        })
      } catch (_) {
        const readings = await api.readings(reading)
  
        if (readings) {
          sessionCache.saveReading(
            reading,
            [
              {
                label: `Kanjis for ${readings.reading}`,
                items: readings.main_kanji
              },
              {
                label: `Name kanjis for ${readings.reading}`,
                items: readings.name_kanji
              }
            ]
          )

          dispatch({
            type: "kanji_list",
            value: [
              {
                label: `Kanjis for ${readings.reading}`,
                items: readings.main_kanji
              },
              {
                label: `Name kanjis for ${readings.reading}`,
                items: readings.name_kanji
              }
            ]
          })
        }
  
        return readings != null
      }
    }
  }

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  )
}