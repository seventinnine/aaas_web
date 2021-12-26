export class Metric {
    constructor(
      public id?: number,
      public timestamp?: Date,
      public name?: string,
      public clientId?: string,
      public type?: string,
      public value?: number
    ) {}
  }