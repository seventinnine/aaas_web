export class LogMessage {
    constructor(
        public id?: number,
        public timestamp?: Date,
        public name?: string,
        public clientId?: string,
        public category?: string,
        public message?: string
      ) {}
}
