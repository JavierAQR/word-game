import { useCellsContext } from "../context/CellContext";
import { useGameContext } from "../context/GameContext";
import { Button } from "@mui/material";

const MenuButton = () => {
  const { setGamemode } = useGameContext();
  const { resetCells } = useCellsContext();

  return (
    <Button
      variant="outlined"
      sx={{ width: "200px" }}
      onClick={() => {
        setGamemode(null);
        resetCells();
      }}
    >
      Volver al menú
    </Button>
  );
};

export default MenuButton;
