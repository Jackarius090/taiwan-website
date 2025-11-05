"use client";

import { useState } from "react";
import MapButtons from "./MapButtons";

export default function PracticeWindow() {
  const [showLocation, setShowLocation] = useState("");

  function checkAnswer(region: string) {
    setShowLocation(region);
  }
  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons checkAnswer={checkAnswer} />
      </div>
      <div className="w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
          <div>{showLocation}</div>
        </article>
      </div>
    </div>
  );
}
