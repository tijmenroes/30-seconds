<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold pb-3">Settings</h1>

    <UButton @click="wordsStore.checkWords">Check words</UButton>

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Custom words</h2>
      <UTextarea v-model="customWords" autoresize @blur="setCustomWords" />
      {{ customWordsCounter }} words

      <h2 class="text-2xl font-bold">Word packs</h2>

      <UCard
        v-for="wordPack in wordsStore.wordPackList"
        :key="wordPack.id"
        class="flex flex-col"
        :class="{ 'opacity-50': disabledWordPacks.includes(wordPack.id) }"
      >
        <p class="font-bold">{{ wordPack.packName }}</p>
        <div>{{ wordPack.words?.length }} words</div>

        <UButton
          icon="i-lucide-trash"
          size="xs"
          variant="subtle"
          color="error"
          class="mt-2"
          @click="wordsStore.disableWordPack(wordPack.id)"
        >
          Disable pack
        </UButton>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWordsStore } from "~/stores/words";

const wordsStore = useWordsStore();
const disabledWordPacks = computed(() => wordsStore.disabledWordPacks);

const customWords = ref<string>();
const customWordsCounter = computed(
  () => customWords.value?.split("\n").length || 0,
);

function setCustomWords() {
  wordsStore.setCustomWords(customWords.value?.split("\n") || []);
}
</script>
