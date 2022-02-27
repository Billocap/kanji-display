import { createContext, useState } from "react";

import { defaultKanjiList } from "../lib/constants";

interface Props {
  children: any
}

export const AppContext = createContext({} as any);

export default function AppController({children}: Props) {
  const [kanjiList, setKanjiList] = useState(defaultKanjiList);

	const context = {
		kanjiList,
		setKanjiList
	};

	return (
		<AppContext.Provider value={context}>
			{children}
		</AppContext.Provider>
  );
};