const cached = localStorage.getItem("kanji-display@cache")

const cache = cached ? JSON.parse(cached) : {
  kanjiList: []
}

export default cache
