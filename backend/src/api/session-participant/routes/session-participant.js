'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/session-participants',     handler: 'session-participant.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/session-participants/:id', handler: 'session-participant.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/session-participants',     handler: 'session-participant.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/session-participants/:id', handler: 'session-participant.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/session-participants/:id', handler: 'session-participant.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
