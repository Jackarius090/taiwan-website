"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import InputErrorAlert from "./InputErrorAlert";
import { Dispatch, SetStateAction } from "react";
import { ScoresType } from "./GameWrapper";
import { GameState } from "./GameWindow";
import * as z from "zod";
import { uploadScore } from "@/app/actions/scoreboard_data";

export default function FinishedGamePanel({
  setShowFinishedGamePanel,
  setScores,
  setScoreBoardOpen,
  state,
}: {
  setScores: Dispatch<SetStateAction<ScoresType>>;
  setScoreBoardOpen: Dispatch<SetStateAction<boolean>>;
  state: GameState;
  setShowFinishedGamePanel: Dispatch<SetStateAction<boolean>>;
}) {
  const [formError, setFormError] = useState<string | null>(null);

  const usernameType = z
    .string()
    .min(1, "name must be between 1 and 20 characters")
    .max(20, "name must be between 1 and 20 characters")
    .regex(/^[\p{L}0-9]+$/u, "name can only be letters and numbers");

  function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username") as string;
    const result = usernameType.safeParse(name);

    if (result.error) {
      setFormError(z.prettifyError(result.error));
      console.log(z.prettifyError(result.error));
    } else {
      const score = {
        name: name,
        correct: state.results.filter((r) => r === "✅").length,
        questions: state.randomRegionsArray.length,
        incorrectAnswers: state.numberIncorrectAnswers,
      };
      uploadScore(score);
      setShowFinishedGamePanel(false);
      setFormError(null);
      setScores((prev) => [...prev, score]);
      setScoreBoardOpen(true);
      e.currentTarget.reset();
    }
  }

  return (
    <div>
      Congrats! you finished the quiz! You found {state.results.filter((r) => r === "✅").length} out of{" "}
      {state.results.length} regions with {state.numberIncorrectAnswers} incorrect answers.
      <div className="flex w-full max-w-sm items-center gap-2">
        <form onSubmit={handleNameSubmit}>
          <Input name="username" type="text" placeholder="Add your name" autoFocus required maxLength={15} />
          {formError && <InputErrorAlert error={formError} />}
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
