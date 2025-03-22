import { Button, Container, Stack, Typography } from "@mui/material";
import Game from "../Components/Game";
import Multiplayer from "./Multiplayer";
import { useGameStore } from "../store/game";

const Principal = () => {
  const gamemode = useGameStore((state) => state.gamemode);
  const setGamemode = useGameStore((state) => state.setGamemode);

  return (
    <>
      {!gamemode && (
        <Container
          maxWidth="sm"
          sx={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
          <Stack spacing={5} sx={{ display: "grid", placeItems: "center" }}>
            <Typography
              variant="h2"
              component={"h1"}
              sx={{ textAlign: "center" }}
            >
              Word Game
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "200px" }}
              onClick={() => setGamemode("single")}
            >
              1 JUGADOR
            </Button>
            <Button
              variant="contained"
              sx={{ width: "200px" }}
              onClick={() => setGamemode("multi")}
            >
              2 JUGADORES
            </Button>
          </Stack>
        </Container>
      )}
      {gamemode === "single" && <Game />}
      {gamemode === "multi" && <Multiplayer />}
    </>
  );
};

export default Principal;
