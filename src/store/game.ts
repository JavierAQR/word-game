import axios from "axios";
import { create } from "zustand";
import { gameType } from "../types";

interface gameState {
  targetWord: string;
  gamemode: gameType;
  
  fetchNewWord: () => void;
}

export const useGameStore = create<gameState>((set) => {
  return {
    targetWord: "",
    gamemode: null,
   
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
