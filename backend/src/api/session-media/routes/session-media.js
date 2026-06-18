'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/session-medias',     handler: 'session-media.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/session-medias/:id', handler: 'session-media.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/session-medias',     handler: 'session-media.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/session-medias/:id', handler: 'session-media.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/session-medias/:id', handler: 'session-media.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
