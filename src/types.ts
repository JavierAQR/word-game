export type gameType = "single" | "multi" | null;

export interface cellType {
  letter: string;
  result: string;
}

interface playerStatus {
  name: string;
  score: number;
}

export interface playersType {
  player1: playerStatus;
  player2: playerStatus;
}

export const playersInitial = {
  player1: {
    name: "",
    score: 0,
  },
  player2: {
    name: "",
    score: 0,
  },
};

export type playerType = "player1" | "player2";

export interface multiplayerType {
  turn: number;
  currentPlayer: playerType;
}
