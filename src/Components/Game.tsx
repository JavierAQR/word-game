import { useEffect } from "react";
import { useGameStore } from "../store/game";

import CellsLayout from "./CellsLayout";
import GameFooter from "./GameFooter";
import { useGameContext } from "../context/GameContext";
import { useCellsContext } from "../context/CellContext";

const Game = () => {
  const { isCorrect, isFinished, setIsCorrect, setIsFinished } =
    useGameContext();

  const {
    cells,
    currentRow,
    setCells,
    setCurrentRow,
    setIndexCell,
    indexCell,
  } = useCellsContext();
  const { targetWord, fetchNewWord } = useGameStore((state) => state);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    const firstIndexRow = currentRow * 5;
    const lastIndexRow = (currentRow + 1) * 5 - 1;
    const newCells = [...cells];
    const arrayCurrentRow = newCells.slice(firstIndexRow, lastIndexRow + 1);

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

      if (indexCell !== firstIndexRow) setIndexCell((prev) => prev - 1);

      setCells(newCells);
    }

    // Si es la tecla de enviar
    // Solo se puede pasar a la siguiente fila si todos los items están llenos y si la fila es menor a 5 (0-4) (max penultima fila)
    if (
      key === "Enter" &&
      arrayCurrentRow.every((cell) => cell.letter !== "") &&
      currentRow <= 5
    ) {
      const wordControl = targetWord.split("");

      arrayCurrentRow.forEach((item, index) => {
        const cellIndex = firstIndexRow + index;
        if (item.letter === targetWord[index]) {
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
          let result = "absend";

          if (newCells[cellIndex].result === "correct") {
            return;
          }
          if (wordControl.includes(item.letter)) {
            result = "present";
            wordControl.splice(wordControl.indexOf(item.letter), 1);
          }
          newCells[cellIndex] = {
            ...newCells[cellIndex],
            result: result,
          };
        });
      }
      setCurrentRow((prev) => prev + 1);
      setCells(newCells);
    }
  };

  useEffect(() => {
    if (!isFinished) {
      fetchNewWord();
    }
  }, [isFinished]);

  useEffect(() => {
    if (isCorrect === true || currentRow > 5) {
      return setIsFinished(true);
    }
    setIndexCell(currentRow * 5);
  }, [currentRow]);

  useEffect(() => {
    if (!isFinished) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [indexCell, isFinished]);

  useEffect(() => {
    const currentCells = document.querySelectorAll("li");

    const handleClickCell = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.index) {
        const index = parseInt(target.dataset.index, 10);
        setIndexCell(index);
      }
    };

    if (!isFinished) {
      currentCells.forEach((cell, index) => {
        if (index >= currentRow * 5 && index < (currentRow + 1) * 5) {
          cell.addEventListener("click", handleClickCell);
          cell.style.cursor = "pointer";
        }
      });
    }

    return () => {
      currentCells.forEach((cell) => {
        cell.removeEventListener("click", handleClickCell);
      });
    };
  }, [currentRow, isFinished]);

  return (
    <>
      <CellsLayout />
      <GameFooter />
    </>
  );
};

export default Game;
