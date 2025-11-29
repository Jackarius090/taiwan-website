import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScoresType } from "./GameWrapper";

export default function ScoreTable({ scores }: { scores: ScoresType }) {
  return (
    <Table>
      <TableCaption>Rankings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead># of Questions</TableHead>
          <TableHead># of Incorrect</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((score, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{score?.name}</TableCell>
            <TableCell>{score?.correct}</TableCell>
            <TableCell>{score?.questions}</TableCell>
            <TableCell>{score?.incorrectAnswers}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
