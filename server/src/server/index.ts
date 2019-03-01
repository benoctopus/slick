import WsServer from './WsServer';
import SimpleServer from './WsServer';
import App from './App';

let server: WsServer | null = null;

export const getServer = (port?: number | string, secret?: string) => {
  if (server) return server;
  if (!!port && typeof port === 'string') {
    port = parseInt(port);
  }

  if (!process.env.PORT)
    console.log('Warning, default port value will be used')
  if (!process.env.SECRET)
    console.log('Warning, default secret will be used')

  server = new App(
    parseInt(process.env.PORT || port as string || '8080'),
    process.env.SECRET || secret || 'superSecret'
  )

  return server;
}

export { WsServer, SimpleServer, App };