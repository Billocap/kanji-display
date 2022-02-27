import { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: any
}

export const ScreenContext = createContext({} as any);

export function Screen({children}: any) {
  const {addScreen} = useContext(ScreenContext);

  useEffect(() => {
    addScreen(children);
  }, []);

  return children;
}

export default function ScreenNavigator({children}: Props) {
  const [screens, setScreens] = useState<any[]>([]);
  const [CurrentScreen, switchScreen] = useState(screens[0]);

  const context = {
    CurrentScreen,
    navigate(id: number) {
      switchScreen(screens[id]);
    },
    addScreen(screen: any) {
      setScreens(prev => [...prev, screen]);
    }
  };

	return (
		<ScreenContext.Provider value={context}>
			{children}
		</ScreenContext.Provider>
  );
};