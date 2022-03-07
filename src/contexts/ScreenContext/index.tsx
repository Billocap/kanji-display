import { createContext, useState } from "react"

import KanjiScreen from "../../screens/KanjiScreen"
import LoadingScreen from "../../screens/LoadingScreen"
import ListScreen from "../../screens/ListScreen"

interface Props {
  children: any
}

export const ScreenContext = createContext({} as any)

export default function ScreenNavigator({children}: Props) {
  const [screen, navigate] = useState("loading")

  const screens: {[index: string]: () => JSX.Element} = {
    list: ListScreen,
    kanji: KanjiScreen,
    loading: LoadingScreen
  }

  const context = {
    CurrentScreen: screens[screen],
    navigate
  }

  return (
    <ScreenContext.Provider value={context}>
      {children}
    </ScreenContext.Provider>
  )
}
