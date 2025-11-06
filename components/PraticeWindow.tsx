"use client";

import { useState } from "react";
import MapButtons from "./MapButtons";
import { Region } from "@/lib/types/Region";

export default function PracticeWindow() {
  const [showLocation, setShowLocation] = useState<Region>();

  function handleRegionClick(region: Region) {
    setShowLocation(region);
  }
  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons handleRegionClick={handleRegionClick} />
      </div>
      <div className="w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">
          <div className="pb-4">Click on a region to show the name</div>
          <div>{showLocation?.name}</div>
          <div>{showLocation?.description}</div>
        </article>
      </div>
    </div>
  );
}
