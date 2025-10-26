import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

export default function QuizBox({
  result,
  makeNewGame,
  setGameRunning,
  gameRunning,
  countryQuestion,
}: {
  result: boolean;
  makeNewGame(): void;
  setGameRunning: Dispatch<SetStateAction<boolean>>;
  gameRunning: boolean;
  countryQuestion: string;
}) {
  function startGameButton() {
    makeNewGame();
    setGameRunning(true);
  }
  return (
    <div className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
      <Button onClick={startGameButton}>Start Game</Button>
      {gameRunning && <div>Where is {countryQuestion}?</div>}
      {result && <div>Correct!</div>}
    </div>
  );
}
