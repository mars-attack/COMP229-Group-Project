export interface Question {
  _id?: string;
  title: string;
  options: Option[];
  chosenOption?: string;
}

export interface Option {
  _id?: string;
  details: string;
  count?: number;
}
