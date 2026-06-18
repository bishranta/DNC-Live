'use strict';

module.exports = {
  async afterCreate(event) {
    if (strapi.io) {
      strapi.io.emit('notice:updated', event.result);
    }
  },

  async afterUpdate(event) {
    if (strapi.io) {
      strapi.io.emit('notice:updated', event.result);
    }
  },

  async afterDelete(event) {
    if (strapi.io) {
      strapi.io.emit('notice:updated', { deleted: true, id: event.result.id });
    }
  },
};
