type InformationType = "kanji" | "reading" | "words"

/**
 * Returns a api url string.
 * @param type The type of information to fetch.
 * @param info The actual information.
 */
const url = (type: InformationType, info: string) => `https://kanjiapi.dev/v1/${type}/${info}`

/**
 * Api wrapper
 */
const api = {
	/**
	 * Gets the information about the kanji.
	 * @param kanji 
	 */
	async kanji(kanji: string) {
		const response = await fetch(url("kanji", kanji))

		const data = await response.json()

		return data
	},
	/**
	 * Gets the specified list.
	 * @param list 
	 */
	async list(list: KanjiListName) {
		const response = await fetch(url("kanji", list))

		const data = await response.json()

		return data
	},
	/**
	 * Gets the words that use the specified kanji.
	 * @param kanji 
	 */
	async words(kanji: string) {
		const response = await fetch(url("words", kanji))

		const data = await response.json()

		return data
	},
	/**
	 * Gets the kanjis that have the specified reading.
	 * @param kana 
	 */
	async readings(kana: string) {
		const response = await fetch(url("reading", kana))

		const data = await response.json()

		return data
	}
}

export default api
