import { Stack } from "@mui/material";
import MenuButton from "./MenuButton";

const GameFooter = () => {
  return (
    <Stack direction={"column"} sx={{ placeItems: "center" }}>
      <MenuButton />
    </Stack>
  );
};

export default GameFooter;
