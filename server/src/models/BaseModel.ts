import * as uuidv4 from 'uuid/v4'

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

  //TODO: set up neo4j and implement instance getter
  // protected get neoD() { return new }

}