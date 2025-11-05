import GameWindow from "@/components/GameWindow";
import PracticeWindow from "@/components/PraticeWindow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Mapgame() {
  return (
    <div className="flex justify-center items-center h-screen bg-amber-200">
      <Tabs className="w-11/12" defaultValue="gameMode">
        <TabsList>
          <TabsTrigger value="gameMode">GameMode</TabsTrigger>
          <TabsTrigger value="practiceMode">practiceMode</TabsTrigger>
        </TabsList>
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
