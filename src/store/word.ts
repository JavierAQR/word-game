import axios from "axios";
import { create } from "zustand";

interface wordState {
  targetWord: string;
  fetchNewWord: () => void;
}

export const useWordStore = create<wordState>((set) => {
  return {
    targetWord: "",
    fetchNewWord: async () => {
      try {
        const response = await axios.get("src/data/words.json");
        const words = response.data;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        set({ targetWord: randomWord });
      } catch (e) {
        console.error(e);
      }
    },
  };
});
