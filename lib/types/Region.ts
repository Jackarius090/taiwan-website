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
};
