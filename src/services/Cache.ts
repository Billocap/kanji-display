const savedCache = localStorage.getItem("kanji-display@cache")

const cacheData = savedCache ? JSON.parse(savedCache) : {
  category: [],
  kanjis: {},
  readings: {}
}

const cache = {
  data: cacheData,
  get(data: string) {
    return Object.getOwnPropertyNames(this.data[data])
  },

  loadCategory(label: string) {
    const cached: KanjiListModel = this.data.category

    return cached.label == label ? cached : null
  },
  saveCategory(category: KanjiListModel[]) {
    this.data.category = category
  },

  loadKanji(kanji: string) {
    return this.data.kanjis[kanji] || null
  },
  saveKanji(kanji: string, data: KanjiModel) {
    let cached = Object.entries(this.data.kanjis)

    cached.push([kanji, data])

    if (cached.length > 5) cached = cached.slice(-5)
    
    this.data.kanjis = Object.fromEntries(cached)
  },

  loadReading(reading: string) {
    return this.data.readings[reading] || null
  },
  saveReading(reading: string, data: any) {
    let cached = Object.entries(this.data.readings)

    cached.push([reading, data])

    if (cached.length > 5) cached = cached.slice(-5)
    
    this.data.readings = Object.fromEntries(cached)
  }
}

export default cache
