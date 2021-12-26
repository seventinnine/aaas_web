import { Action } from "../action/action";

export class Detector {
    constructor(
        public id?: number,
        public executionInterval?: number,
        public type?: string,
        public appKey?: string,
        public telemetricName?: string,
        public enabled?: boolean,
        public action?: Action,
        public minValue?: number,
        public maxValue?: number,
        public outlierCount?: number,
        public aggregationOp?: string,
        public comparisonOp?: string,
        public threshold?: number,
    ) {}
}
