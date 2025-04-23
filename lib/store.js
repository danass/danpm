import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useWordStore = create((set) => ({
  words: [],
  uuid: '',
  setWords: (newWords) => set({ words: newWords }),
  setUuid: (newUuid) => set({ uuid: newUuid }),
  addWords: (input) => {
    const newWords = input.split(/[,;\n]+/).map((word) => word.trim()).filter(Boolean);
    set({ words: newWords, uuid: nanoid(10) }); // Utiliser des UUID plus courts
  },
})); 
