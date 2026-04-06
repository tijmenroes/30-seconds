import wordPacks from '../assets/wordpacks'

export const useWordsStore = defineStore('words', () => {
  const CUSTOM_WORDS_STORAGE_KEY = '30seconds:customWords'

  const words = ref<string[]>([])
  const disabledWordPacks = ref<number[]>([])
  const wordPackList = wordPacks.map((pack, i) => ({ ...pack, id: i }))

  const customWords = ref<string[]>([])

  const stored = localStorage.getItem(CUSTOM_WORDS_STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.every((w) => typeof w === 'string')) {
        customWords.value = parsed
      }
    } catch {
      // Ignore invalid storage value
    }
  }

  function setCustomWords(words: string[]) {
    const normalized = words.map((w) => w.trim()).filter(Boolean)
    customWords.value = normalized
    localStorage.setItem(CUSTOM_WORDS_STORAGE_KEY, JSON.stringify(normalized))
  }

  function checkWords() {
    words.value = []
    const enabledPacks = wordPackList.filter(
      (pack) => !disabledWordPacks.value.includes(pack.id)
    )
    const set = new Set(customWords.value?.length ? customWords.value : [])
    enabledPacks.forEach((pack) => {
      pack.words?.forEach((word) => set.add(word))
    })
    words.value = Array.from(set)
    console.log('words: ', words.value)
  }

  function disableWordPack(packId: number) {
    if (disabledWordPacks.value.includes(packId)) {
      return
    }
    disabledWordPacks.value.push(packId)
  }

  function removeWords(wordsToRemove: string[]) {
    wordsToRemove.forEach((word) => {
      words.value = words.value.filter((w) => w !== word)
    })
  }

  function getRandomWords(amount: number) {
    console.log(words.value)
    return words.value.sort(() => Math.random() - 0.5).slice(0, amount)
  }

  return {
    words,
    checkWords,
    wordPackList,
    disableWordPack,
    disabledWordPacks,
    customWords,
    setCustomWords,
    removeWords,
    getRandomWords
  }

  // return {
  //   score,
  //   amountRounds,
  //   submitRound,
  //   resetStats,
  // };
})
