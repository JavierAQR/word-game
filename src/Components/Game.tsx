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
  const lettersCurrentRow = arrayCurrentRow.map((item) => item.letter); //Se obtiene solo las letras de la fila actual
  const [indexCell, setIndexCell] = useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    const firstIndexRow = currentRow * 5;
    const lastIndexRow = (currentRow + 1) * 5 - 1;
    //Si es una letra
    if (/^[a-zA-Z]$/.test(key) && indexCell !== -1) {
      //Se obtiene el indice del primer elemento vacío en la fila actual
      if (indexCell <= lastIndexRow) {
        const newCells = [...cells];
        newCells[indexCell] = {
          ...newCells[indexCell],
          letter: key.toUpperCase(),
        };
        setCells(newCells);
      }

      if (indexCell + 1 <= lastIndexRow) {
        setIndexCell((prev) => prev + 1);
      } else {
        setIndexCell(-1);
      }
    }

    if (key === "Backspace") {
      const newCells = [...cells];

      if (indexCell === -1) {
        setIndexCell(firstIndexRow + 4);
        newCells[firstIndexRow + 4].letter = "";
        return setCells(newCells);
      }

      if (newCells[firstIndexRow + indexCell].letter !== "") {
        newCells[indexCell].letter = "";
      } else if (newCells[firstIndexRow + indexCell].letter === "") {
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
      const newResult: string[] = Array(5).fill("");
      const wordControl = [...wordArray];

      lettersCurrentRow.forEach((item, index) => {
        if (item === wordArray[index]) {
          newResult[index] = "correct";
          wordControl.splice(wordControl.indexOf(item), 1);
        }
      });

      lettersCurrentRow.forEach((item, index) => {
        if (!(newResult[index] === "")) {
          return;
        }
        if (wordControl.includes(item)) {
          wordControl.splice(wordControl.indexOf(item), 1);
          return (newResult[index] = "present");
        }
        return (newResult[index] = "absend");
      });

      const newCells = [...cells];
      for (let i = 0; i < 5; i++) {
        const cellIndex = firstIndexRow + i;
        newCells[cellIndex] = {
          ...newCells[cellIndex],
          result: newResult[i],
        };
      }
      setCells(newCells);

      if (newResult.every((item) => item === "correct")) setIsCorrect(true);
      else if (currentRow < 5) {
        setIndexCell((currentRow + 1) * 5);
        return setCurrentRow(currentRow + 1);
      }
      setFinishGame(true);
    }
  };

  const handleMenu = () => {
    setGame(null);
  };

  const handleResetWord = () => {
    setIsCorrect(false);
    setFinishGame(false);
    setCells(Array(30).fill({ letter: "", result: "" }));
    setIndexCell(0);
    setCurrentRow(0);
    fetchNewWord();
  };

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
