"use client";
import regions from "../lib/regions.json";
import { useState } from "react";
import clsx from "clsx";
import { Region } from "@/lib/types/Region";

export default function MapButtons({ handleRegionClick }: { handleRegionClick(region: Region): void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  function handleClick(region: Region) {
    handleRegionClick(region);
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
                onClick={() => handleClick(region)}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            )}
            <path
              className={clsx("hover:fill-[#4a8f58]", hoveredRegion === region.name && "fill-[#4a8f58]")}
              key={region.id}
              onClick={() => handleClick(region)}
              d={region.d}
            ></path>
          </g>
        ))}
      </g>
    </svg>
  );
}
