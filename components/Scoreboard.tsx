import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { scoreType } from "./GameWrapper";

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
        <div>
          {score?.correct} out of {score?.questions} with {score?.incorrectAnswers} incorrect
        </div>
      </SheetContent>
    </Sheet>
  );
}
