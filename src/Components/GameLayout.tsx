import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Cell from "./Cell";
import { cellType } from "../types";
import Confetti from "react-confetti";

interface Props {
  finishGame: boolean;
  isCorrect: boolean;
  word: string;
  cells: cellType[];
  handleMenu: () => void;
  handleResetWord: () => void;
  indexCell: number;
}

const GameLayout = ({
  handleMenu,
  handleResetWord,
  indexCell,
  finishGame,
  isCorrect,
  word,
  cells,
}: Props) => {
  return (
    <>
      {isCorrect && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          initialVelocityX={10}
          tweenDuration={5000}
        />
      )}
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "grid",
          alignContent: "start",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            height: "150px",
            marginTop: "30px",
            display: "grid",
            placeItems: "center",
          }}
        >
          {finishGame ? (
            <>
              <Typography
                variant="h3"
                component={"h1"}
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {isCorrect ? "HAZ GANADO" : "PERDISTE"}
              </Typography>
              <Typography
                variant="h6"
                component={"h2"}
                sx={{ textAlign: "center" }}
              >
                La palabra era: <b>{word}</b>
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
            <Typography
              variant="h3"
              component={"h1"}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              ADIVINA LA PALABRA
            </Typography>
          )}
        </Stack>
        <Box marginY={4}>
          <Grid2
            container
            component={"ul"}
            spacing={1}
            sx={{ maxWidth: "440px", margin: "auto", padding: "0" }}
          >
            {cells.map((cell, index) => (
              <Cell
                key={index}
                cell={cell}
                index={index}
                cellIsFocus={index === indexCell}
              />
            ))}
          </Grid2>
        </Box>

        <Stack>
          <Button variant="outlined" onClick={handleMenu}>
            Volver al menú
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default GameLayout;
