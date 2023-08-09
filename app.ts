import { resolve, join } from 'path';
import {
  createApp,
  fromNodeMiddleware,
  eventHandler,
  proxyRequest,
} from 'h3';
import consola from 'consola';

const serveStatic = require('serve-static');

const PORT = 8080;
const BACKEND_ENDPOINT = 'https://jsonplaceholder.typicode.com';

const app = createApp({
  onError: consola.error,
});
export default app;

app.use(
  '/api',
  eventHandler((event) =>
    proxyRequest(event, join(BACKEND_ENDPOINT, event.path))
  )
);

app.use(
  fromNodeMiddleware((req, res, next) => {
    if (!/\.\S+$/.test(req?.url ?? '')) req.url = '/';

    serveStatic(resolve('./ui'))(req, res, next);
  })
);