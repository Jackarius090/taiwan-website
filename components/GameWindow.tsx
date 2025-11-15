"use client";

import { useReducer } from "react";
import { Button } from "./ui/button";
import regions from "../lib/regions.json";
import MapButtons from "./MapButtons";
import { Region } from "@/lib/types/Region";

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

type GameState = {
  gameRunning: boolean;
  countryQuestion: string | undefined;
  randomRegionsArray: Region[];
  result: boolean;
  questionIndex: number;
  guess: string;
  showIncorrect: boolean;
  results: string[];
  tries: number;
  finishedQuiz: boolean;
};

type GameActions =
  | { type: "START_GAME"; payload: Region[] }
  | { type: "CORRECTANSWER"; payload: string }
  | { type: "INCORRECTANSWER"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISHED_QUIZ" }
  | { type: "RESET" };

const initialState: GameState = {
  gameRunning: false,
  countryQuestion: "",
  randomRegionsArray: makeRandomRegionsArray(),
  result: false,
  questionIndex: 0,
  guess: "",
  showIncorrect: false,
  results: [],
  tries: 3,
  finishedQuiz: false,
};

function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "START_GAME":
      const newRegionArray = makeRandomRegionsArray();
      return {
        ...state,
        gameRunning: true,
        countryQuestion: newRegionArray[0].name,
        randomRegionsArray: newRegionArray,
        questionIndex: 0,
        results: [],
        tries: 3,
      };
    case "CORRECTANSWER":
      const nextIndex = state.questionIndex + 1;
      return {
        ...state,
        result: true,
        countryQuestion: state.randomRegionsArray?.[nextIndex]?.name,
        questionIndex: nextIndex,
        guess: action.payload,
        showIncorrect: false,
        results: [...state.results, "✅"],
        tries: 3,
      };
    case "INCORRECTANSWER":
      if (state.tries === 1) {
        const nextIndex = state.questionIndex + 1;
        return {
          ...state,
          result: false,
          countryQuestion: state.randomRegionsArray?.[nextIndex]?.name,
          questionIndex: nextIndex,
          guess: action.payload,
          showIncorrect: false,
          results: [...state.results, "✅"],
          tries: 3,
        };
      }
      return {
        ...state,
        result: false,
        guess: action.payload,
        showIncorrect: true,
        tries: state.tries - 1,
      };
    case "FINISHED_QUIZ":
      return {
        ...state,
        gameRunning: false,
        countryQuestion: "Congrats! You finished the quiz!",
        showIncorrect: false,
        finishedQuiz: true,
      };
    default:
      return state;
  }
}

export default function GameWindow() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  function handleRegionClick(answer: string) {
    if (answer === state.countryQuestion) {
      dispatch({ type: "CORRECTANSWER", payload: answer });
    } else {
      dispatch({ type: "INCORRECTANSWER", payload: answer });
    }
    if (state.questionIndex >= state.randomRegionsArray?.length - 1) {
      console.log("finished");
      dispatch({ type: "FINISHED_QUIZ" });
    }
  }

  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons handleRegionClick={handleRegionClick} />
      </div>
      <div className="w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
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
          <div className="my-3 p-2 font-bold"> {state.gameRunning && <div>Where is {state.countryQuestion}?</div>}</div>
          {state.finishedQuiz && (
            <div>
              Congrats! you finished the quiz! You got {state.results.filter(() => "✅").length} out of{" "}
              {state.results.length} correct.
            </div>
          )}
          <div className="my-3 p-2"> {state.result && <div className="bg-green-500 rounded-md p-2">Correct!</div>}</div>
          <div className="my-3 p-2">
            {state.showIncorrect && <div className="bg-red-500 rounded-md p-2">Wrong! That&apos;s {state.guess}!</div>}
          </div>
          {state.gameRunning && <div className="my-3 p-2">Tries left: {state.tries}</div>}
          <div className="grid grid-cols-2 gap-1">
            {state.results.map((answer, i) => {
              return (
                <div key={i}>
                  {answer ? i + 1 + "." : ""} {answer}
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
