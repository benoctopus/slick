import { Router, WebsocketMethod, WebsocketRequestHandler } from 'express-ws';

class WsMux {
  public path: string;
  // private ws: WebsocketRequestHandler;

  constructor(wsRoute: WebsocketMethod<Router>, path: string) {
    this.path = path;
    wsRoute(path, (ws, req) => {
      console.log(req);
      ws.on("message", (msg) => {
        console.log(msg);
      })
    })
  }

  // private addListener(ws, )
}

export default WsMux;