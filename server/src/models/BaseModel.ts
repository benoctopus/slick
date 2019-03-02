import * as uuidv4 from 'uuid/v4'
import Neo from '../config/db/Neo';

export default abstract class BaseModel {
  public id: string | number;
  protected static idCount: number = 0;

  constructor(uuid: boolean = true, id?: string | number) {
    this.id = uuid ? uuidv4() : id as string | number;
  }

  //TODO: actually implement this correctly
  protected getIntId = () => {
    return BaseModel.idCount++;
  }

  public static getDbSession = (): Neo => {
    return new Neo();
  }
}