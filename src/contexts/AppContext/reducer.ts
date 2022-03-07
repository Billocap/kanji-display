export default function(state: any, action: any) {
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

    case "lang":
      return {
        ...state,
        lang: action.value
      }
    
    default:
      return {...state}
  }
}
