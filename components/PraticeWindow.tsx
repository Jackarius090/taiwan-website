"use client";

import { useState } from "react";
import MapButtons from "./MapButtons";
import Image from "next/image";

export default function PracticeWindow() {
  const [showLocation, setShowLocation] = useState<{
    name: string;
    description: string;
    imageSrc: string | null;
  }>({ name: "", description: "", imageSrc: null });

  function handleRegionClick(name: string, description: string, imageSrc: string | null) {
    setShowLocation({ name, description, imageSrc });
  }

  return (
    <div className="flex flex-col md:flex-row h-[90vh] overflow-auto">
      <div className="bg-blue-200 md:w-3/4 rounded-md">
        <MapButtons handleRegionClick={handleRegionClick} />
      </div>
      <div className="md:w-1/4 h-full">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 md:ml-4 bg-amber-300">
          <div className="pb-4">Click on a region to show the name</div>
          <div>{showLocation.name}</div>
          <div>{showLocation.description}</div>
          {showLocation.imageSrc && (
            <div className="relative w-full h-80 mt-4">
              <Image className="object-contain" src={showLocation.imageSrc} fill alt="photo of {showLocation.name}" />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
