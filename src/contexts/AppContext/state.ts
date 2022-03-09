export const initialValue: AppState = {
  kanjis: [],
  kanjiList: [
    {
      label: "",
      items: []
    }
  ],
  kanji: {
    data: {
      kanji: "",
      grade: 1,
      stroke_count: 8,
      meanings: [""],
      heisig_en: null,
      kun_readings: [""],
      on_readings: [""],
      name_readings: [""],
      jlpt: null,
      unicode: ""
    },
    words: [
      {
        variants: [
          {
            written: "",
            pronounced: "",
            priorities: []
          }
        ],
        meanings: [
          {
            glosses: []
          }
        ]
      }
    ]
  }
}

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "kanji_list":
      return {
        ...state,
        kanjiList: action.value
      }
    
    case "kanji":
      return {
        ...state,
        kanji: action.value
      }
    
    case "kanjis":
      return {
        ...state,
        kanjis: action.value
      }
    
    default:
      return {...state}
  }
}
