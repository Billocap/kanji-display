type InformationType = "kanji" | "reading" | "words"

/**
 * Returns a api url string.
 * @param type The type of information to fetch.
 * @param info The actual information.
 */
const url = (type: InformationType, info: string) => `https://kanjiapi.dev/v1/${type}/${info}`

/**
 * Fetches JSON data from the api and prevent errors from breaking the app.
 * @param url The url to fetch the data from.
 */
const fetchJson: (url: string) => Promise<any | null> = async (url) => {
  try {
    const response = await fetch(url)

    const data =  await response.json()

    if ("error" in data) return null

    return data
  } catch (_) {
    return null
  }
};

/**
 * Api wrapper
 */
const api = {
  /**
   * Gets the information about the kanji.
   * @param kanji 
   */
  kanji(kanji: string): Promise<KanjiData | null> {
    return fetchJson(url("kanji", kanji));
  },
  /**
   * Gets the specified list.
   * @param list 
   */
  list(list: KanjiListName): Promise<string[] | null> {
    return fetchJson(url("kanji", list))
  },
  /**
   * Gets the words that use the specified kanji.
   * @param kanji 
   */
  words(kanji: string): Promise<KanjiWordsList | null> {
    return fetchJson(url("words", kanji))
  },
  /**
   * Gets the kanjis that have the specified reading.
   * @param kana 
   */
  readings(kana: string): Promise<KanjiReadings | null> {
    return fetchJson(url("reading", kana))
  }
}

export default api
