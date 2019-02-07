import WsServer from './WsServer';

let server: WsServer;
const PORT = parseInt(process.env.PORT || "8080", 10);

export default (): WsServer => {
  if (server) return server;

  server = new WsServer(PORT);
  return server;
}