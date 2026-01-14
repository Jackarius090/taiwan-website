// import { Button } from "@/components/ui/button";
// import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="relative size-72 bg-amber-950 justify-center flex items-center">
        <div className="bg-amber-300 size-40 absolute"></div>
        <div className="bg-red-600 size-40 absolute top-4"></div>
        {/* <div className="bg-blue-600 size-40 absolute"></div>
      <div className="bg-green-500 size-40 absolute"></div> */}
      </div>
    </div>
  );
}

// <div className="flex justify-center items-center h-screen">
//   <Button variant={"outline"} asChild>
//     <Link href="/mapgame"> Go to taiwan map game</Link>
//   </Button>
// </div>;
