import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { cellType } from "../types";

interface Props {
  children: ReactNode;
}

interface CellContextType {
  cells: cellType[];
  setCells: Dispatch<SetStateAction<cellType[]>>;
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
  indexCell: number;
  setIndexCell: Dispatch<SetStateAction<number>>;
  resetCells: () => void;
}

export const CellContext = createContext<CellContextType | null>(null);

export function CellContextProvider({ children }: Props) {
  const [cells, setCells] = useState<cellType[]>(
    Array(30).fill({ letter: "", result: "" })
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [indexCell, setIndexCell] = useState<number>(0);

  const resetCells = () => {
    setCells(Array(30).fill({ letter: "", result: "" }));
    setCurrentRow(0);
  };

  const valor = {
    cells,
    setCells,
    currentRow,
    setCurrentRow,
    indexCell,
    setIndexCell,
    resetCells,
  };

  return <CellContext.Provider value={valor}>{children}</CellContext.Provider>;
}

export function useCellsContext() {
  const cellContext = useContext(CellContext);

  if (!cellContext) {
    throw new Error("cellContext debe usarse dentro de CellContextProvider");
  }

  return cellContext;
}
