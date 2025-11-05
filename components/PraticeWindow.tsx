"use client";

import { useState } from "react";
import MapButtons from "./MapButtons";

export default function PracticeWindow() {
  return (
    <div className="flex h-[90vh]">
      <div className="bg-blue-200 w-3/4 rounded-md">
        <MapButtons />
      </div>
      <div className="w-1/4">
        <article className="border-2 border-neutral-800 rounded-md h-full p-4 ml-4">Hello</article>
      </div>
    </div>
  );
}
