"use client";

import GameWindow from "@/components/GameWindow";
import PracticeWindow from "@/components/PraticeWindow";
import Scoreboard from "@/components/Scoreboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, Activity } from "react";
import InfoPopover from "./InfoPopover";

export default function GameWrapper() {
  const [scoreBoardOpen, setScoreBoardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gameMode");

  return (
    <div className="flex justify-center items-center h-screen bg-amber-400">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="md:w-11/12" defaultValue="gameMode">
        <header role="banner" className="flex flex-wrap p-2 md:flex-row justify-between items-center">
          <div className="m-2 md:m-0">Taiwan Map Game - test your knowledge of Taiwan&#39;s regions.</div>
          <InfoPopover />
          <Scoreboard scoreBoardOpen={scoreBoardOpen} setScoreBoardOpen={setScoreBoardOpen} />
          <TabsList>
            <TabsTrigger value="gameMode">Game mode</TabsTrigger>
            <TabsTrigger value="practiceMode">Practice mode</TabsTrigger>
          </TabsList>
        </header>
        <Activity mode={activeTab === "gameMode" ? "visible" : "hidden"}>
          <TabsContent value="gameMode">
            <GameWindow setScoreBoardOpen={setScoreBoardOpen} />
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
