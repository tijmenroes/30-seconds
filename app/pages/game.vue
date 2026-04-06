<template>
  <div>
    <div v-if="!isTimerStarted" class="flex flex-col p-4 gap-5 h-full">
      <h2 class="text-2xl font-bold text-center">
        Hand the phone to the next person
      </h2>

      <UButton icon="i-lucide-timer" size="xl" class="p-2" @click="startTimer">
        Start timer
      </UButton>

      <hr class="border-t-2 border-gray-600" />

      <UCard class="mt-6">
        <p class="">Score: {{ score }}</p>
        <p class="">Amount of rounds: {{ amountRounds }}</p>
      </UCard>
    </div>

    <div v-else class="flex flex-col gap-4 p-4">
      <h1 class="text-2xl font-bold text-center">{{ timer }}</h1>
      <div class="flex justify-between">
        <p>{{ hintText }}</p>

        <div>
          <UButton
            v-if="isTimerFinished"
            icon="i-lucide-check"
            size="sm"
            @click="selectAllWords"
          >
            Select all
          </UButton>
        </div>
      </div>

      <UButton
        v-for="word in rndWordList"
        :key="word"
        color="neutral"
        :class="selectedWords.includes(word) ? 'brightness-50' : ''"
        size="xl"
        @click="handleWordClick(word)"
      >
        {{ word }}
      </UButton>

      <UButton
        v-if="isTimerFinished"
        color="secondary"
        size="xl"
        icon="i-lucide-save"
        variant="subtle"
        @click="submitScore"
        >Submit</UButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWordsStore } from '~/stores/words'

const TIMER_START = 30
const wordsStore = useWordsStore()
wordsStore.checkWords()

const timer = ref(TIMER_START)
const isTimerStarted = ref(false)
const isTimerFinished = ref(false)

const selectedWords = ref<string[]>([])
const score = ref(0)
const amountRounds = ref(0)

const rndWordList = ref<string[]>(wordsStore.getRandomWords(5))
const hintText = computed(() => {
  return !isTimerFinished.value ? 'Guess the following words' : "Time's up!"
})

function startTimer() {
  timer.value = TIMER_START
  isTimerStarted.value = true
  isTimerFinished.value = false
  selectedWords.value = []
  const interval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      isTimerFinished.value = true
      clearInterval(interval)
    }
  }, 1000)
}

function handleWordClick(word: string) {
  if (!isTimerFinished.value) return
  if (selectedWords.value.includes(word)) {
    selectedWords.value = selectedWords.value.filter((w) => w !== word)
  } else {
    selectedWords.value.push(word)
  }
}

function selectAllWords() {
  selectedWords.value = [...rndWordList.value]
}

function submitScore() {
  score.value += selectedWords.value.length
  isTimerStarted.value = false
  amountRounds.value++
  wordsStore.removeWords(rndWordList.value)
  rndWordList.value = wordsStore.getRandomWords(5)
}
</script>
