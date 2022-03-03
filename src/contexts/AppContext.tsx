import { createContext, useEffect, useMemo, useState } from "react";

import api from "../lib/api";
import AppConstants from "../lib/constants";

interface Props {
  children: any
}

export const AppContext = createContext({} as any);

export default function AppController({children}: Props) {
  const [kanjiList, setKanjiList] = useState(AppConstants.defaults.kanjiList);

	const context = {
		kanjiList,
		setKanjiList,
		kanjis: AppConstants.kanjis
	};

	useEffect(() => {
		api.list("all").then(kanjis => {
			const preloaded = {
				kanjis
			};

			localStorage.setItem("kanji-display.cache", JSON.stringify(preloaded));
		});
	}, []);

	return (
		<AppContext.Provider value={context}>
			{children}
		</AppContext.Provider>
  );
};