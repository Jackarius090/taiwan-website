import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScoresType } from "@/lib/types/Types";
import { downloadScores } from "@/app/actions/scoreboard_data";
import { useState, useEffect } from "react";
import { Spinner } from "./ui/spinner";

export default function ScoreTable() {
  const [scoresData, setScoresData] = useState<ScoresType | null | undefined>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const dbScores = await downloadScores();
      setScoresData(dbScores);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <Table>
      <TableCaption>Rankings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">Name</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Correct</TableHead>
          <TableHead>Incorrect</TableHead>
          <TableHead>#Questions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && (
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="place-items-center p-4">
              <Spinner className="size-8" />
            </TableCell>
          </TableRow>
        )}
        {scoresData &&
          scoresData.map((score, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{score?.name}</TableCell>
              <TableCell>{score?.points}</TableCell>
              <TableCell>{score?.correct}</TableCell>
              <TableCell>{score?.incorrectAnswers}</TableCell>
              <TableCell>{score?.questions}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
