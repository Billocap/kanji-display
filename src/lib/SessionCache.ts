export default class SessionCache extends Map {
  constructor() {
    super()

    this.set("kanjis", new Map())
    this.set("readings", new Map())
    this.set("list", [])
  }

  loadCategory(label: string) {
    const cached: KanjiListModel = this.get("list")

    return cached.label == label ? cached : null
  }

  saveList(list: KanjiListModel[]) {
    return this.set("list", list)
  }

  loadKanji(kanji: string) {
    const cached: Map<string, KanjiModel> = this.get("kanjis")

    return cached.has(kanji) ? cached.get(kanji) : null
  }

  saveKanji(kanji: string, data: KanjiModel) {
    let cached: Map<string, KanjiModel> = this.get("kanjis")

    cached.set(kanji, data)

    if (cached.size >= 5) {
      const striped = Array.from(cached.entries()).slice(-5)

      cached = new Map(striped)
    }

    return this.set("kanjis", cached)
  }

  loadReading(reading: string) {
    const cached: Map<string, any> = this.get("readings")

    return cached.has(reading) ? cached.get(reading) : null
  }

  saveReading(reading: string, data: any) {
    let cached: Map<string, any> = this.get("readings")

    cached.set(reading, data)

    if (cached.size >= 5) {
      const striped = Array.from(cached.entries()).slice(-5)

      cached = new Map(striped)
    }

    return this.set("readings", cached)
  }
}
