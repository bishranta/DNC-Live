'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
  'api::audience-question.audience-question',
  ({ strapi }) => ({

    async create(ctx) {
      const body = ctx.request.body?.data || ctx.request.body;
      const { session, invitationCode, name, question } = body;

      if (!session || !invitationCode || !question) {
        return ctx.badRequest('session, invitationCode, and question are required');
      }

      // invitationCode is the code string, not an ID
      const codeRecord = await strapi.db
        .query('api::invitation-code.invitation-code')
        .findOne({ where: { code: invitationCode, isActive: true } });

      if (!codeRecord) {
        return ctx.unauthorized('Invalid or inactive invitation code');
      }

      // Questions are not upserted — one participant may ask several.
      const result = await strapi.db
        .query('api::audience-question.audience-question')
        .create({
          data: {
            session,
            invitationCode: codeRecord.id,
            name: name || null,
            question,
          },
        });

      return ctx.send({ data: result });
    },

  })
);
