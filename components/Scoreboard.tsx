import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScoresType } from "./GameWrapper";
import ScoreTable from "./ScoreTable";
import { Dispatch, SetStateAction } from "react";

export default function Scoreboard({
  scores,
  scoreBoardOpen,
  setScoreBoardOpen,
}: {
  scores: ScoresType;
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
          <SheetDescription>These are all the scores from the games</SheetDescription>
        </SheetHeader>
        <ScoreTable scores={scores} />
      </SheetContent>
    </Sheet>
  );
}
