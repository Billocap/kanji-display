/// <reference types="vite/client" />

/**
 * All categories a kanji can be at
 */
type KanjiCategory =
  "joyo" | "jouyou" | "jinmeiyo" | "jinmeiyou" | "all" |
  "grade-1" | "grade-2" | "grade-3" | "grade-4" | "grade-5" | "grade-6" | "grade-8"

/** */
interface KanjiCategoryRequest {
  label: string,
  name: KanjiCategory
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

interface KanjiWordMeaning {
  glosses: string[]
}

interface KanjiWordVariant {
  written: string,
  pronounced: string,
  priorities: string[]
}

interface KanjiWord {
  meanings: KanjiWordMeaning[],
  variants: KanjiWordVariant[]
}

type KanjiWordsList = KanjiWord[]
// #endregion

interface AppContext {
  kanjis: string[],
  kanjiList: {
    label: string,
    items: number[]
  }[]
}