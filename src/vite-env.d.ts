/// <reference types="vite/client" />

type KanjiListName = "joyo" | "jouyou" | "jinmeiyo" | "jinmeiyou" | "grade-1" | "grade-2" | "grade-3" | "grade-4" | "grade-5" | "grade-6" | "grade-8" | "all";

interface KanjiListObject {
	label: string,
	name: KanjiListName
}

// #region KanjiApi
interface KanjiData {
	kanji: string,
	unicode: string,
	stroke_count: number,
	grade: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | null,
	heisig_en: string | null,
	jlpt: 1 | 2 | 3 | 4 | null,
	meanings: string[],
	kun_readings: string[],
	on_readings: string[],
	name_readings: string[]
}

interface KanjiReadings {
	reading: string,
	main_kanji: string[],
	name_kanji: string[]
}

type KanjiWordsList = {
	meanings: {
		glosses: string[]
	}[],
	variants: {
		written: string,
		pronounced: string,
		priorities: string[]
	}[]
}[]
// #endregion

interface AppModel {
	lists: {
		write: KanjiListObject[],
		grades: KanjiListObject[]
	},
	kanjis: string[],
	defaults: {
		kanji: KanjiData,
		kanjiList: KanjiListObject
	}
}