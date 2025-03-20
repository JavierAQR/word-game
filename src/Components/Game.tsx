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
  const [indexCell, setIndexCell] = useState<number | null>(0);

  const arrayCurrentRow = cells.slice(currentRow * 5, (currentRow + 1) * 5); //Se obtiene la fila actual cortando desde el primer indice de la fila, hasta el primero de la siguiente.
  const lettersCurrentRow = arrayCurrentRow.map((item) => item.letter); //Se obtiene solo las letras de la fila actual
  const firstEmptyIndex = lettersCurrentRow.indexOf(""); //Se obtiene la primera celda vacía de izq a der (la próxima a escribir)\

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    //Si es una letra
    if (/^[a-zA-Z]$/.test(key)) {
      //Se obtiene el indice del primer elemento vacío en la fila actual
      const focusCellIndex = currentRow * 5 + firstEmptyIndex;
      if (firstEmptyIndex !== -1) {
        const newCells = [...cells];
        newCells[focusCellIndex] = {
          ...newCells[focusCellIndex],
          letter: key.toUpperCase(),
        };
        return setCells(newCells);
      }
    }

    if (key === "Backspace") {
      console.log(currentRow * 5 + firstEmptyIndex);

      // Si es la tecla de borrar
      //Se obtiene el indice de la ultima celda vacía
      const lastFilledIndex = lettersCurrentRow.indexOf("");
      //Si la primera celda vacia no es la primera, es decir si hay por lo menos una letra agregada.
      if (lastFilledIndex > 0) {
        const newCells = [...cells]; //Se hace una copia actual de las celdas
        newCells[currentRow * 5 + lastFilledIndex - 1].letter = ""; //En la fila actual, se obtiene el elemento anterior al primer elemento vacío encontrado
        // (osea el ultimo elemento agregado), y se setea como ""
        setCells(newCells); //Finalmente se guarda en el array original.

        //Si no hay celdas vacías, es decir toda la fila está completa
      } else if (lastFilledIndex === -1) {
        const newCells = [...cells]; //Se hace copia del array
        newCells[currentRow * 5 + 4].letter = ""; //Se obtiene el ultimo de los 5 elementos (0-4, en caso de ser la fila 0), y se setea como ""
        return setCells(newCells); //Finalmente se guarda en el array original
      }
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
        const cellIndex = currentRow * 5 + i;
        newCells[cellIndex] = {
          ...newCells[cellIndex],
          result: newResult[i],
        };
      }
      setCells(newCells);

      if (newResult.every((item) => item === "correct")) setIsCorrect(true);
      else if (currentRow < 5) return setCurrentRow(currentRow + 1);
      return setFinishGame(true);
    }
  };

  const handleGameMode = () => {
    setGame(null);
  };

  const handleResetWord = () => {
    setFinishGame(false);
    setCells(Array(30).fill({ letter: "", result: "" }));
    setCurrentRow(0);
    fetchNewWord();
  };

  useEffect(() => {
    const currentCells = document.querySelectorAll("li");

    // Obtener el indice y marcar indexCell
    // Falta hacer que la celda seleccionada sea la proxima a cambiar
    // Averiguar como se usa useRef, debe servir de algo.
    const handleClickCell = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.index) {
        const index = parseInt(target.dataset.index, 10);
        setIndexCell(index);
      }
    };

    currentCells.forEach((cell, index) => {
      if (index >= currentRow * 5 && index < (currentRow + 1) * 5) {
        cell.addEventListener("click", handleClickCell);
      }
    });

    return () => {
      currentCells.forEach((cell) => {
        cell.removeEventListener("click", handleClickCell);
      });
    };
  }, [currentRow, indexCell]);

  // Agregar el event listener al montar el componente
  useEffect(() => {
    if (firstEmptyIndex !== -1) {
      setIndexCell(currentRow * 5 + firstEmptyIndex);
    } else {
      setIndexCell(null);
    }
    if (!finishGame) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cells, currentRow]);

  useEffect(() => {
    handleResetWord();
  }, []);

  return (
    <GameLayout
      finishGame={finishGame}
      cells={cells}
      isCorrect={isCorrect}
      word={targetWord}
      handleGameMode={handleGameMode}
      handleResetWord={handleResetWord}
      indexCell={indexCell}
    />
  );
};

export default Game;
