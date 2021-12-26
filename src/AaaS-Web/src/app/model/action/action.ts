export class Action {
    constructor(
        public id?: number,
        public detectorId?: number,
        public type?: string,
        public email?: string,
        public httpAddress?: string
    ) {

    }
}
