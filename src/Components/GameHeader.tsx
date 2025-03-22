import { Button, Stack, Typography } from "@mui/material";
import { useGameStore } from "../store/game";
import ReactConfetti from "react-confetti";

interface Props {
  handleResetWord?: () => void;
  isCorrect: boolean;
  isFinished: boolean;
}

const GameHeader = ({ handleResetWord, isFinished, isCorrect }: Props) => {
  const targetWord = useGameStore((state) => state.targetWord);

  return (
    <>
      {isCorrect && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          initialVelocityX={2}
          initialVelocityY={0}
        />
      )}
      <Stack
        direction={"column"}
        sx={{
          height: "150px",
          marginTop: "30px",
          display: "grid",
          placeItems: "center",
        }}
      >
        {isFinished ? (
          <>
            <Typography variant="h3" component={"h1"} fontWeight={"bold"}>
              {isCorrect ? "HAZ GANADO" : "PERDISTE"}
            </Typography>
            <Typography variant="h6" component={"h2"}>
              La palabra era: <b>{targetWord}</b>
            </Typography>
            <Button
              onClick={handleResetWord}
              variant="contained"
              sx={{ width: "190px" }}
            >
              Elegir otra palabra
            </Button>
          </>
        ) : (
          <Typography variant="h3" component={"h1"} fontWeight={"bold"}>
            ADIVINA LA PALABRA
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default GameHeader;
