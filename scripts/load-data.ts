const AUTHOR_INDEX = {
  0: "L",
  1: "T",
  2: "Combined",
};

const wordsLisa = `
word1 
word 2
word 123
`;

const wordsTijmen = `
word1
word2342
word 123
`;

type WordEntry = {
  value: string;
  index: number;
  authorIndex: number;
};

// const wordList: string[] = [];
const wordsCombined = wordsLisa + wordsTijmen;
const fullWordsList = [wordsLisa, wordsTijmen];
const wordEntries: WordEntry[] = [];

fullWordsList.forEach((wordString, authorIndex) => {
  const personWordList: string[] = [];
  wordString.split("\n").forEach((word) => {
    const trimmed = word.trim().toLowerCase();
    if (!trimmed) return;

    if (personWordList.includes(trimmed)) {
      console.log("dupe found: ", trimmed);
      return;
    }

    personWordList.push(trimmed);
  });

  // Index kan dadelijk dus vervangen worden door een nanoid.. Misschien is ID beter om cookie gedoe te besparen?
  const mapped: WordEntry[] = personWordList.map((item, idx) => ({
    value: item,
    index: idx,
    authorIndex,
  }));

  console.log(mapped);
  wordEntries.push(...mapped);
});

const wordValues = wordEntries.map((entry) => entry.value);
const wordValuesDupes: string[] = [];
console.log("wordvalues", wordValues);
wordValues.forEach((wordValue) => {
  if (
    wordValues.filter((filteredValue) => filteredValue == wordValue).length > 1
  ) {
    // console.log("wordValue is duped by two lists: ", wordValue);
    wordValuesDupes.push(wordValue);
  }
});

const idsToDelete: number[] = [];
wordValuesDupes.forEach((dupe) => {
  const filtered = wordEntries.filter((entry) => entry.value == dupe);
  if (filtered.length > 1) {
    filtered[0].authorIndex = 2;

    for (let i = 1; i < filtered.length; i++) {
      console.log("deleting i", i, dupe);

      idsToDelete.push(filtered[i].index);
      // delete filtered[i];
    }
  }
});
// console.log("wordValuesDupes", wordValuesDupes);

console.log("wordEntries", wordEntries);

// wordEntries.forEach(wordEntry)

// wordEntries.forEach(wordEntry => {
//   console.log(wordEntry);

// });
// TODO: Even kijken hoe we om gaan met het lezen van een file
// For ID's later:
// import { nanoid } from 'nanoid';
// const id = nanoid(); // Bijv: "V1StGXR8_Z5jdHi6B-myT"
// import fs from "node:fs";

// fs.readdir("data", function (err, filenames) {
//   if (err) {
//     console.error(err);
//   }
//   filenames.forEach((filename) => {
//     console.log(filename);
//   });
// });
