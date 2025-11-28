import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { scoreType } from "./GameWrapper";
import ScoreTable from "./ScoreTable";

export default function Scoreboard({ score }: { score: scoreType }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Scoreboard</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Scoreboard</SheetTitle>
          <SheetDescription>These are all the scores from the games</SheetDescription>
        </SheetHeader>
        <ScoreTable score={score} />
      </SheetContent>
    </Sheet>
  );
}
