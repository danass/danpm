'use client'
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useWordStore = create((set) => ({
  words: [],
  uuid: null,
  setWords: (newWords) => set({ words: newWords, uuid: uuidv4() }),
  addWords: (input) => {
    const newWords = input.split(/[,;\n]+/).map((word) => word.trim()).filter(Boolean);
    set({ words: newWords, uuid: uuidv4() });
  },
}));