'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
  'api::audience-question.audience-question',
  ({ strapi }) => ({

    async create(ctx) {
      const body = ctx.request.body?.data || ctx.request.body;
      const { session, invitationCode, name, question } = body;

      if (!session || !question) {
        return ctx.badRequest('session and question are required');
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

      // Questions are not upserted — one participant may ask several.
      const result = await strapi.db
        .query('api::audience-question.audience-question')
        .create({
          data: {
            session,
            invitationCode: codeId,
            name: name || null,
            question,
          },
        });

      return ctx.send({ data: result });
    },

  })
);
