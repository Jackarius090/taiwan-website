"use client";

import { useReducer, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import MapButtons from "./MapButtons";
import FinishedGamePanel from "./FinishedGamePanel";
import { Region } from "@/lib/types/Types";
import regions from "../lib/regions.json";

//Fisher-Yates shuffle algorithm from stack overflow
function makeRandomRegionsArray() {
  const newArray = [...regions];
  let currentIndex = newArray.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export type GameState = {
  gameRunning: boolean;
  countryQuestion: Region | null;
  randomRegionsArray: Region[];
  result: boolean | null;
  questionIndex: number;
  guess: string;
  showIncorrect: boolean;
  results: string[];
  points: number;
  tries: number;
  finishedQuiz: boolean;
  numberIncorrectAnswers: number;
  chineseMode: boolean;
};

type GameActions =
  | { type: "START_GAME"; payload: Region[] }
  | { type: "CORRECTANSWER"; payload: string }
  | { type: "INCORRECTANSWER"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISHED_QUIZ" }
  | { type: "RESET" }
  | { type: "CHINESEMODE" };

const initialState: GameState = {
  gameRunning: false,
  countryQuestion: null,
  randomRegionsArray: makeRandomRegionsArray(),
  result: null,
  questionIndex: 0,
  guess: "",
  showIncorrect: false,
  results: [],
  points: 0,
  tries: 3,
  finishedQuiz: false,
  numberIncorrectAnswers: 0,
  chineseMode: false,
};

function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "START_GAME":
      const newRegionArray = makeRandomRegionsArray();
      return {
        ...state,
        gameRunning: true,
        countryQuestion: newRegionArray[0],
        randomRegionsArray: newRegionArray,
        result: null,
        questionIndex: 0,
        results: [],
        points: 0,
        tries: 3,
        finishedQuiz: false,
        numberIncorrectAnswers: 0,
      };
    case "CORRECTANSWER":
      const nextIndex = state.questionIndex + 1;
      return {
        ...state,
        result: true,
        countryQuestion: state.randomRegionsArray?.[nextIndex],
        questionIndex: nextIndex,
        guess: action.payload,
        showIncorrect: false,
        results: [...state.results, "✅"],
        tries: 3,
        points: state.points + state.tries,
      };
    case "INCORRECTANSWER":
      if (state.tries === 1) {
        const nextIndex = state.questionIndex + 1;
        return {
          ...state,
          result: false,
          countryQuestion: state.randomRegionsArray?.[nextIndex],
          questionIndex: nextIndex,
          guess: action.payload,
          showIncorrect: false,
          results: [...state.results, "❌"],
          tries: 3,
          numberIncorrectAnswers: state.numberIncorrectAnswers + 1,
        };
      }
      return {
        ...state,
        result: false,
        guess: action.payload,
        showIncorrect: true,
        tries: state.tries - 1,
        numberIncorrectAnswers: state.numberIncorrectAnswers + 1,
      };

    case "FINISHED_QUIZ":
      return {
        ...state,
        gameRunning: false,
        showIncorrect: false,
        finishedQuiz: true,
      };
    case "CHINESEMODE":
      return {
        ...state,
        chineseMode: !state.chineseMode,
      };
    default:
      return state;
  }
}

export default function GameWindow({ setScoreBoardOpen }: { setScoreBoardOpen: Dispatch<SetStateAction<boolean>> }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [showFinishedGamePanel, setShowFinishedGamePanel] = useState(false);

  function handleRegionClick(answer: string) {
    if (!state.gameRunning || state.finishedQuiz) return;

    if (answer === state.countryQuestion?.name) {
      dispatch({ type: "CORRECTANSWER", payload: answer });
    } else {
      dispatch({ type: "INCORRECTANSWER", payload: answer });
    }
    // this logic handles the final question and finishes the quiz.
    if (
      state.questionIndex >= state.randomRegionsArray?.length - 1 &&
      (answer === state.countryQuestion?.name || state.tries === 1)
    ) {
      setShowFinishedGamePanel(true);
      dispatch({ type: "FINISHED_QUIZ" });
    }
  }

  return (
    <main role="main" className="flex flex-col md:flex-row h-[90vh]">
      <div className="bg-blue-200 md:w-3/4 rounded-md">
        <MapButtons handleRegionClick={handleRegionClick} />
      </div>
      <div className="md:w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 md:ml-4 bg-amber-300">
          <div className="flex items-center space-x-2">
            <Switch onClick={() => dispatch({ type: "CHINESEMODE" })} id="chinese-mode" />
            <Label htmlFor="chinese-mode">Chinese mode</Label>
          </div>
          <Button
            variant="outline"
            className="my-3"
            onClick={() => dispatch({ type: "START_GAME", payload: makeRandomRegionsArray() })}
          >
            {state.gameRunning ? "Restart Game" : "Start Game"}
          </Button>
          <div className="my-3 p-2">
            {state.gameRunning &&
              state.randomRegionsArray &&
              `Question ${state.questionIndex + 1} of ${state.randomRegionsArray.length}`}
          </div>
          <div className="my-3 p-2 font-bold">
            {state.gameRunning && !state.chineseMode && <div>Where is {state.countryQuestion?.name}</div>}
            {state.gameRunning && state.chineseMode && <div>Where is {state.countryQuestion?.chineseName}</div>}
          </div>
          {showFinishedGamePanel && (
            <FinishedGamePanel
              state={state}
              setScoreBoardOpen={setScoreBoardOpen}
              setShowFinishedGamePanel={setShowFinishedGamePanel}
            />
          )}
          <div className="my-3 p-2"> {state.result && <div className="bg-green-500 rounded-md p-2">Correct!</div>}</div>
          <div className="my-3 p-2">
            {state.showIncorrect && <div className="bg-red-500 rounded-md p-2">Wrong! That&apos;s {state.guess}!</div>}
          </div>
          {state.gameRunning && <div className="my-3 p-2">Tries left: {state.tries}</div>}
          {state.gameRunning && <div className="my-3 p-2">Incorrect: {state.numberIncorrectAnswers}</div>}
          {state.gameRunning && <div className="my-3 p-2">Points: {state.points}</div>}
          <div className="grid grid-cols-2 gap-1">
            {state.results.map((answer, i) => {
              return (
                <span key={i}>
                  {answer ? i + 1 + "." : ""} {answer}
                </span>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
}
