interface Kanji {
  data: KanjiData,
  words: KanjiWordsList
}

export default class SessionCache extends Map {
  constructor() {
    super()

    this.set("kanjis", new Map())
    this.set("readings", new Map())
    this.set("list", [])
  }

  loadCategory(label: string) {
    const cached: KanjiCategoryRequest = this.get("list")

    return new Promise<KanjiCategoryRequest>(
      (resolve, reject) => {
        if (cached.label == label) {
          resolve(cached)
        } else {
          reject()
        }
      }
    )
  }

  saveList(list: any) {
    this.set("list", list)
  }

  loadKanji(kanji: string) {
    const cached: Map<string, Kanji> = this.get("kanjis")

    return new Promise<Kanji>(
      (resolve, reject) => {
        if (cached.has(kanji)) {
          resolve(cached.get(kanji) as Kanji)
        } else {
          reject()
        }
      }
    )
  }

  saveKanji(kanji: string, data: Kanji) {
    let cached: Map<string, Kanji> = this.get("kanjis")

    cached.set(kanji, data)

    if (cached.size >= 5) {
      const striped = Array.from(cached.entries()).slice(-5)

      cached = new Map(striped)
    }

    this.set("kanjis", cached)
  }

  loadReading(reading: string) {
    const cached: Map<string, any> = this.get("readings")

    return new Promise<any>(
      (resolve, reject) => {
        if (cached.has(reading)) {
          resolve(cached.get(reading) as any)
        } else {
          reject()
        }
      }
    )
  }

  saveReading(reading: string, data: any) {
    let cached: Map<string, any> = this.get("readings")

    cached.set(reading, data)

    if (cached.size >= 5) {
      const striped = Array.from(cached.entries()).slice(-5)

      cached = new Map(striped)
    }

    this.set("readings", cached)
  }
}
