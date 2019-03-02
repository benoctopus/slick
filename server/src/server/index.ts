import WsServer from './WsServer';
import SimpleServer from './WsServer';
import App from './App';
import { logDevProd } from '../util/logger';

let server: App | null = null;

export const getServer = (port?: number | string, secret?: string): App => {
  if (server) return server;
  if (!!port && typeof port === 'string') {
    port = parseInt(port);
  }

  if (!process.env.PORT)
    logDevProd('Warning, default port value will be used')
  if (!process.env.SECRET)
    logDevProd('Warning, default secret will be used')

  server = new App(
    parseInt(process.env.PORT || port as string || '8080'),
    process.env.SECRET || secret || 'superSecret'
  )

  return server as App;
}

export { WsServer, SimpleServer, App };