import SimpleServer from './SimpleServer';
import * as expressWs from 'express-ws';

// Add ws functionality on top of Simple server
export default class WsServer extends SimpleServer {
  private _expWs: expressWs.Instance;

  constructor(port: number) {
    super(port);
    this._expWs = expressWs(this._app);
  }

  // public createWsGroup = (name: string): WsMux => {
  //   const router = this.Router();
  //   const mux = new WsMux(router.ws, name);
  //   this.muxs[name] = mux;
  //   this.use(`/groups/${name}`, router);
  //   return mux;
  // }

  get wsClients() {
    return this._expWs.getWss().clients;
  }
}