import * as express from 'express';

export default class SimpleServer {
  protected _port: number;
  protected _started: boolean = false;
  protected _app: express.Application;

  static express = express;
  static Router = express.Router;

  constructor(PORT: number) {
    this._port = PORT;
    this._app = express();
  }

  public listen = () => {
    this._app.listen(this._port, () => {
      console.log(`> api server started on http://localhost:${this._port}`);
      this._started = true;
    })
  }

  public Router = () => express.Router();

  get use() {
    return this._app.use;
  }

  get running() {
    return this._started;
  }

  get port() {
    return this._port;
  }
}