import { useState } from "react";
import { gameType } from "../types";
import { Button, Container, Stack, Typography } from "@mui/material";
import Game from "../Components/Game";

const Principal = () => {
  const [game, setGame] = useState<gameType>(null);

  return (
    <>
      {!game && (
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
              onClick={() => setGame("1player")}
            >
              1 JUGADOR
            </Button>
            <Button variant="contained" sx={{ width: "200px" }}>
              2 JUGADORES
            </Button>
          </Stack>
        </Container>
      )}
      {game === "1player" && <Game setGame={setGame} />}
    </>
  );
};

export default Principal;
