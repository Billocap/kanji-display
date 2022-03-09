import {createContext, useEffect, useReducer} from "react"

import api from "../../services/api"
import backup from "../../services/backup"
import SessionCache from "../../lib/SessionCache"

import {initialValue, reducer} from "./state"

interface Props {
  children: any
}

interface AppContext extends AppState {
  [index: string]: any
}

const sessionCache = new SessionCache()

export const AppContext = createContext({} as AppContext)

export default function AppController({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialValue)

  useEffect(() => {
    const cached = localStorage.getItem("kanji-display@valid-kanjis")

    if (cached) {
      dispatch({
        type: "kanjis",
        value: JSON.parse(cached)
      })
    } else {
      api.list("all").then(list => {
        dispatch({
          type: "kanjis",
          value: list || []
        })

        localStorage.setItem("kanji-display@valid-kanjis", JSON.stringify(list))
      })
    }
  }, [])

  const context: AppContext = {
    ...state,
    cache: sessionCache,
    async loadCategory({label, name}: KanjiCategoryRequest) {
      const cachedList = sessionCache.loadCategory(label)
      
      if (cachedList) {
        dispatch({
          type: "kanji_list",
          value: [cachedList]
        })

        return true
      }
      
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
    },
    async loadKanji(kanji: string) {
      const cachedKanji = sessionCache.loadKanji(kanji)

      if (cachedKanji) {
        dispatch({
          type: "kanji",
          value: cachedKanji
        })

        return true
      }
      
      try {
        const backupKanji = await backup.loadKanji(kanji)

        if (!backupKanji) throw new Error()

        dispatch({
          type: "kanji",
          value: backupKanji
        })

        return true
      } catch(e) {
        console.error(e)

        const data = await api.kanji(kanji)
        const words = await api.words(kanji)
        
        if (data && words) {
          const kanjiInfo = {data, words}

          sessionCache.saveKanji(kanji, kanjiInfo)
          backup.saveKanji(kanji, kanjiInfo)

          dispatch({
            type: "kanji",
            value: kanjiInfo
          })
        }
  
        return data != null && words != null
      }
    },
    async loadReadings(reading: string) {
      const cachedReading = sessionCache.loadReading(reading)

      if (cachedReading) {
        dispatch({
          type: "kanji_list",
          value: cachedReading
        })

        return true
      }

      try {
        const backupReading = await backup.loadReading(reading)

        if (!backupReading) throw new Error()

        dispatch({
          type: "kanji_list",
          value: backupReading
        })

        return true
      } catch (e) {
        console.error(e)

        const readings = await api.readings(reading)
  
        if (readings) {
          const readingInfo = [
            {
              label: `Kanjis for ${readings.reading}`,
              items: readings.main_kanji
            },
            {
              label: `Name kanjis for ${readings.reading}`,
              items: readings.name_kanji
            }
          ]

          sessionCache.saveReading(reading, readingInfo)
          backup.saveReading(reading, readingInfo)

          dispatch({
            type: "kanji_list",
            value: readingInfo
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