import SimpleServer from './SimpleServer';
import * as expressWs from 'express-ws';

export default class WsServer extends SimpleServer {
  // private _expWs;

  constructor(port: number) {
    super(port);
    // this._expWs = expressWs(this._app);
    expressWs(this._app);
  }
}