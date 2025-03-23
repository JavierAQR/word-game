import { Stack, Typography } from "@mui/material";
import ReactConfetti from "react-confetti";
import GameFooter from "./GameFooter";

interface Props {
  handleWinner: () => string | undefined;
}

const WinnerPlayer = ({ handleWinner }: Props) => {
  return (
    <Stack
      spacing={5}
      sx={{
        textAlign: "center",
      }}
    >
      {handleWinner() !== undefined ? (
        <>
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            initialVelocityX={2}
            initialVelocityY={0}
          />
          <Typography variant="h3" component={"h1"}>
            El ganador es:
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            {handleWinner()}
          </Typography>
        </>
      ) : (
        <Typography variant="h2" component={"h1"}>
          EMPATE
        </Typography>
      )}
      <GameFooter />
    </Stack>
  );
};

export default WinnerPlayer;
