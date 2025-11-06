"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import regions from "../lib/regions.json";
import MapButtons from "./MapButtons";
import { Region } from "@/lib/types/Region";

export default function GameWindow() {
  const [gameRunning, setGameRunning] = useState(false);
  const [countryQuestion, setCountryQuestion] = useState("");
  const [randomRegionsArray, setRandomRegionsArray] = useState<Region[] | null>(null);
  const [result, setResult] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [tries, setTries] = useState(3);
  const [finishedQuiz, setFinishedQuiz] = useState(false);

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

  function makeNewGame() {
    const newRegionArray = makeRandomRegionsArray();
    setQuestionIndex(0);
    setRandomRegionsArray(newRegionArray);
    setCountryQuestion(newRegionArray[0].name);
    setResult(false);
    setTries(3);
  }

  function handleRegionClick(region: Region) {
    const answer = region.name;
    if (!gameRunning) {
      return;
    }

    setGuess(answer);
    if (answer === countryQuestion) {
      setResults((prev) => [...prev, "✅"]);

      setResult(true);
      setTries(3);
      setShowIncorrect(false);
      setQuestionIndex((prev) => {
        const nextIndex = prev + 1;
        if (randomRegionsArray && nextIndex < randomRegionsArray.length) {
          setCountryQuestion(randomRegionsArray[nextIndex].name);
          return nextIndex;
        } else {
          setFinishedQuiz(true);
          setGameRunning(false);
          setCountryQuestion("Congrats you finished the quiz!");
          return prev;
        }
      });
    } else {
      if (tries === 1) {
        setResults((prev) => [...prev, "❌"]);
        setQuestionIndex((prev) => {
          const nextIndex = prev + 1;
          if (randomRegionsArray && nextIndex < randomRegionsArray.length) {
            setCountryQuestion(randomRegionsArray[nextIndex].name);
            return nextIndex;
          } else {
            setCountryQuestion("Congrats you finished the quiz!");
            setFinishedQuiz(true);
            setGameRunning(false);
            return prev;
          }
        });
        setTries(3);
        return;
      }
      setResult(false);
      setTries((prev) => prev - 1);
      setShowIncorrect(true);
    }
  }

  function startGameButton() {
    makeNewGame();
    setGameRunning(true);
  }

  const correctAnswers = results.filter((el) => el === "✅");

  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons handleRegionClick={handleRegionClick} />
      </div>
      <div className="w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
          <Button variant="outline" className="my-3" onClick={startGameButton}>
            {gameRunning ? "Restart Game" : "Start Game"}
          </Button>
          <div className="my-3 p-2">
            {gameRunning && randomRegionsArray && `Question ${questionIndex + 1} of ${randomRegionsArray.length}`}
          </div>
          <div className="my-3 p-2 font-bold"> {gameRunning && <div>Where is {countryQuestion}?</div>}</div>
          {finishedQuiz && (
            <div>
              Congrats! you finished the quiz! You got {correctAnswers.length} out of {results.length} correct.
            </div>
          )}
          <div className="my-3 p-2"> {result && <div className="bg-green-500 rounded-md p-2">Correct!</div>}</div>
          <div className="my-3 p-2">
            {showIncorrect && <div className="bg-red-500 rounded-md p-2">Wrong! That&apos;s {guess}!</div>}
          </div>
          {gameRunning && <div className="my-3 p-2">Tries left: {tries}</div>}
          <div className="grid grid-cols-2 gap-1">
            {results.map((answer, i) => {
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
