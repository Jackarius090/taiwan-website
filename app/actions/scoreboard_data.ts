"use server";
import { ScoreType } from "@/components/GameWrapper";
import postgres from "postgres";

export async function uploadScore(score: ScoreType) {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  try {
    await sql`CREATE TABLE IF NOT EXISTS scores (name TEXT, correct int, questions int, incorrectAnswers int)`;
    await sql`INSERT INTO scores VALUES ("${score.name}, ${score.correct}, ${score.questions}, ${score.incorrectAnswers}")`;
  } catch {
    console.log("error");
  }
}
