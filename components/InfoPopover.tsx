import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function InfoPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Info size={26} />
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="mb-4 p-2 rounded-md hover:bg-accent">
          <a href="https://github.com/Jackarius090/taiwan-website">https://github.com/Jackarius090/taiwan-website</a>
        </div>
        <div>Made using:</div>
        <ul className="list-disc pl-5">
          <li>NextJS</li>
          <li>Tailwind CSS</li>
          <li>Shadcn</li>
          <li>Zod</li>
          <li>
            Map from <a href="https://simplemaps.com/">simplemaps.com</a>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
