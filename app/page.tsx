import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button variant={"outline"} asChild>
        <Link href="/mapgame"> Go to taiwan map game</Link>
      </Button>
    </div>
  );
}
