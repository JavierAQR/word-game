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

interface Props {
  finishGame: boolean;
  isCorrect: boolean;
  word: string;
  cells: cellType[];
  handleFinishGame: () => void;
  indexCell: number | null;
}

const GameLayout = ({
  handleFinishGame,
  indexCell,
  finishGame,
  isCorrect,
  word,
  cells,
}: Props) => {
  return (
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
        {finishGame && (
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
            <Button variant="contained" sx={{ width: "190px" }}>
              Elegir otra palabra
            </Button>
          </>
        )}
      </Stack>
      <Box marginY={4}>
        <Grid2 container spacing={1} sx={{ maxWidth: "440px", margin: "auto" }}>
          {cells.map((cell, index) => (
            <Cell key={index} cell={cell} indexCell={index === indexCell} />
          ))}
        </Grid2>
      </Box>

      <Stack>
        <Button variant="outlined" onClick={handleFinishGame}>
          Volver al menú
        </Button>
      </Stack>
    </Container>
  );
};

export default GameLayout;
