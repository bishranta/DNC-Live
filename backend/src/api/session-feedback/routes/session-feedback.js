'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/session-feedbacks',     handler: 'session-feedback.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/session-feedbacks/:id', handler: 'session-feedback.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/session-feedbacks',     handler: 'session-feedback.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/session-feedbacks/:id', handler: 'session-feedback.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/session-feedbacks/:id', handler: 'session-feedback.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
