import { Question } from '../interfaces';

export class Survey
{
  constructor(
      // tslint:disable-next-line: variable-name
      public _id?: string,
      public name?: string,
      public dateCreated?: string,
      public responses?: number,
      public questions?: Question[]
  ){}
}
