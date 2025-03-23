import { Button, Stack, Typography } from "@mui/material";
import { useGameStore } from "../store/game";
import { useGameContext } from "../context/GameContext";
import { useCellsContext } from "../context/CellContext";
import { ReactNode } from "react";

interface Props {
  msgWin: string;
  msgLoose: string;
  msgButton: string;
  height: number;
  functionExtra?: () => void;
  children?: ReactNode;
}

const GameHeader = ({
  msgButton,
  msgWin,
  msgLoose,
  children,
  height,
  functionExtra,
}: Props) => {
  const targetWord = useGameStore((state) => state.targetWord);
  const { isCorrect, isFinished, handleResetGame } = useGameContext();
  const { resetCells } = useCellsContext();

  return (
    <>
      <Stack
        direction={"column"}
        spacing={1}
        sx={{
          height: `${height}px`,
          display: "grid",
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
              {isCorrect ? msgWin : msgLoose}
            </Typography>
            <Typography variant="h6" component={"h2"}>
              La palabra era: <b>{targetWord}</b>
            </Typography>
            <Button
              onClick={() => {
                functionExtra && functionExtra();
                handleResetGame();
                resetCells();
              }}
              variant="contained"
              sx={{ width: "190px" }}
            >
              {msgButton}
            </Button>
          </>
        )}
        {children}
      </Stack>
    </>
  );
};

export default GameHeader;
