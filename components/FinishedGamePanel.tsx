"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import InputErrorAlert from "./InputErrorAlert";
import { Dispatch, SetStateAction } from "react";
import { GameState } from "./GameWindow";
import * as z from "zod";
import { uploadScore } from "@/app/actions/scoreboard_data";
import { usernameType } from "@/lib/types/zodSchemas";
import { ScoreType } from "@/lib/types/Types";

export default function FinishedGamePanel({
  setShowFinishedGamePanel,
  setScoreBoardOpen,
  state,
}: {
  setScoreBoardOpen: Dispatch<SetStateAction<boolean>>;
  state: GameState;
  setShowFinishedGamePanel: Dispatch<SetStateAction<boolean>>;
}) {
  const [formError, setFormError] = useState<string | null>(null);
  const numberCorrect = state.results.filter((r) => r === "✅").length;

  function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username") as string;
    const result = usernameType.safeParse(name);

    if (result.error) {
      setFormError(z.prettifyError(result.error));
      console.log(z.prettifyError(result.error));
    } else {
      const score: ScoreType = {
        name: name,
        points: state.points,
        correct: numberCorrect,
        incorrectAnswers: state.numberIncorrectAnswers,
        questions: state.randomRegionsArray.length,
      };
      uploadScore(score);
      setShowFinishedGamePanel(false);
      setFormError(null);
      setScoreBoardOpen(true);
      e.currentTarget.reset();
    }
  }

  return (
    <div className="my-4">
      Congrats! you finished the quiz! Your score:
      <ul className="border border-black rounded-md p-3">
        <li>Points: {state.points}</li>
        <li>
          Correct: {numberCorrect} out of {state.randomRegionsArray.length}
        </li>
        <li> Incorrect: {state.numberIncorrectAnswers}</li>
      </ul>
      <div className="flex w-full max-w-sm items-center gap-2">
        <form onSubmit={handleNameSubmit}>
          <Input
            className="my-4 border-black"
            name="username"
            type="text"
            placeholder="Add your name"
            autoFocus
            required
            maxLength={15}
          />
          {formError && <InputErrorAlert error={formError} />}
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
