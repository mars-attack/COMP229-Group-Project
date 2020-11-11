export interface Question {
  title: string;
  options: Option[];
}

export interface Option {
  details: string;
  count?: number;
}
