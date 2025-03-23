import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { GameContextProvider } from "./context/GameContext.tsx";
import { CellContextProvider } from "./context/CellContext.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GameContextProvider>
        <CellContextProvider>
          <App />
        </CellContextProvider>
      </GameContextProvider>
    </ThemeProvider>
  </StrictMode>
);
