import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameLayout from "./GameLayout";
import { cellType, gameType } from "../types";
import { useWordStore } from "../store/word";

interface Props {
  setGame: Dispatch<SetStateAction<gameType | null>>;
}

const Game = ({ setGame }: Props) => {
  const { targetWord, fetchNewWord } = useWordStore((state) => state);
  const wordArray = targetWord.split("");

  //cells es el array de elementos, en este caso son 5 columnas X 6 filas, y todas inician como strings vacíos
  const [cells, setCells] = useState<cellType[]>(
    Array(30).fill({ letter: "", result: "" })
  );

  const [currentRow, setCurrentRow] = useState(0); //currentRow indica el indice de la fila actual, primera fila = indice 0
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [finishGame, setFinishGame] = useState(false);

  const arrayCurrentRow = cells.slice(currentRow * 5, (currentRow + 1) * 5); //Se obtiene la fila actual cortando desde el primer indice de la fila, hasta el primero de la siguiente.

  const [indexCell, setIndexCell] = useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    const firstIndexRow = currentRow * 5;
    const lastIndexRow = (currentRow + 1) * 5 - 1;
    const newCells = [...cells];

    if (/^[a-zA-Z]$/.test(key) && indexCell !== -1) {
      if (indexCell <= lastIndexRow) {
        newCells[indexCell] = {
          ...newCells[indexCell],
          letter: key.toUpperCase(),
        };
      }

      if (indexCell + 1 <= lastIndexRow) {
        setIndexCell((prev) => prev + 1);
      } else {
        setIndexCell(-1);
      }

      setCells(newCells);
    }

    if (key === "Backspace") {
      if (indexCell === firstIndexRow && newCells[indexCell].letter === "") {
        return;
      }
      if (indexCell === -1) {
        setIndexCell(firstIndexRow + 4);
        newCells[firstIndexRow + 4].letter = "";
        setCells(newCells);
        return;
      }

      if (newCells[indexCell].letter !== "") {
        newCells[indexCell].letter = "";
      } else {
        newCells[indexCell - 1].letter = "";
      }

      setIndexCell((prev) => prev - 1);
      setCells(newCells);
    }

    // Si es la tecla de enviar
    // Solo se puede pasar a la siguiente fila si todos los items están llenos y si la fila es menor a 5 (0-4) (max penultima fila)
    if (
      key === "Enter" &&
      arrayCurrentRow.every((cell) => cell.letter !== "") &&
      currentRow <= 5
    ) {
      const wordControl = [...wordArray];

      arrayCurrentRow.forEach((item, index) => {
        const cellIndex = firstIndexRow + index;
        if (item.letter === wordArray[index]) {
          newCells[cellIndex] = {
            ...newCells[cellIndex],
            result: "correct",
          };
          wordControl.splice(wordControl.indexOf(item.letter), 1);
        }
      });

      const resultsCurrentRow = newCells.slice(firstIndexRow, lastIndexRow + 1);

      if (resultsCurrentRow.every((item) => item.result === "correct")) {
        setIsCorrect(true);
      } else {
        arrayCurrentRow.forEach((item, index) => {
          const cellIndex = firstIndexRow + index;
          if (newCells[cellIndex].result === "correct") {
            return;
          }
          if (wordControl.includes(item.letter)) {
            newCells[cellIndex] = {
              ...newCells[cellIndex],
              result: "present",
            };
            return wordControl.splice(wordControl.indexOf(item.letter), 1);
          }
          newCells[cellIndex] = {
            ...newCells[cellIndex],
            result: "absend",
          };
        });
      }
      setCurrentRow((prev) => prev + 1);
      setCells(newCells);
    }
  };

  const handleMenu = () => {
    setGame(null);
  };

  const handleResetWord = () => {
    fetchNewWord();
    setIsCorrect(false);
    setFinishGame(false);
    setCells(Array(30).fill({ letter: "", result: "" }));
    setIndexCell(0);
    setCurrentRow(0);
  };

  useEffect(() => {
    if (isCorrect === true || currentRow > 5) {
      return setFinishGame(true);
    }

    if (currentRow <= 5) setIndexCell(currentRow * 5);
  }, [currentRow]);

  // Agregar el event listener al montar el componente
  useEffect(() => {
    if (!finishGame) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cells, currentRow, indexCell]);

  useEffect(() => {
    const currentCells = document.querySelectorAll("li");

    const handleClickCell = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.index) {
        const index = parseInt(target.dataset.index, 10);
        setIndexCell(index);
      }
    };

    if (!finishGame) {
      currentCells.forEach((cell, index) => {
        if (index >= currentRow * 5 && index < (currentRow + 1) * 5) {
          cell.addEventListener("click", handleClickCell);
        }
      });
    }

    return () => {
      currentCells.forEach((cell) => {
        cell.removeEventListener("click", handleClickCell);
      });
    };
  }, [currentRow, finishGame]);

  useEffect(() => {
    handleResetWord();
  }, []);

  console.log(targetWord);

  return (
    <GameLayout
      finishGame={finishGame}
      cells={cells}
      isCorrect={isCorrect}
      word={targetWord}
      handleMenu={handleMenu}
      handleResetWord={handleResetWord}
      indexCell={indexCell}
    />
  );
};

export default Game;
