import ReactConfetti from "react-confetti";
import Game from "../Components/Game";
import GameHeader from "../Components/GameHeader";
import { useGameContext } from "../context/GameContext";
const SinglePlayer = () => {
  const { isCorrect } = useGameContext();

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
      <GameHeader
        height={140}
        msgWin="HAZ GANADO"
        msgLoose="PERDISTE"
        msgButton="Elegir otra palabra"
      />
      <Game />
    </>
  );
};

export default SinglePlayer;
