import { createContext, useState } from "react"

import KanjiScreen from "../../screens/KanjiScreen"
import LoadingScreen from "../../screens/LoadingScreen"
import ListScreen from "../../screens/ListScreen"

interface Props {
  children: any
}

interface ScreensMap {
  [index: string]: () => JSX.Element
}

export const ScreenContext = createContext({} as any)

export default function ScreenNavigator({children}: Props) {
  const [screen, setPage] = useState("loading")

  const screens: ScreensMap = {
    list: ListScreen,
    kanji: KanjiScreen,
    loading: LoadingScreen
  }

  const context = {
    CurrentScreen: screens[screen],
    navigate(page: string) {
      setPage(page)
    }
  }

  return (
    <ScreenContext.Provider value={context}>
      {children}
    </ScreenContext.Provider>
  )
}
