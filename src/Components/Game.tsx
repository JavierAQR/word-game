import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameLayout from "./GameLayout";
import { cellType, gameType } from "../types";

interface Props {
  setGame: Dispatch<SetStateAction<gameType | null>>;
}

const word = "CARRO";
const wordArray = word.split("");

const Game = ({ setGame }: Props) => {
  //cells es el array de elementos, en este caso son 5 columnas X 6 filas, y todas inician como strings vacíos
  const [cells, setCells] = useState<cellType[]>(
    Array(30).fill({ letter: "", result: "" })
  );
  const [currentRow, setCurrentRow] = useState(0); //currentRow indica el indice de la fila actual, primera fila = indice 0
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [finishGame, setFinishGame] = useState(false);

  const firstIndexRow = currentRow * 5; //Indice del primer elemento de la fila actual
  const firstIndexNextRow = (currentRow + 1) * 5; //Indice del primer elemento de la fila siguiente (fila actual + 1)
  const arrayCurrentRow = cells.slice(firstIndexRow, firstIndexNextRow); //Se obtiene del array original, el array de la fila actual;
  const lettersCurrentRow = arrayCurrentRow.map((item) => item.letter);
  const firstEmptyIndex = lettersCurrentRow.indexOf("");

  const [indexCell, setIndexCell] = useState<number | null>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    //Si es una letra
    if (/^[a-zA-Z]$/.test(key)) {
      //Se obtiene el indice del primer elemento vacío en la fila actual
      if (firstEmptyIndex !== -1) {
        const newCells = [...cells];

        newCells[firstIndexRow + firstEmptyIndex] = {
          ...newCells[firstIndexRow + firstEmptyIndex],
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
    // Solo se puede pasar a la siguiente fila si todos los items están llenos y si la fila es menor a 5 (0-4)
    if (
      key === "Enter" &&
      arrayCurrentRow.every((cell) => cell.letter !== "") &&
      currentRow < 6
    ) {
      //Primer paso, se crea un array de string newResult
      const newResult: string[] = [];
      const wordControl = [...wordArray]; //Se crea una copia de la palabra a adivinar, para llevar un control de que letras faltan.
      lettersCurrentRow.forEach((item, index) => {
        //Se itera cada item de nuestra fila y se revisa si la letra coincide en la posicion de la palabra a adivinar.
        if (item === wordArray[index]) {
          //Dependiendo de si coincide, si pertecene o si no pertenece se agrega al array de resultados un string diferente.
          newResult.push("correct");
          wordControl.splice(wordControl.indexOf(item), 1);
        } else if (wordControl.includes(item)) {
          newResult.push("present");
          wordControl.splice(wordControl.indexOf(item), 1);
        } else {
          newResult.push("absend");
        }
      }); //Al final debe haber 5 resultados en el array, cada resultado coincide con su celda correspondiente en el mismo índice.

      const newCells = [...cells]; //Segundo paso, se crea una copia de las celdas actuales
      for (let i = 0; i < 5; i++) {
        //Se crea un bucle que se recorre 5 veces
        const cellIndex = currentRow * 5 + i; // Calcular el índice de la celda actual en el array cells
        newCells[cellIndex] = {
          ...newCells[cellIndex], // Copiar las propiedades existentes (letter)
          result: newResult[i], // Asignar el resultado correspondiente a la celda correspondiente.
        };
      }
      setCells(newCells);

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
    if (!finishGame) {
      document.addEventListener("keydown", handleKeyDown);
      if (firstEmptyIndex !== -1) {
        setIndexCell(currentRow * 5 + firstEmptyIndex);
      } else {
        setIndexCell(null);
      }
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
      word={word}
      handleFinishGame={handleFinishGame}
      indexCell={indexCell}
    />
  );
};

export default Game;
