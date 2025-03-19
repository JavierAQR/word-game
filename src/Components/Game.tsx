import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameLayout from "./GameLayout";
import { cellType, gameType } from "../types";

interface Props {
  setGame: Dispatch<SetStateAction<gameType | null>>;
  targetWord: string;
}

const Game = ({ setGame, targetWord }: Props) => {
  //cells es el array de elementos, en este caso son 5 columnas X 6 filas, y todas inician como strings vacíos
  const [cells, setCells] = useState<cellType[]>(
    Array(30).fill({ letter: "", result: "" })
  );

  const [currentRow, setCurrentRow] = useState(0); //currentRow indica el indice de la fila actual, primera fila = indice 0
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [finishGame, setFinishGame] = useState(false);

  const arrayCurrentRow = cells.slice(currentRow * 5, (currentRow + 1) * 5); //Se obtiene la fila actual cortando desde el primer indice de la fila, hasta el primero de la siguiente.
  const lettersCurrentRow = arrayCurrentRow.map((item) => item.letter); //Se obtiene solo las letras de la fila actual
  const firstEmptyIndex = lettersCurrentRow.indexOf(""); //Se obtiene la primera celda vacía de izq a der (la próxima a escribir)\
  const wordArray = targetWord.split("");

  const [indexCell, setIndexCell] = useState<number | null>(0);
  console.log(targetWord);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    //Si es una letra
    if (/^[a-zA-Z]$/.test(key)) {
      //Se obtiene el indice del primer elemento vacío en la fila actual
      const focusCell = currentRow * 5 + firstEmptyIndex;

      if (firstEmptyIndex !== -1) {
        const newCells = [...cells];
        newCells[focusCell] = {
          ...newCells[focusCell],
          letter: key.toUpperCase(),
        };
        return setCells(newCells);
      }
    }

    if (key === "Backspace" && firstEmptyIndex !== 0) {
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
      currentRow < 6
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
      console.log(cells);

      if (newResult.every((item) => item === "correct")) setIsCorrect(true);
      else if (currentRow < 5) return setCurrentRow(currentRow + 1);
      return setFinishGame(true);
    }
  };

  const handleFinishGame = () => {
    setGame(null);
  };

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

  

  return (
    <GameLayout
      finishGame={finishGame}
      cells={cells}
      isCorrect={isCorrect}
      word={targetWord}
      handleFinishGame={handleFinishGame}
      indexCell={indexCell}
    />
  );
};

export default Game;
