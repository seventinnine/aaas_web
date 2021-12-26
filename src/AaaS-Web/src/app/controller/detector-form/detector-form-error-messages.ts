export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const DetectorFormErrorMessages: ErrorMessage[] = [
    /*
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
    new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
    new ErrorMessage('id', 'minlength', 'Die ID  muss mindestens 2 Zeichen enthalten'),
    new ErrorMessage('id', 'maxlength', 'Eine ID darf höchstens 8 Zeichen haben'),
    new ErrorMessage('year', 'required', 'Es muss ein Erscheinungsjahr angegeben werden'),
    new ErrorMessage('author', 'required', 'Es muss ein Autor angegeben werden')
    */
];  