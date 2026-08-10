'use strict';
module.exports = {
  routes: [
    { method: 'GET',    path: '/audience-questions',     handler: 'audience-question.find',    info: { type: 'content-api' }, config: {} },
    { method: 'GET',    path: '/audience-questions/:id', handler: 'audience-question.findOne', info: { type: 'content-api' }, config: {} },
    { method: 'POST',   path: '/audience-questions',     handler: 'audience-question.create',  info: { type: 'content-api' }, config: {} },
    { method: 'PUT',    path: '/audience-questions/:id', handler: 'audience-question.update',  info: { type: 'content-api' }, config: {} },
    { method: 'DELETE', path: '/audience-questions/:id', handler: 'audience-question.delete',  info: { type: 'content-api' }, config: {} },
  ],
};
