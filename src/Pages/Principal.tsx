import { Button, Container, Stack, Typography } from "@mui/material";
import Multiplayer from "./Multiplayer";

import SinglePlayer from "./SinglePlayer";
import { useGameContext } from "../context/GameContext";

const Principal = () => {
  const { gamemode, setGamemode } = useGameContext();

  return (
    <>
      {!gamemode ? (
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
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            height: "100vh",
            placeContent: "center",
            /* alignContent: "start", */
          }}
        >
          {gamemode === "single" && <SinglePlayer />}
          {gamemode === "multi" && <Multiplayer />}
        </Container>
      )}
    </>
  );
};

export default Principal;
