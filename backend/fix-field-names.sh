#!/bin/bash
# Run from inside ~/work/DNC-Live/backend/
# Renames all snake_case field names to camelCase to match the frontend
set -e

echo "Updating schemas and logic to camelCase field names..."

# ─────────────────────────────────────────
# 1. NOTICE SCHEMA: is_published → isPublished
# ─────────────────────────────────────────
cat > src/api/notice/content-types/notice/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "notices",
  "info": {
    "singularName": "notice",
    "pluralName": "notices",
    "displayName": "Notice",
    "description": "Public announcements visible on the event site"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "title": { "type": "string", "required": true },
    "description": { "type": "richtext", "required": true },
    "priority": { "type": "integer", "default": 0 },
    "isPublished": { "type": "boolean", "default": true }
  }
}
EOF

# ─────────────────────────────────────────
# 2. INVITATION CODE SCHEMA: is_active → isActive
# ─────────────────────────────────────────
cat > src/api/invitation-code/content-types/invitation-code/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "invitation_codes",
  "info": {
    "singularName": "invitation-code",
    "pluralName": "invitation-codes",
    "displayName": "Invitation Code",
    "description": "Unique participant access codes for feedback submission"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "code": { "type": "string", "required": true, "unique": true },
    "isActive": { "type": "boolean", "default": true },
    "feedbacks": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::session-feedback.session-feedback",
      "mappedBy": "invitationCode"
    }
  }
}
EOF

# ─────────────────────────────────────────
# 3. SESSION SCHEMA: snake_case → camelCase
# ─────────────────────────────────────────
cat > src/api/session/content-types/session/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "sessions",
  "info": {
    "singularName": "session",
    "pluralName": "sessions",
    "displayName": "Session",
    "description": "Conference sessions with status control"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "title": { "type": "string", "required": true },
    "agenda": { "type": "text", "required": true },
    "description": { "type": "text", "required": true },
    "startTime": { "type": "datetime" },
    "endTime": { "type": "datetime" },
    "sessionStatus": {
      "type": "enumeration",
      "enum": ["upcoming", "ongoing", "completed"],
      "default": "upcoming",
      "required": true
    },
    "displayOrder": { "type": "integer", "default": 0 },
    "isFeatured": { "type": "boolean", "default": false },
    "liveYoutubeUrl": { "type": "string" },
    "participants": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::session-participant.session-participant",
      "mappedBy": "session"
    },
    "media": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::session-media.session-media",
      "mappedBy": "session"
    },
    "feedbacks": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::session-feedback.session-feedback",
      "mappedBy": "session"
    }
  }
}
EOF

# ─────────────────────────────────────────
# 4. SESSION PARTICIPANT SCHEMA
# ─────────────────────────────────────────
cat > src/api/session-participant/content-types/session-participant/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "session_participants",
  "info": {
    "singularName": "session-participant",
    "pluralName": "session-participants",
    "displayName": "Session Participant",
    "description": "Speakers, moderators, panelists and chairs per session"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "name": { "type": "string", "required": true },
    "photo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "bio": { "type": "text" },
    "designation": { "type": "string" },
    "organization": { "type": "string" },
    "role": {
      "type": "enumeration",
      "enum": ["speaker", "panelist", "moderator", "session_chair"],
      "required": true
    },
    "displayOrder": { "type": "integer", "default": 0 },
    "session": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::session.session",
      "inversedBy": "participants"
    }
  }
}
EOF

# ─────────────────────────────────────────
# 5. SESSION MEDIA SCHEMA: snake_case → camelCase
# ─────────────────────────────────────────
cat > src/api/session-media/content-types/session-media/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "session_medias",
  "info": {
    "singularName": "session-media",
    "pluralName": "session-medias",
    "displayName": "Session Media",
    "description": "Recorded YouTube videos per session — metadata auto-fetched"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "youtubeUrl": { "type": "string", "required": true },
    "youtubeVideoId": { "type": "string" },
    "title": { "type": "string" },
    "thumbnailUrl": { "type": "string" },
    "displayOrder": { "type": "integer", "default": 0 },
    "session": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::session.session",
      "inversedBy": "media"
    }
  }
}
EOF

# ─────────────────────────────────────────
# 6. SESSION FEEDBACK SCHEMA: invitation_code → invitationCode
# ─────────────────────────────────────────
cat > src/api/session-feedback/content-types/session-feedback/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "session_feedbacks",
  "info": {
    "singularName": "session-feedback",
    "pluralName": "session-feedbacks",
    "displayName": "Session Feedback",
    "description": "Anonymous participant feedback per session"
  },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "rating": { "type": "integer", "required": true },
    "comment": { "type": "text" },
    "session": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::session.session",
      "inversedBy": "feedbacks"
    },
    "invitationCode": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::invitation-code.invitation-code",
      "inversedBy": "feedbacks"
    }
  }
}
EOF

# ─────────────────────────────────────────
# 7. SESSION MEDIA LIFECYCLE: updated field names
# ─────────────────────────────────────────
cat > src/api/session-media/content-types/session-media/lifecycles.js << 'EOF'
'use strict';

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

async function fetchYouTubeMeta(url, videoId) {
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(oEmbedUrl);
  if (!res.ok) throw new Error(`oEmbed request failed with status ${res.status}`);
  const data = await res.json();
  return {
    title: data.title,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };
}

async function applyYouTubeMeta(data) {
  if (!data.youtubeUrl) return;

  const videoId = extractYouTubeId(data.youtubeUrl);
  if (!videoId) {
    console.warn('[SessionMedia] Could not extract YouTube video ID from:', data.youtubeUrl);
    return;
  }

  try {
    const meta = await fetchYouTubeMeta(data.youtubeUrl, videoId);
    data.youtubeVideoId = videoId;
    data.title = meta.title;
    data.thumbnailUrl = meta.thumbnailUrl;
    console.log('[SessionMedia] Fetched YouTube meta for:', videoId);
  } catch (err) {
    console.error('[SessionMedia] YouTube oEmbed fetch failed:', err.message);
  }
}

module.exports = {
  async beforeCreate(event) {
    await applyYouTubeMeta(event.params.data);
  },

  async beforeUpdate(event) {
    await applyYouTubeMeta(event.params.data);
  },
};
EOF

# ─────────────────────────────────────────
# 8. SESSION FEEDBACK CONTROLLER: updated field names
# ─────────────────────────────────────────
cat > src/api/session-feedback/controllers/session-feedback.js << 'EOF'
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

      // Validate invitation code exists and is active
      const code = await strapi.db
        .query('api::invitation-code.invitation-code')
        .findOne({ where: { id: invitationCode, isActive: true } });

      if (!code) {
        return ctx.unauthorized('Invalid or inactive invitation code');
      }

      // Upsert: update if exists, create if not
      const existing = await strapi.db
        .query('api::session-feedback.session-feedback')
        .findOne({ where: { session, invitationCode } });

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
          .create({ data: { session, invitationCode, rating, comment: comment || null } });
      }

      return ctx.send({ data: result });
    },

  })
);
EOF

echo ""
echo "✅ All field names updated to camelCase."
echo "   Strapi must drop and recreate DB tables since column names changed."
echo "   Run: npm run develop"
echo ""
echo "   NOTE: If you see DB column errors, you may need to reset the DB:"
echo "   psql -U dnclive -d dnclive_db -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'"
echo "   Then restart: npm run develop"
