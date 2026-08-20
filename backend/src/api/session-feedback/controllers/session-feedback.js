'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
  'api::session-feedback.session-feedback',
  ({ strapi }) => ({

    async create(ctx) {
      const body = ctx.request.body?.data || ctx.request.body;
      const { session, invitationCode, rating, comment } = body;

      // Validate required fields
      if (!session || !rating) {
        return ctx.badRequest('session and rating are required');
      }

      // Validate rating range
      if (rating < 1 || rating > 5) {
        return ctx.badRequest('rating must be between 1 and 5');
      }

      // Invitation-code gate is disabled: resolve it only when the client still sends one.
      let codeId = null;
      if (invitationCode) {
        const codeRecord = await strapi.db
          .query('api::invitation-code.invitation-code')
          .findOne({ where: { code: invitationCode, isActive: true } });

        if (!codeRecord) {
          return ctx.unauthorized('Invalid or inactive invitation code');
        }
        codeId = codeRecord.id;
      }

      // Upsert only applies when we have a code to key on — otherwise every submission is a new row.
      const existing = codeId
        ? await strapi.db
            .query('api::session-feedback.session-feedback')
            .findOne({ where: { session, invitationCode: codeId } })
        : null;

      let result;

      if (existing) {
        result = await strapi.db
          .query('api::session-feedback.session-feedback')
          .update({
            where: { id: existing.id },
            data: { rating, comment: comment || null },
          });
      } else {
        result = await strapi.db
          .query('api::session-feedback.session-feedback')
          .create({ data: { session, invitationCode: codeId, rating, comment: comment || null } });
      }

      return ctx.send({ data: result });
    },

  })
);
