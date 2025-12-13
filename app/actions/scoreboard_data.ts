"use server";
import { ScoreType } from "@/lib/types/Types";
import postgres from "postgres";
import z from "zod";
import { usernameType } from "@/lib/types/zodSchemas";
import { ZScore } from "@/lib/types/zodSchemas";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function uploadScore(score: ScoreType) {
  const userNameResult = usernameType.safeParse(score.name);
  const ZScoreResult = ZScore.safeParse(score);

  if (!userNameResult.success) {
    console.log(z.prettifyError(userNameResult.error!));
    return "server action error";
  }

  if (!ZScoreResult.success) {
    console.log(z.prettifyError(ZScoreResult.error!));
    return "server action error";
  }
  try {
    await sql`CREATE TABLE IF NOT EXISTS scores (name TEXT, points int, correct int, incorrectAnswers int, questions int)`;
    await sql`INSERT INTO scores (name, points, correct, incorrectanswers, questions) VALUES (${score.name}, ${score.points}, ${score.correct}, ${score.incorrectAnswers}, ${score.questions})`;
    return "score uploaded success";
  } catch (error) {
    console.log(error);
    return "server action error";
  }
}

export async function downloadScores() {
  try {
    const rows =
      await sql`SELECT name, points, correct, incorrectanswers, questions FROM scores ORDER BY correct DESC LIMIT 20`;
    const scores = rows.map((row) => ({
      name: row.name,
      points: row.points,
      correct: row.correct,
      incorrectAnswers: row.incorrectanswers,
      questions: row.questions,
    }));
    console.log(scores);
    return scores;
  } catch (error) {
    console.log(error);
  }
}
