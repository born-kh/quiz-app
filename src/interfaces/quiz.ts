export interface ICategoryItem {
  id: number;
  title: string;
  clues_count: number;
}

export interface IClues {
  id: number;
  question: string;
  answer: string;
  value: number;
  airdate: string;
  category_id: number;
  game_id: number;
  invalid_count?: number;
}

export interface ICategory extends ICategoryItem {
  clues: IClues[];
}

export interface IRating {
  user: string;
  score: number;
}

export interface IStats {
  date: string;
  user: string;
  category: string;
  score: number;
}

export enum StartType {
  Settings = 'Settings',
  Question = 'Question',
}
