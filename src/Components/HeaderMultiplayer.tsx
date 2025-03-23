import { Typography } from "@mui/material";
import { multiplayerType, playersType } from "../types";
import GameHeader from "./GameHeader";

interface Props {
  multiState: multiplayerType;
  handleRound: () => void;
  players: playersType;
}

const HeaderMultiplayer = ({ multiState, players, handleRound }: Props) => {
  return (
    <>
      <Typography
        variant="h5"
        component={"h1"}
        fontWeight={"bold"}
        textAlign={"center"}
        marginBottom={3}
      >
        {`Ronda (${multiState.turn}/8): Turno de ${
          players[multiState.currentPlayer].name
        }`}
      </Typography>
      <GameHeader
        height={200}
        msgWin="ACERTASTE"
        msgLoose="FALLASTE"
        msgButton="Siguiente turno"
        functionExtra={handleRound}
      >
        <Typography variant="h6">
          {`${players.player1.name}: ${players.player1.score} ptos  - `}
          {`${players.player2.name}: ${players.player2.score} ptos`}
        </Typography>
      </GameHeader>
    </>
  );
};

export default HeaderMultiplayer;
