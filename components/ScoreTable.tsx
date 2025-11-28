import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { scoreType } from "./GameWrapper";

export default function ScoreTable({ score }: { score: scoreType }) {
  return (
    <Table>
      <TableCaption>Rankings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Score</TableHead>
          <TableHead># of Questions</TableHead>
          <TableHead># of Incorrect</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{score?.correct}</TableCell>
          <TableCell>{score?.questions}</TableCell>
          <TableCell>{score?.incorrectAnswers}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
