import RegexValidator from './RegexValidator';
import { IValidationErrorInfo } from '../errors/ValidationError';
import { ICompleteValidator } from './Validator';
import { IUserCreation } from '../../models/User'
import { ValidatorSuite, ValidatorConstructor } from '.';
import { ValidatorMap } from './ValidatorSuite';

let userRegex = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
let usernameErrorInfo: IValidationErrorInfo = {
  propertyName: 'username',
  userMessage: 'Username must consist of alpha-numeric charecters and be 6 to 18 characters long'
}

export class UsernameValidator extends RegexValidator implements ICompleteValidator<string> {
  public propName = 'username';
  constructor(username: string) {
    super(
      username,
      userRegex,
      usernameErrorInfo
    );
  }
}

let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
let passwordErrorInfo: IValidationErrorInfo = {
  propertyName: 'password',
  userMessage: 'password must consist of alpha-numeric charecters and be 6 to 18 characters long'
}

export class PasswordValidator extends RegexValidator implements ICompleteValidator<string> {
  public propName = 'password';
  constructor(password: string) {
    super(
      password,
      passRegex,
      passwordErrorInfo
    );
  }
}

export default class UserValidatorSuite extends ValidatorSuite<IUserCreation> {
  public validators: ValidatorMap = {
    username: UsernameValidator,
    password: PasswordValidator
  }

  constructor(data: IUserCreation) {
    super(data);
  }
}