import BaseModel from './BaseModel';

interface IUser {
  username?: string;
  password?: string;
}


export default class User extends BaseModel implements IUser {
  public username?: string;
  private _PasswordHash?: string;

  constructor(data: IUser) {
    super();

    this.username = data.username;
    this._PasswordHash = data.password;
  }
}