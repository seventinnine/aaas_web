export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const DetectorFormErrorMessages: ErrorMessage[] = [
  new ErrorMessage('appKey', 'required', 'AppKey is required.'),
  new ErrorMessage('executionInterval1', 'required', 'Hours is required.'),
  new ErrorMessage('executionInterval2', 'required', 'Minutes is required.'),
  new ErrorMessage('executionInterval3', 'required', 'Seconds is required.'),
  new ErrorMessage('executionInterval1', 'min', 'Hours must be >= 0.'),
  new ErrorMessage('executionInterval2', 'min', 'Minutes must be >= 0.'),
  new ErrorMessage('executionInterval3', 'min', 'Seconds must be >= 0.'),
  new ErrorMessage('executionInterval1', 'max', 'Hours must be <= 10.'),
  new ErrorMessage('executionInterval2', 'max', 'Minutes must be <= 60.'),
  new ErrorMessage('executionInterval3', 'max', 'Seconds must be <= 60.'),
  new ErrorMessage('telemetricName', 'required', 'Telemetric Name is required.'),
  new ErrorMessage('type', 'required', 'Detector Type is required.'),
  new ErrorMessage('type', 'invalidType', 'Detector Type must be within selection.'),
  new ErrorMessage('action', 'required', 'Action Type is required.'),
  new ErrorMessage('action', 'invalidType', 'Action Type must be within selection.'),
  new ErrorMessage('minValue', 'required', 'Minimum Value is required.'),
  new ErrorMessage('maxValue', 'required', 'Maximum Value is required.'),
  new ErrorMessage('outlierCount', 'required', 'Outlier Count is required.'),
  new ErrorMessage('outlierCount', 'min', 'Outlier Count must be >= 0.'),
  new ErrorMessage('aggregationOp', 'required', 'Aggregation Operation is required.'),
  new ErrorMessage('aggregationOp', 'invalidType', 'Aggregation must be within selection.'),
  new ErrorMessage('comparisonOp', 'required', 'Comparison Operation is required.'),
  new ErrorMessage('comparisonOp', 'invalidType', 'Comparison must be within selection.'),
  new ErrorMessage('threshold', 'required', 'Threshold is required.'),
  new ErrorMessage('threshold', 'min', 'Threshold must be >= 0.'),
  new ErrorMessage('email', 'required', 'Enail is required.'),
  new ErrorMessage('email', 'email', 'Invalid format.'),
  new ErrorMessage('httpAddress', 'required', 'Http Address is required.'),
  new ErrorMessage('minValue', 'minMaxValid', 'Minimum Value cannot be larger than Maximum Value.'),
  new ErrorMessage('executionInterval1', 'totalDurationInvalid', 'Execution Interval must be at least 1 second in total.')
    /*
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
    new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
    new ErrorMessage('id', 'minlength', 'Die ID  muss mindestens 2 Zeichen enthalten'),
    new ErrorMessage('id', 'maxlength', 'Eine ID darf höchstens 8 Zeichen haben'),
    new ErrorMessage('year', 'required', 'Es muss ein Erscheinungsjahr angegeben werden'),
    new ErrorMessage('author', 'required', 'Es muss ein Autor angegeben werden')
    */
];  