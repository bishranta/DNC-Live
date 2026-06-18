'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/notices',     handler: 'notice.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/notices/:id', handler: 'notice.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/notices',     handler: 'notice.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/notices/:id', handler: 'notice.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/notices/:id', handler: 'notice.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
