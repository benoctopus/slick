import WsServer from './WsServer';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';


class App extends WsServer {

  constructor(PORT: number, SECRET: string) {
    super(PORT)
    this._applyBasicMiddleWare(SECRET);
  }

  private _applyBasicMiddleWare = (SECRET: string) => {
    this._app.use(json())
    this._app.use(urlencoded({ extended: true }))
    this._app.use(cookieParser())
    this._app.use(session({
      secret: SECRET,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
      saveUninitialized: true,
      resave: true,
    }))
  }

  private _applyPassport = () => {

  }
}

export default App;