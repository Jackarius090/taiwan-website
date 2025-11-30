"use client";

import GameWindow from "@/components/GameWindow";
import PracticeWindow from "@/components/PraticeWindow";
import Scoreboard from "@/components/Scoreboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type Score = {
  name: string;
  correct: number;
  questions: number;
  incorrectAnswers: number;
};

export type ScoresType = Score[];

export default function GameWrapper() {
  const [scores, setScores] = useState<ScoresType>([]);
  const [scoreBoardOpen, setScoreBoardOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <Tabs className="md:w-11/12" defaultValue="gameMode">
        <div className="flex justify-between">
          <div>Taiwan Map Game - test your knowledge of Taiwan&#39;s regions.</div>
          <Scoreboard scoreBoardOpen={scoreBoardOpen} setScoreBoardOpen={setScoreBoardOpen} scores={scores} />
          <TabsList>
            <TabsTrigger value="gameMode">Game mode</TabsTrigger>
            <TabsTrigger value="practiceMode">Practice mode</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="gameMode">
          <GameWindow setScores={setScores} scoreBoardOpen={scoreBoardOpen} setScoreBoardOpen={setScoreBoardOpen} />
        </TabsContent>
        <TabsContent value="practiceMode">
          <PracticeWindow />
        </TabsContent>
      </Tabs>
    </div>
  );
}
