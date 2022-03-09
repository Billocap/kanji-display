/**
 * Opens the backup database.
 * @returns A promise for the database.
 */
function openDatabase() {
  const request = indexedDB.open("kanji-display@backup", 1)

  // Creates the necessary object stores.
  request.onupgradeneeded = function() {
    const db = request.result

    if (!db.objectStoreNames.contains("kanjis")) {
      db.createObjectStore("kanjis", {keyPath: "id"})
    }

    if (!db.objectStoreNames.contains("readings")) {
      db.createObjectStore("readings", {keyPath: "id"})
    }
  }

  // Encapsulates the db request in a promise.
  return new Promise<IDBDatabase>(
    (resolve, reject) => {
      request.onsuccess = function() {
        const db = request.result

        resolve(db)
      }

      request.onerror = function() {
        reject(request.error)
      }
    }
  )
}

interface IDBDataRequest<T> {
  id: string,
  data: T
}

/**
 * Connects to backup database.
 */
const backup = {
  async saveKanji(kanji: string, data: KanjiModel) {
    const db = await openDatabase()
  
    const transaction = db.transaction("kanjis", "readwrite")
  
    const kanjis = transaction.objectStore("kanjis")
  
    const request = kanjis.add({
      id: kanji,
      data
    })
  
    return new Promise<IDBValidKey>(
      (resolve, reject) => {
        request.onsuccess = function() {
          resolve(request.result)
        }
  
        request.onerror = function() {
          reject(request.error)
        }
      }
    )
  },
  async loadKanji(kanji: string) {
    const db = await openDatabase()
  
    const transaction = db.transaction("kanjis", "readonly")
  
    const kanjis = transaction.objectStore("kanjis")
  
    const request: IDBRequest<IDBDataRequest<KanjiModel>> = kanjis.get(kanji)
  
    return new Promise<KanjiModel | undefined>(
      (resolve, reject) => {
        request.onsuccess = function() {
          if (!request.result) resolve(request.result)

          resolve(request.result.data)
        }
  
        request.onerror = function() {
          reject(request.error)
        }
      }
    )
  },
  async saveReading(reading: string, data: KanjiListModel[]) {
    const db = await openDatabase()
  
    const transaction = db.transaction("readings", "readwrite")
  
    const readings = transaction.objectStore("readings")
  
    const request = readings.add({
      id: reading,
      data
    })
  
    return new Promise<IDBValidKey>(
      (resolve, reject) => {
        request.onsuccess = function() {
          resolve(request.result)
        }
  
        request.onerror = function() {
          reject(request.error)
        }
      }
    )
  },
  async loadReading(reading: string) {
    const db = await openDatabase()
  
    const transaction = db.transaction("readings", "readonly")
  
    const readings = transaction.objectStore("readings")
  
    const request: IDBRequest<IDBDataRequest<KanjiListModel[]>> = readings.get(reading)
  
    return new Promise<KanjiListModel[] | undefined>(
      (resolve, reject) => {
        request.onsuccess = function() {
          if (!request.result) resolve(request.result)

          resolve(request.result.data)
        }
  
        request.onerror = function() {
          reject(request.error)
        }
      }
    )
  } 
}

export default backup
