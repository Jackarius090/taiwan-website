import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
        </SheetHeader>
        <ScoreTable />
      </SheetContent>
    </Sheet>
  );
}
