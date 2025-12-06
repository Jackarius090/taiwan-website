import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function InputErrorAlert({ error }: { error: string }) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert
        variant="destructive"
        className="bg-inherit border-0"
      >
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );
}
