import BaseModel from './BaseModel';
// import { hash, compare } from '../util/hash';
import UserValidatorSuite from '../util/validators/UserValidatorSuite';

export interface IUserBase {
  username: string;
}

export interface IUserCreation extends IUserBase {
  username: string;
  password: string;
}

export interface IUserRecovered extends IUserBase {
  username: string;
  passwordHash: string
}

export default class User extends BaseModel {
  public username?: string;
  private passwordHash?: string;
  private password?: string;

  // create or Recover

  constructor(data: IUserCreation) {
    super(true);
    this.validate(data)
    this.username = data.username;
    this.password = data.password;
  }

  public validate = (data: IUserCreation): boolean => {
    const validationSuite: UserValidatorSuite = (
      (new UserValidatorSuite(data)).validate()
    );

    if (!!validationSuite.errors.length) throw validationSuite.errors[0];
    return true;
  }

  public save = async () => {
    try {

      console.log('hello');

    } catch (err) {
      throw err;
    }
  }
}