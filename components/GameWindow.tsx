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

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

type GameState = {
  gameRunning: boolean;
  countryQuestion: string | undefined;
  randomRegionsArray: Region[] | null;
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
  | { type: "ANSWER"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH_QUIZ" }
  | { type: "RESET" };

const initialState: GameState = {
  gameRunning: false,
  countryQuestion: "",
  randomRegionsArray: null,
  result: false,
  questionIndex: 0,
  guess: "",
  showIncorrect: false,
  results: [""],
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
        tries: 3,
      };
    case "ANSWER":
      if (action.payload === state.countryQuestion) {
        const nextIndex = state.questionIndex + 1;
        return {
          ...state,
          result: true,
          countryQuestion: state.randomRegionsArray?.[nextIndex]?.name,
          questionIndex: 0,
          guess: action.payload,
          showIncorrect: false,
          results: [...state.results, "✅"],
          tries: 3,
        };
      } else if (action.payload != state.countryQuestion) {
        return {
          ...state,
          result: false,
          guess: action.payload,
          showIncorrect: true,
          tries: state.tries - 1,
        };
      }
    default:
      return state;
  }
}

export default function GameWindow() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons dispatch={dispatch} />
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
          {/* {state.finishedQuiz && (
            <div>
              Congrats! you finished the quiz! You got {correctAnswers.length} out of {state.results.length} correct.
            </div>
          )} */}
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

// "use client";

// import { useState } from "react";
// import { Button } from "./ui/button";
// import regions from "../lib/regions.json";
// import MapButtons from "./MapButtons";
// import { Region } from "@/lib/types/Region";

// export default function GameWindow() {
//   const [gameRunning, setGameRunning] = useState(false);
//   const [countryQuestion, setCountryQuestion] = useState("");
//   const [randomRegionsArray, setRandomRegionsArray] = useState<Region[] | null>(null);
//   const [result, setResult] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [guess, setGuess] = useState("");
//   const [showIncorrect, setShowIncorrect] = useState(false);
//   const [results, setResults] = useState<string[]>([]);
//   const [tries, setTries] = useState(3);
//   const [finishedQuiz, setFinishedQuiz] = useState(false);

//   //Fisher-Yates shuffle algorithm from stack overflow
//   function makeRandomRegionsArray() {
//     const newArray = [...regions];
//     let currentIndex = newArray.length;

//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
//       // Pick a remaining element...
//       const randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       // And swap it with the current element.
//       [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
//     }
//     return newArray;
//   }

//   function makeNewGame() {
//     const newRegionArray = makeRandomRegionsArray();
//     setQuestionIndex(0);
//     setRandomRegionsArray(newRegionArray);
//     setCountryQuestion(newRegionArray[0].name);
//     setResult(false);
//     setTries(3);
//   }

//   function handleRegionClick(region: Region) {
//     const answer = region.name;
//     if (!gameRunning) {
//       return;
//     }

//     setGuess(answer);
//     if (answer === countryQuestion) {
//       setResults((prev) => [...prev, "✅"]);

//       setResult(true);
//       setTries(3);
//       setShowIncorrect(false);
//       setQuestionIndex((prev) => {
//         const nextIndex = prev + 1;
//         if (randomRegionsArray && nextIndex < randomRegionsArray.length) {
//           setCountryQuestion(randomRegionsArray[nextIndex].name);
//           return nextIndex;
//         } else {
//           setFinishedQuiz(true);
//           setGameRunning(false);
//           setCountryQuestion("Congrats you finished the quiz!");
//           return prev;
//         }
//       });
//     } else {
//       if (tries === 1) {
//         setResults((prev) => [...prev, "❌"]);
//         setQuestionIndex((prev) => {
//           const nextIndex = prev + 1;
//           if (randomRegionsArray && nextIndex < randomRegionsArray.length) {
//             setCountryQuestion(randomRegionsArray[nextIndex].name);
//             return nextIndex;
//           } else {
//             setCountryQuestion("Congrats you finished the quiz!");
//             setFinishedQuiz(true);
//             setGameRunning(false);
//             return prev;
//           }
//         });
//         setTries(3);
//         return;
//       }
//       setResult(false);
//       setTries((prev) => prev - 1);
//       setShowIncorrect(true);
//     }
//   }

//   function startGameButton() {
//     makeNewGame();
//     setGameRunning(true);
//   }

//   const correctAnswers = results.filter((el) => el === "✅");

//   return (
//     <div className="flex h-[90vh]">
//       <div className="bg-blue-200 w-3/4 rounded-md">
//         <MapButtons handleRegionClick={handleRegionClick} />
//       </div>
//       <div className="w-1/4">
//         <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
//           <Button variant="outline" className="my-3" onClick={startGameButton}>
//             {gameRunning ? "Restart Game" : "Start Game"}
//           </Button>
//           <div className="my-3 p-2">
//             {gameRunning && randomRegionsArray && `Question ${questionIndex + 1} of ${randomRegionsArray.length}`}
//           </div>
//           <div className="my-3 p-2 font-bold"> {gameRunning && <div>Where is {countryQuestion}?</div>}</div>
//           {finishedQuiz && (
//             <div>
//               Congrats! you finished the quiz! You got {correctAnswers.length} out of {results.length} correct.
//             </div>
//           )}
//           <div className="my-3 p-2"> {result && <div className="bg-green-500 rounded-md p-2">Correct!</div>}</div>
//           <div className="my-3 p-2">
//             {showIncorrect && <div className="bg-red-500 rounded-md p-2">Wrong! That&apos;s {guess}!</div>}
//           </div>
//           {gameRunning && <div className="my-3 p-2">Tries left: {tries}</div>}
//           <div className="grid grid-cols-2 gap-1">
//             {results.map((answer, i) => {
//               return (
//                 <div key={i}>
//                   {answer ? i + 1 + "." : ""} {answer}
//                 </div>
//               );
//             })}
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// }
