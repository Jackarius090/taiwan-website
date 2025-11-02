"use client";
import regions from "../lib/regions.json";
import { useState } from "react";
import clsx from "clsx";

export default function MapButtons({ checkAnswer }: { checkAnswer(answer: string): void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  function handleClick(regionName: string) {
    checkAnswer(regionName);
    console.log(regionName);
  }

  return (
    <svg
      baseProfile="tiny"
      fill="#6f9c76"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth=".5"
      version="1.2"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g id="features">
        {regions.map((region) => (
          <g key={region.id}>
            {region.bbox && (
              <rect
                x={region.bbox.x}
                y={region.bbox.y}
                width={region.bbox.width}
                height={region.bbox.height}
                fill="transparent"
                onClick={() => handleClick(region.name)}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            )}
            <path
              className={clsx("hover:fill-[#4a8f58]", hoveredRegion === region.name && "fill-[#4a8f58]")}
              key={region.id}
              onClick={() => handleClick(region.name)}
              d={region.d}
            ></path>
          </g>
        ))}
      </g>
    </svg>
  );
}
