const cache = {
  get kanjis() {
    const cache = JSON.parse(
      localStorage.getItem("kanji-display.cache") || "{}"
    )

    return cache.kanjis || []
  }
}

export default cache
