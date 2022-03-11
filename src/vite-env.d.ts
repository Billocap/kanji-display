/// <reference types="vite/client" />

/**
 * All categories a kanji can be at.
 */
type KanjiCategory =
  "joyo" | "jouyou" | "jinmeiyo" | "jinmeiyou" | "all" |
  "grade-1" | "grade-2" | "grade-3" | "grade-4" | "grade-5" | "grade-6" | "grade-8"

/** */
interface KanjiCategoryRequest {
  label: string,
  name: KanjiCategory
}

// #region Model
/**
 * Represents the full collection of data about the kanji.
 */
interface KanjiModel {
  data: KanjiData,
  words: KanjiWord[]
}

/**
 * Represents a lists of kanjis organized based on some common characteristics.
 */
interface KanjiListModel {
  label: string,
  items: string[]
}
// #endregion Model

// #region KanjiApi
/**
 * General data about a kanji character.
 */
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

/**
 * Lists the kanjis that can be read as the required reading.
 */
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

/**
 * Lists all possible words where the kanji appear at.
 */
type KanjiWordsList = KanjiWord[]
// #endregion

// #region AppControl
/**
 * General state of the app.
 */
interface AppState {
  /**
   * Current list of kanjis.
   */
  kanjiList: KanjiListModel[],
  /**
   * Current kanji.
   */
  kanji: KanjiModel
}

interface KanjiListAction {
  type: "kanji_list",
  value: KanjiListModel[]
}

interface KanjiAction {
  type: "kanji",
  value: {
    data: KanjiData,
    words: KanjiWordsList
  }
}
/**
 * All possible actions the reducer can take to change the state of the app.
 */
type AppAction = KanjiAction | KanjiListAction
// #endregion AppControl
