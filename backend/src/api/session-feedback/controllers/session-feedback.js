'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
  'api::session-feedback.session-feedback',
  ({ strapi }) => ({

    async create(ctx) {
      const body = ctx.request.body?.data || ctx.request.body;
      const { session, invitationCode, rating, comment } = body;

      // Validate required fields
      if (!session || !invitationCode || !rating) {
        return ctx.badRequest('session, invitationCode, and rating are required');
      }

      // Validate rating range
      if (rating < 1 || rating > 5) {
        return ctx.badRequest('rating must be between 1 and 5');
      }

      // Validate invitation code exists and is active (invitationCode is the code string, not an ID)
      const codeRecord = await strapi.db
        .query('api::invitation-code.invitation-code')
        .findOne({ where: { code: invitationCode, isActive: true } });

      if (!codeRecord) {
        return ctx.unauthorized('Invalid or inactive invitation code');
      }

      const codeId = codeRecord.id;

      // Upsert: update if exists, create if not
      const existing = await strapi.db
        .query('api::session-feedback.session-feedback')
        .findOne({ where: { session, invitationCode: codeId } });

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
