'use strict';

const { Server } = require('socket.io');

module.exports = {
  register({ strapi }) {},

  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    // Make io accessible from lifecycle hooks via strapi.io
    strapi.io = io;

    io.on('connection', (socket) => {
      console.log('[Socket.IO] Client connected:', socket.id);
      socket.on('disconnect', () => {
        console.log('[Socket.IO] Client disconnected:', socket.id);
      });
    });

    console.log('[Socket.IO] Server initialized');
  },
};
