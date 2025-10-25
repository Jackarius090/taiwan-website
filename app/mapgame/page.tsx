"use client";
import { useState } from "react";
import MapButtons from "@/components/MapButtons";
import QuizBox from "@/components/QuizBox";
import regions from "../../lib/regions.json";

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
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }

    return newArray;
  }

  function makeNewGame() {
    const newRegionArray = makeRandomRegionsArray();
    setRandomRegionsArray(newRegionArray);
    setCountryQuestion(newRegionArray[0].name);
    console.log(newRegionArray);
  }

  function checkAnswer(answer: string) {
    if (answer == countryQuestion) {
      setResult(true);
      setQuestionIndex((prev) => prev + 1);
      setCountryQuestion(randomRegionsArray[questionIndex].name);
    } else setResult(false);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-amber-200">
      <div className="bg-blue-200 w-3/4 h-[95vh] rounded-md">
        <MapButtons checkAnswer={checkAnswer} />
      </div>
      <div className="w-1/5 h-[95vh]">
        <QuizBox
          setGameRunning={setGameRunning}
          gameRunning={gameRunning}
          countryQuestion={countryQuestion}
          makeNewGame={makeNewGame}
          result={result}
        />
      </div>
    </div>
  );
}
