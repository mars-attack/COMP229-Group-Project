export interface Question {
  title: string;
  options: Option[];
  choosenOption?: Option;
}

export interface Option {
  details: string;
  count?: number;
}
