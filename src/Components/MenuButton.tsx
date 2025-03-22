import { useGameStore } from "../store/game";
import { Button } from "@mui/material";

const MenuButton = () => {
  const setGamemode = useGameStore((state) => state.setGamemode);
  return (
    <Button
      variant="outlined"
      sx={{ width: "200px" }}
      onClick={() => {
        setGamemode(null);
      }}
    >
      Volver al menú
    </Button>
  );
};

export default MenuButton;
