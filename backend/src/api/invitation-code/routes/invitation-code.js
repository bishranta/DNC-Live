'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/invitation-codes',     handler: 'invitation-code.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/invitation-codes/:id', handler: 'invitation-code.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/invitation-codes',     handler: 'invitation-code.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/invitation-codes/:id', handler: 'invitation-code.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/invitation-codes/:id', handler: 'invitation-code.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
