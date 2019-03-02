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
    User.validate(data)
    this.username = data.username;
    this.password = data.password;
  }

  public static validate = (data: IUserCreation): boolean => {
    const validationSuite: UserValidatorSuite = (
      (new UserValidatorSuite(data)).validate()
    );

    if (!!validationSuite.errors.length) throw validationSuite.errors[0];
    return true;
  }

  public save = async () => {
    try {
      const session = User.getDbSession();
      console.log(session.run)
      const res = await session.run('MERGE (james:Person {name : {nameParam} }) RETURN james.name AS name', { nameParam: 'James' }).then(data => console.log(data))
      session.close();
      return res;
    } catch (err) {
      throw err;
    }
  }
}