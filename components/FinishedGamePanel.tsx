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

  function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username") as string;
    const result = usernameType.safeParse(name);

    if (result.error) {
      setFormError(z.prettifyError(result.error));
      console.log(z.prettifyError(result.error));
    } else {
      const numberCorrect = state.results.filter((r) => r === "✅").length;
      const points = numberCorrect * 5;
      const score: ScoreType = {
        name: name,
        points: points,
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
