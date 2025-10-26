"use client";
import { useState } from "react";
import MapButtons from "@/components/MapButtons";
import regions from "../../lib/regions.json";
import { Button } from "@/components/ui/button";

export default function Mapgame() {
  const [gameRunning, setGameRunning] = useState(false);
  const [countryQuestion, setCountryQuestion] = useState("");
  const [randomRegionsArray, setRandomRegionsArray] = useState<
    Array<{
      id: string;
      name: string;
      d: string;
    }>
  >([]);
  const [result, setResult] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [showIncorrect, setShowIncorrect] = useState(false);

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
    console.log(newRegionArray);
  }

  function checkAnswer(answer: string) {
    setGuess(answer);
    if (answer === countryQuestion) {
      setResult(true);
      setShowIncorrect(false);
      setQuestionIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex < randomRegionsArray.length) {
          setCountryQuestion(randomRegionsArray[nextIndex].name);
          return nextIndex;
        } else {
          setCountryQuestion("Congrats you finished the quiz!");
          return prev;
        }
      });
    } else {
      setResult(false);
      setShowIncorrect(true);
    }
  }

  function startGameButton() {
    makeNewGame();
    setGameRunning(true);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-amber-200">
      <div className="bg-blue-200 w-3/4 h-[95vh] rounded-md">
        <MapButtons checkAnswer={checkAnswer} />
      </div>
      <div className="w-1/5 h-[95vh]">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
          <Button className="my-3" onClick={startGameButton}>
            Start Game
          </Button>
          <div className="my-3 p-2">
            {gameRunning && `Question ${questionIndex + 1} of ${randomRegionsArray.length}`}
          </div>
          <div className="my-3 p-2"> {gameRunning && <div>Where is {countryQuestion}?</div>}</div>
          <div className="my-3 p-2"> {result && <div className="bg-green-500 rounded-md p-2">Correct!</div>}</div>
          <div className="my-3 p-2">
            {showIncorrect && <div className="bg-red-500 rounded-md p-2">Wrong! That&apos;s {guess}!</div>}
          </div>
        </article>
      </div>
    </div>
  );
}
