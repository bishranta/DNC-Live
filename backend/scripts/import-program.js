/**
 * Bulk-import sessions, participants, and their per-session roles from the
 * data-export CSVs.
 *
 *   npm run import:program
 *   npm run import:program -- ../data-export/sessions.csv ../data-export/participants.csv ../data-export/session_participants.csv ../frontend/public
 *
 * Each CSV's documentId column is used as the Strapi documentId directly, so
 * sessions, participants, and links can be created independently and
 * cross-referenced without an id-mapping step.
 *
 * Idempotent: re-running skips any row whose documentId already exists.
 * Participant photo paths (e.g. /images/speakers/x.jpg) are resolved against
 * the frontend's public/ dir and uploaded; missing files are skipped with a
 * warning rather than failing the import.
 */
const fs = require("fs");
const path = require("path");

function parseCSV(file) {
  const text = fs.readFileSync(path.resolve(file), "utf8");
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\r") {
      // ignore, \n (or end of input) closes the row
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const header = rows[0];
  return rows
    .slice(1)
    .filter((cols) => cols.length === header.length && cols.some((v) => v !== ""))
    .map((cols) => Object.fromEntries(header.map((key, i) => [key, cols[i].trim()])));
}

const orNull = (v) => (v ? v : null);
const bool = (v) => (v || "").toLowerCase() === "true";

const EXT_TO_MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

async function uploadPhoto(strapi, absPath) {
  const stat = fs.statSync(absPath);
  const uploadService = strapi.plugin("upload").service("upload");
  const [uploaded] = await uploadService.upload({
    data: {},
    files: {
      filepath: absPath,
      originalFilename: path.basename(absPath),
      mimetype: EXT_TO_MIME[path.extname(absPath).toLowerCase()] || "application/octet-stream",
      size: stat.size,
    },
  });
  return uploaded.id;
}

async function main() {
  const sessionsFile = process.argv[2] || "../data-export/sessions.csv";
  const participantsFile = process.argv[3] || "../data-export/participants.csv";
  const linksFile = process.argv[4] || "../data-export/session_participants.csv";
  const photosBaseDir = process.argv[5] || "../frontend/public";

  const sessionRows = parseCSV(sessionsFile);
  const participantRows = parseCSV(participantsFile);
  const linkRows = parseCSV(linksFile);

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  const sessionApi = strapi.documents("api::session.session");
  const participantApi = strapi.documents("api::participant.participant");
  const linkApi = strapi.documents("api::session-participant.session-participant");

  const exists = async (api, documentId) => Boolean(await api.findOne({ documentId }));

  let sessionsCreated = 0;
  let sessionsSkipped = 0;
  for (const row of sessionRows) {
    if (await exists(sessionApi, row.documentId)) {
      sessionsSkipped++;
      continue;
    }
    await sessionApi.create({
      data: {
        documentId: row.documentId,
        title: row.title,
        agenda: orNull(row.agenda),
        description: orNull(row.description),
        sessionStatus: row.sessionStatus || "upcoming",
        startTime: orNull(row.startTime),
        endTime: orNull(row.endTime),
        displayOrder: Number(row.displayOrder) || 0,
        isFeatured: bool(row.isFeatured),
        liveYoutubeUrl: orNull(row.liveYoutubeUrl),
      },
    });
    sessionsCreated++;
  }

  let participantsCreated = 0;
  let participantsSkipped = 0;
  let photosUploaded = 0;
  let photosMissing = 0;
  for (const row of participantRows) {
    if (await exists(participantApi, row.documentId)) {
      participantsSkipped++;
      continue;
    }

    let photoId = null;
    if (row.photo) {
      const absPath = path.resolve(photosBaseDir, "." + row.photo);
      if (fs.existsSync(absPath)) {
        try {
          photoId = await uploadPhoto(strapi, absPath);
          photosUploaded++;
        } catch (err) {
          console.warn(`participant "${row.name}" — photo upload failed for ${absPath}: ${err.message}`);
          photosMissing++;
        }
      } else {
        console.warn(`participant "${row.name}" — photo not found at ${absPath}, skipping`);
        photosMissing++;
      }
    }

    await participantApi.create({
      data: {
        documentId: row.documentId,
        name: row.name,
        bio: orNull(row.bio),
        designation: orNull(row.designation),
        organization: orNull(row.organization),
        photo: photoId,
      },
    });
    participantsCreated++;
  }

  let linksCreated = 0;
  let linksSkipped = 0;
  let linksMissingRef = 0;
  for (const row of linkRows) {
    if (await exists(linkApi, row.documentId)) {
      linksSkipped++;
      continue;
    }
    const [sessionOk, participantOk] = await Promise.all([
      exists(sessionApi, row.session),
      exists(participantApi, row.participant),
    ]);
    if (!sessionOk || !participantOk) {
      console.warn(`skipping link "${row.documentId}" — session or participant not found`);
      linksMissingRef++;
      continue;
    }
    await linkApi.create({
      data: {
        documentId: row.documentId,
        role: row.role,
        displayOrder: Number(row.displayOrder) || 0,
        session: row.session,
        participant: row.participant,
      },
    });
    linksCreated++;
  }

  console.log(`sessions — created: ${sessionsCreated}, already existed: ${sessionsSkipped}`);
  console.log(
    `participants — created: ${participantsCreated}, already existed: ${participantsSkipped}, photos uploaded: ${photosUploaded}, photos missing: ${photosMissing}`,
  );
  console.log(
    `session participants — created: ${linksCreated}, already existed: ${linksSkipped}, missing session/participant: ${linksMissingRef}`,
  );

  await strapi.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
