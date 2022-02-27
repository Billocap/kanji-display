import { createContext, useState } from "react";

interface Props {
  screens: any,
	children: any
}

export const ScreenContext = createContext({} as any);

export default function ScreenNavigator({screens, children}: Props) {
  const [current, navigate] = useState(0);

	return (
		<ScreenContext.Provider value={{
			CurrentScreen: screens[current],
			navigate
		}}>
			{children}
		</ScreenContext.Provider>
  );
};