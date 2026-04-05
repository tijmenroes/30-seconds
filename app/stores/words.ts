import wordPacks from "../assets/wordpacks";

export const useWordsStore = defineStore("words", () => {
  const words = ref<string[]>([]);
  const disabledWordPacks = ref<number[]>([]);
  const wordPackList = wordPacks.map((pack, i) => ({ ...pack, id: i }));

  const customWords = ref<string[]>([]);

  function setCustomWords(words: string[]) {
    customWords.value = words;
  }

  function checkWords() {
    words.value = [];
    const enabledPacks = wordPackList.filter(
      (pack) => !disabledWordPacks.value.includes(pack.id),
    );
    const set = new Set(customWords.value);
    enabledPacks.forEach((pack) => {
      pack.words?.forEach((word) => set.add(word));
    });
    words.value = Array.from(set);
    console.log("words: ", words.value);
  }

  function disableWordPack(packId: number) {
    if (disabledWordPacks.value.includes(packId)) {
      return;
    }
    disabledWordPacks.value.push(packId);
  }

  function removeWords(wordsToRemove: string[]) {
    wordsToRemove.forEach((word) => {
      words.value = words.value.filter((w) => w !== word);
    });
  }

  function getRandomWords(amount: number) {
    console.log(words.value);
    return words.value.sort(() => Math.random() - 0.5).slice(0, amount);
  }

  return {
    words,
    checkWords,
    wordPackList,
    disableWordPack,
    disabledWordPacks,
    setCustomWords,
    removeWords,
    getRandomWords,
  };

  // return {
  //   score,
  //   amountRounds,
  //   submitRound,
  //   resetStats,
  // };
});
