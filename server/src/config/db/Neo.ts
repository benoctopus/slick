import { v1 as neo4j } from 'neo4j-driver';
import getDriver from './driver';

export default class Neo {
  private _driver: neo4j.Driver;
  private _session: neo4j.Session;

  constructor() {
    this._driver = getDriver();
    this._session = this._driver.session()
  }

  public get run(): Function {
    return this._session.run
  }

  public get driver(): neo4j.Driver {
    return this._driver;
  }

  public get session(): neo4j.Session {
    return this._session;
  }

  public get close(): Function {
    return this._session.close;
  }
}