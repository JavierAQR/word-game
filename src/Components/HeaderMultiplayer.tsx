import { Button, Stack, Typography } from "@mui/material";
import { multiplayerType, playersType } from "../types";

interface Props {
  multiState: multiplayerType;
  handleRound: () => void;
  handleReset: () => void;
  players: playersType;
  isFinished: boolean;
  isCorrect: boolean;
}

const HeaderMultiplayer = ({
  multiState,
  players,
  isFinished,
  isCorrect,
  handleRound,
  handleReset,
}: Props) => {
  return (
    <Stack
      direction={"column"}
      spacing={3}
      sx={{
        minHeight: "240px",
        marginTop: "30px",
        placeItems: "center",
      }}
    >
      {!isFinished ? (
        <Typography variant="h3" component={"h1"} fontWeight={"bold"}>
          ADIVINA LA PALABRA
        </Typography>
      ) : (
        <>
          <Typography variant="h3" component={"h1"} fontWeight={"bold"}>
            {isCorrect ? "ACERTASTE +100" : "FALLASTE +0"}
          </Typography>
        </>
      )}
      <Typography variant="h4" component={"h1"} fontWeight={"bold"}>
        {`Ronda ${multiState.turn}: Turno de ${
          players[multiState.currentPlayer].name
        }`}
      </Typography>
      <Typography variant="h5">
        {`${players.player1.name}: ${players.player1.score} ptos  - `}
        {`${players.player2.name}: ${players.player2.score} ptos`}
      </Typography>
      {isFinished && (
        <Button
          onClick={() => {
            handleRound();
            handleReset();
          }}
          variant="contained"
          sx={{ width: "190px" }}
        >
          Siguiente ronda
        </Button>
      )}
    </Stack>
  );
};

export default HeaderMultiplayer;
