import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
          <SheetDescription>These are all the scores from the games</SheetDescription>
        </SheetHeader>
        <ScoreTable />
      </SheetContent>
    </Sheet>
  );
}
