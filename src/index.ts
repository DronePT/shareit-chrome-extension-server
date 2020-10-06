import http from 'http';
import { app } from './app';
import { setupWebsockets } from './app.websockets';

const server = http.createServer(app.callback());

setupWebsockets(app, server);

const { PORT = 1337 } = process.env;

server.listen(PORT, () => console.warn(`running :${PORT}`));
