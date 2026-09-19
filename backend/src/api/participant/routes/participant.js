'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/participants',     handler: 'participant.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/participants/:id', handler: 'participant.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/participants',     handler: 'participant.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/participants/:id', handler: 'participant.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/participants/:id', handler: 'participant.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
