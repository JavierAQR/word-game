import { Box, Grid2 } from "@mui/material";
import Cell from "./Cell";
import { cellType } from "../types";

interface Props {
  cells: cellType[];
  indexCell: number;
}

const CellsLayout = ({ indexCell, cells }: Props) => {
  return (
    <>
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
    </>
  );
};

export default CellsLayout;
