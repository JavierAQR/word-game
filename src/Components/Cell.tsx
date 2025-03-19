import { Grid2, Paper, Typography } from "@mui/material";
import { cellType } from "../types";

interface Props {
  cell: cellType;
  indexCell: boolean;
}

const Cell = ({ cell, indexCell }: Props) => {
  const bgColor =
    cell.result === "correct"
      ? "green"
      : cell.result === "present"
      ? "orange"
      : cell.result === "absend"
      ? "gray"
      : "#202020";

  const border = indexCell ? "3px solid white" : "2px solid #7f7f7f";

  return (
    <Grid2 size={2.4}>
      <Paper
        elevation={3}
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
        <Typography variant="h3">{cell.letter}</Typography>
      </Paper>
    </Grid2>
  );
};

export default Cell;
