"use client";

import GameWindow from "@/components/GameWindow";
import PracticeWindow from "@/components/PraticeWindow";
import Scoreboard from "@/components/Scoreboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, Activity } from "react";

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
  const [activeTab, setActiveTab] = useState("gameMode");

  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="md:w-11/12" defaultValue="gameMode">
        <header role="banner" className="flex justify-between">
          <div>Taiwan Map Game - test your knowledge of Taiwan&#39;s regions.</div>
          <Scoreboard scoreBoardOpen={scoreBoardOpen} setScoreBoardOpen={setScoreBoardOpen} scores={scores} />
          <TabsList>
            <TabsTrigger value="gameMode">Game mode</TabsTrigger>
            <TabsTrigger value="practiceMode">Practice mode</TabsTrigger>
          </TabsList>
        </header>
        <Activity mode={activeTab === "gameMode" ? "visible" : "hidden"}>
          <TabsContent value="gameMode">
            <GameWindow setScores={setScores} scoreBoardOpen={scoreBoardOpen} setScoreBoardOpen={setScoreBoardOpen} />
          </TabsContent>
        </Activity>
        <Activity mode={activeTab === "practiceMode" ? "visible" : "hidden"}>
          <TabsContent value="practiceMode">
            <PracticeWindow />
          </TabsContent>
        </Activity>
      </Tabs>
    </div>
  );
}
