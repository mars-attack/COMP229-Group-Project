export class Survey
{
  constructor(
      // tslint:disable-next-line: variable-name
      public _id?: number,
      public name?: string,
      public dateCreated?: string,
      public responses?: number,
      public questions?: Question[]

  ){}
}

class Question
{
  constructor(
      // tslint:disable-next-line: variable-name
      public title: string,
      public options: Option[]
  ){}
}

class Option
{
  constructor(
      // tslint:disable-next-line: variable-name
      public details: string,
      public count: number
  ){}
}
