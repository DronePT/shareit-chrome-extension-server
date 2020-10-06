import socketio from 'socket.io';
import http from 'http';
import Koa from 'koa';
import { getMetadata } from './lib/get-metadata';

const sockets: Record<string, socketio.Socket> = {};

const getSocketsCount = () => Object.keys(sockets).length;

export const setupWebsockets = (app: Koa, server: http.Server): void => {
  const io = socketio(server);

  // Inject socket.io into KOa context to be accessible through
  // all middlewares.
  app.context.io = io;

  io.on('connection', (socket) => {
    sockets[socket.id] = socket;

    console.warn(`new connection: ${socket.id}`);

    io.emit('message', { count: getSocketsCount() });

    socket.on('disconnect', () => {
      delete sockets[socket.id];

      console.warn(`disconnected: ${socket.id}`);

      io.emit('message', { count: getSocketsCount() });
    });

    socket.on('url', async (targetUrl) => {
      const metadata = await getMetadata(targetUrl);

      io.emit('new-share', metadata);
    });
  });
};