import { Action } from "../action/action";

export class Detector {
    constructor(
        public id?: number,
        public executionInterval?: number,
        public executionInterval1?: number,
        public executionInterval2?: number,
        public executionInterval3?: number,
        public type?: string,
        public appKey?: string,
        public telemetricName?: string,
        public enabled?: boolean,
        // ignored when sent
        public actionType?: string,
        public action?: Action,
        public minValue?: number,
        public maxValue?: number,
        public outlierCount?: number,
        public aggregationOp?: string,
        public comparisonOp?: string,
        public threshold?: number,
    ) {}
}
