import { WsServer, getServer } from './server';

class App {
  server: WsServer;

  constructor() {
    this.server = getServer();
  }

  public start = () => {
    this.server.listen();
  }
}

export default App;