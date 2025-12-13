"use client";
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ScoreTable from "./ScoreTable";
import { Dispatch, SetStateAction } from "react";

export default function Scoreboard({
  scoreBoardOpen,
  setScoreBoardOpen,
}: {
  scoreBoardOpen: boolean;
  setScoreBoardOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Sheet open={scoreBoardOpen} onOpenChange={setScoreBoardOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Scoreboard</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Scoreboard</SheetTitle>
          <SheetDescription className="sr-only">Scoreboard: top 20 ranked by points</SheetDescription>
        </SheetHeader>
        <ScoreTable />
      </SheetContent>
    </Sheet>
  );
}
