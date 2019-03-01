import BaseModel from './BaseModel';
import { hash, compare } from '../util/hash';

interface IUserCreation {
  username: string;
  password: string;
}


export default class User extends BaseModel {
  public username?: string;
  private passwordHash?: string;
  private password?: string;

  constructor(data: IUserCreation) {
    super(true);

    if (data.username && !this.validateUsername(data.username))
      this.username = data.username;

    if (data.password && !this.validatePassword(data.password))
      hash(data.password).then((hashed) => { this._passwordHash = hashed })
  }

  //Todo: implement validators


  protected validateUsername = (username: string): undefined | ValidationError => undefined;
  protected validatePassword = (username: string): undefined | ValidationError => undefined;
  protected validate = (user: IUserCreation): null | ValidationError[]
}