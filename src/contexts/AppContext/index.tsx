import {createContext, useEffect, useReducer} from "react"

import api from "../../services/api"

import defaultContext from "./default"
import reducer from "./reducer"

interface Props {
  children: any
}

const SessionCache = new Map()

SessionCache.set("previous@kanjis", new Map())

export const AppContext = createContext({} as any)

export default function AppController({children}: Props) {
  const [state, dispatch] = useReducer(reducer, defaultContext)

  useEffect(() => {
    api.list("all").then(list => {
      dispatch({
        type: "kanjis",
        value: list
      })
    })
  }, [])

  const context = {
    ...state,
    async loadList({label, name}: KanjiListObject) {
      const previousList = SessionCache.get("previous@list")

      if (previousList && previousList.label == label) {
        dispatch({
          type: "kanji_list",
          value: [previousList]
        })

        return true
      }

      const items = await api.list(name)

      SessionCache.set("previous@list", {
        label, items
      })
  
      if (items) {
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
      const previousKanjis: Map<any, any> = SessionCache.get("previous@kanjis")

      if (previousKanjis.has(kanji)) {
        dispatch({
          type: "kanji",
          value: previousKanjis.get(kanji)
        })

        return true
      }

      const data = await api.kanji(kanji)
      const words = await api.words(kanji)
      
      previousKanjis.set(kanji, {
        data,
        words
      })

      if (data && words) {
        dispatch({
          type: "kanji",
          value: {
            data,
            words
          }
        })
      }

      return data != null && words != null
    },
    async loadReadings(reading: string) {
      const readings = await api.readings(reading)

      if (readings) {
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

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  )
}