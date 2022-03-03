const defaultKanjiList = [{
  label: "",
  items: []
}];

const defaultKanji: KanjiData = {
  meanings: [""],
  on_readings: [""],
  name_readings: [""],
  kun_readings: [""],
  stroke_count: 8,
  unicode: "",
  grade: 1,
  jlpt: null,
  heisig_en: null,
  kanji: ""
};

const cache = JSON.parse(
  localStorage.getItem("kanji-display.cache") || "{}"
);

const AppConstants: AppModel = {
  lists: {
    write: [
      {
        name: "all",
        label: "All"
      },
      {
        name: "joyo",
        label: "Joyo"
      },
      {
        name: "jinmeiyo",
        label: "Jinmeiyo"
      }
    ],
    grades: [
      {
        name: "grade-1",
        label: "Grade 1"
      },
      {
        name: "grade-2",
        label: "Grade 2"
      },
      {
        name: "grade-3",
        label: "Grade 3"
      },
      {
        name: "grade-4",
        label: "Grade 4"
      },
      {
        name: "grade-5",
        label: "Grade 5"
      },
      {
        name: "grade-6",
        label: "Grade 6"
      },
      {
        name: "grade-8",
        label: "Grade 8"
      }
    ]
  },
  kanjis: cache.kanjis || [],
  defaults: {
    kanji: cache.kanji || defaultKanji,
    kanjiList: cache.kanjiList || defaultKanjiList
  }
};

export default AppConstants;