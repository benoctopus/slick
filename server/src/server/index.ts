import WsServer from './WsServer';
import SimpleServer from './WsServer';

let server: WsServer | null = null;

export const getServer = () => {
  if (server) return server;
  server = new WsServer(parseInt(process.env.PORT || '8080'))
  return server;
}

export { WsServer, SimpleServer };