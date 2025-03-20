import { Grid2, Paper, Typography } from "@mui/material";
import { cellType } from "../types";

interface Props {
  cell: cellType;
  index: number;
  indexCell: boolean;
}

const Cell = ({ cell, indexCell, index }: Props) => {
  const bgColor =
    cell.result === "correct"
      ? "green"
      : cell.result === "present"
      ? "orange"
      : cell.result === "absend"
      ? "gray"
      : "transparent";

  const border = indexCell ? "3px solid white" : "2px solid #7f7f7f";

  return (
    <Grid2 size={2.4}>
      <Paper
        elevation={3}
        component={"li"}
        data-index={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          width: "100%",
          bgcolor: bgColor,
          borderRadius: "10px",
          border: border,
        }}
      >
        <Typography
          variant="h3"
          zIndex={bgColor === "transparent" ? "-1" : "1"}
        >
          {cell.letter}
        </Typography>
      </Paper>
    </Grid2>
  );
};

export default Cell;
