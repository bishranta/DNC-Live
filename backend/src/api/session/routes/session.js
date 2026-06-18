'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/sessions',     handler: 'session.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/sessions/:id', handler: 'session.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/sessions',     handler: 'session.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/sessions/:id', handler: 'session.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/sessions/:id', handler: 'session.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
