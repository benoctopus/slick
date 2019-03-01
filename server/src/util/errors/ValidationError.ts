
interface IValidationErrorInfo {
  propertyName: string;
  userMessage: string;
}

export default class ValidationError extends Error {
  public propertyName: string;
  public userMessage: string;

  constructor(message: string, info: IValidationErrorInfo) {
    super(message);
    this.propertyName = info.propertyName;
    this.userMessage = info.userMessage;
  }
}