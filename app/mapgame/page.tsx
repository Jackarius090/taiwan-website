import GameWindow from "@/components/GameWindow";
import PracticeWindow from "@/components/PraticeWindow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Mapgame() {
  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <Tabs className="md:w-11/12" defaultValue="gameMode">
        <div className="flex justify-between">
          <div>Taiwan Map Game - test your knowledge of Taiwan&#39;s regions.</div>
          <TabsList>
            <TabsTrigger value="gameMode">Game mode</TabsTrigger>
            <TabsTrigger value="practiceMode">Practice mode</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="gameMode">
          <GameWindow />
        </TabsContent>
        <TabsContent value="practiceMode">
          <PracticeWindow />
        </TabsContent>
      </Tabs>
    </div>
  );
}
