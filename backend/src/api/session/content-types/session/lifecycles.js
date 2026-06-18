'use strict';

module.exports = {
  // Before creating a session: enforce only one ongoing at a time
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.sessionStatus === 'ongoing') {
      // Demote any currently-ongoing session to completed (no id to exclude yet)
      await strapi.db.query('api::session.session').updateMany({
        where: { sessionStatus: 'ongoing' },
        data: { sessionStatus: 'completed' },
      });
    }
  },

  // Before updating a session: enforce only one ongoing at a time
  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.sessionStatus === 'ongoing') {
      // Set all OTHER ongoing sessions to completed
      await strapi.db.query('api::session.session').updateMany({
        where: {
          sessionStatus: 'ongoing',
          id: { $ne: where.id },
        },
        data: { sessionStatus: 'completed' },
      });
    }
  },

  async afterCreate(event) {
    if (strapi.io) {
      strapi.io.emit('session:updated', event.result);
    }
  },

  async afterUpdate(event) {
    if (strapi.io) {
      strapi.io.emit('session:updated', event.result);
    }
  },

  async afterDelete(event) {
    if (strapi.io) {
      strapi.io.emit('session:updated', { deleted: true, id: event.result.id });
    }
  },
};
