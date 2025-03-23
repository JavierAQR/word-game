import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { gameType } from "../types";

interface Props {
  children: ReactNode;
}

interface MonthContextType {
  isCorrect: boolean;
  isFinished: boolean;
  gamemode: gameType;
  setGamemode: Dispatch<SetStateAction<gameType>>;
  setIsCorrect: Dispatch<SetStateAction<boolean>>;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  handleResetGame: () => void;
}

export const GameContext = createContext<MonthContextType | null>(null);

export function GameContextProvider({ children }: Props) {
  const [gamemode, setGamemode] = useState<gameType>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleResetGame = () => {
    setIsFinished(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (!gamemode) {
      handleResetGame();
    }
  }, [gamemode]);

  const valor = {
    isCorrect,
    setGamemode,
    gamemode,
    setIsCorrect,
    isFinished,
    setIsFinished,
    handleResetGame,
  };

  return <GameContext.Provider value={valor}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error("gameContext debe usarse dentro de GameContextProvider");
  }

  return gameContext;
}
