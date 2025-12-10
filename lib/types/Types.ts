export type Region = {
  id: string;
  name: string;
  d: string;
  bbox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  chineseName: string;
};

export type ScoreType = {
  name: string;
  correct: number;
  questions: number;
  incorrectAnswers: number;
};

export type ScoresType = ScoreType[];
