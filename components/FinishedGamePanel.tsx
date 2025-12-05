import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { ScoresType } from "./GameWrapper";
import { GameState } from "./GameWindow";

export default function FinishedGamePanel({
  setScores,
  setScoreBoardOpen,
  state,
}: {
  setScores: Dispatch<SetStateAction<ScoresType>>;
  setScoreBoardOpen: Dispatch<SetStateAction<boolean>>;
  state: GameState;
}) {
  function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username") as string;
    console.log(name);
    setScores((prev) => [
      ...prev,
      {
        name: name,
        correct: state.results.filter((r) => r === "✅").length,
        questions: state.randomRegionsArray.length,
        incorrectAnswers: state.numberIncorrectAnswers,
      },
    ]);
    setScoreBoardOpen(true);
    e.currentTarget.reset();
  }

  return (
    <div>
      Congrats! you finished the quiz! You found {state.results.filter((r) => r === "✅").length} out of{" "}
      {state.results.length} regions with {state.numberIncorrectAnswers} incorrect answers.
      <div className="flex w-full max-w-sm items-center gap-2">
        <form onSubmit={handleNameSubmit}>
          <Input name="username" type="text" placeholder="Add your name" autoFocus required maxLength={15} />
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
