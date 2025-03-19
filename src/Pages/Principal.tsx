import { useEffect, useState } from "react";
import { gameType } from "../types";
import { Button, Container, Stack, Typography } from "@mui/material";
import Game from "../Components/Game";
import axios from "axios";

const Principal = () => {
  const [game, setGame] = useState<gameType>(null);
  const [targetWord, setTargetWord] = useState<string>("");

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const response = await axios.get("src/data/words.json");
        const words = response.data;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setTargetWord(randomWord);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRandomWord();
  }, [game]);

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
      {game === "1player" && <Game setGame={setGame} targetWord={targetWord} />}
    </>
  );
};

export default Principal;
