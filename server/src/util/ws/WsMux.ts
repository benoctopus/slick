import { Router, WebsocketMethod } from 'express-ws';

class WsMux {
  public path: string;
  public connections: { [key: string]: UserConnection } = {};

  constructor(wsRoute: WebsocketMethod<Router>, path: string) {
    this.path = path;
    wsRoute(path, (ws, req) => {
      ws.on('open', () => {

      })
      ws.on("message", (msg) => {
        console.log(msg);
      })
    })
  }

  // private addListener(ws, )
}

export default WsMux;