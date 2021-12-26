export class ClientIdComparer {
    private static getNumberOfClientId(str: string):number  {
        return parseInt(str.substring(str.indexOf('_') + 1));
      }
    static compareClientIdByLastDigits = (value1: string, value2: string) => {
        return this.getNumberOfClientId(value1) - this.getNumberOfClientId(value2);
      }
}
