import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { multiplayerType, playersInitial, playersType } from "../types";
import Game from "../Components/Game";
import MenuButton from "../Components/MenuButton";
import HeaderMultiplayer from "../Components/HeaderMultiplayer";
import { useGameContext } from "../context/GameContext";

const Multiplayer = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [players, setPlayers] = useState<playersType>(playersInitial);
  const { isCorrect } = useGameContext();
  const [isGameReady, setIsGameReady] = useState(false);
  const [multiState, setMultiState] = useState<multiplayerType>({
    currentPlayer: "player1",
    turn: 0,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlayers({
      player1: { ...players.player1, name: input1 },
      player2: { ...players.player2, name: input2 },
    });
    setMultiState({
      currentPlayer: "player1",
      turn: 1,
    });
    setIsGameReady(true);
  };

  const handleRound = () => {
    setMultiState((prev) => ({
      ...multiState,
      turn: prev.turn + 1,
    }));
  };

  const handleScore = (player: string) => {
    if (player === "player1") {
      setPlayers((prev) => ({
        ...players,
        player1: { ...prev.player1, score: prev.player1.score + 100 },
      }));
    } else {
      setPlayers((prev) => ({
        ...prev,
        player2: { ...prev.player2, score: prev.player2.score + 100 },
      }));
    }
  };

  useEffect(() => {
    if (!multiState) {
      return;
    }
    if (multiState.turn % 2 === 0) {
      setMultiState({
        ...multiState,
        currentPlayer: "player2",
      });
    } else {
      setMultiState({
        ...multiState,
        currentPlayer: "player1",
      });
    }
  }, [multiState?.turn]);

  useEffect(() => {
    if (isCorrect) {
      handleScore(multiState.currentPlayer);
    }
  }, [multiState, isCorrect]);

  return (
    <>
      {!isGameReady ? (
        <>
          <Stack
            direction={"column"}
            spacing={15}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" fontWeight={"bold"} component={"h1"}>
              MULTIJUGADOR
            </Typography>
            <Stack spacing={5} display={"grid"} sx={{ placeItems: "center" }}>
              <Typography variant="h4" component={"h2"}>
                Ingresar nombre para cada jugador:
              </Typography>
              <Stack
                onSubmit={onSubmit}
                component={"form"}
                spacing={2}
                sx={{ width: "300px" }}
              >
                <TextField
                  label="Jugador 1"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  required
                />
                <TextField
                  label="Jugador 2"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained">
                  Empezar juego
                </Button>
              </Stack>
            </Stack>
            <MenuButton />
          </Stack>
        </>
      ) : (
        <>
          <HeaderMultiplayer
            handleRound={handleRound}
            multiState={multiState}
            players={players}
          />
          <Game />
        </>
      )}
    </>
  );
};

export default Multiplayer;
