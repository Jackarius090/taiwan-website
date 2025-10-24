"use client";
import regions from "../lib/regions.json";

export default function MapButtons() {
  function handleClick(regionName: string) {
    console.log(regionName);
  }

  return (
    <svg
      baseProfile="tiny"
      fill="#6f9c76"
      height="1000"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth=".5"
      version="1.2"
      viewBox="0 0 1000 1000"
      width="1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="features">
        {regions.map((region) => {
          return (
            <path
              className="hover:bg-sky-700"
              key={region.id}
              onClick={() => handleClick(region.name)}
              d={region.d}
              onMouseEnter={(e) => (e.target.style.fill = "#4a8f58")}
              onMouseLeave={(e) => (e.target.style.fill = "#6f9c76")}
            ></path>
          );
        })}
      </g>
    </svg>
  );
}
