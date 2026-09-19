/**
 * Bulk-import sessions and their participants from the data-export CSVs.
 *
 *   npm run import:program
 *   npm run import:program -- ../data-export/dnc_sessions.csv ../data-export/dnc_session_participants.csv
 *
 * Idempotent: re-running skips sessions that already exist (matched by
 * title + displayOrder) and participants that already exist (matched by
 * session + name + role).
 */
const fs = require("fs");
const path = require("path");

function parseCSVLine(line) {
  const fields = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      fields.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  fields.push(cur);
  return fields;
}

function parseCSV(file) {
  const lines = fs
    .readFileSync(path.resolve(file), "utf8")
    .split(/\r?\n/)
    .filter((line) => line.length > 0);
  const header = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cols = parseCSVLine(line);
    const row = {};
    header.forEach((key, i) => (row[key] = (cols[i] ?? "").trim()));
    return row;
  });
}

const bool = (v) => v.toUpperCase() === "TRUE";
const orNull = (v) => (v ? v : null);

async function main() {
  const sessionsFile = process.argv[2] || "../data-export/dnc_sessions.csv";
  const participantsFile =
    process.argv[3] || "../data-export/dnc_session_participants.csv";

  const sessionRows = parseCSV(sessionsFile);
  const participantRows = parseCSV(participantsFile);

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  const sessionApi = strapi.documents("api::session.session");
  const participantApi = strapi.documents(
    "api::session-participant.session-participant",
  );

  // csvSessionId -> created session documentId
  const sessionIdMap = {};
  let sessionsCreated = 0;
  let sessionsSkipped = 0;

  for (const row of sessionRows) {
    const displayOrder = Number(row.display_order);
    const existing = await sessionApi.findMany({
      filters: { title: { $eq: row.title }, displayOrder: { $eq: displayOrder } },
      limit: 1,
    });

    if (existing.length) {
      sessionIdMap[row.id] = existing[0].documentId;
      sessionsSkipped++;
      continue;
    }

    const created = await sessionApi.create({
      data: {
        title: row.title,
        agenda: orNull(row.agenda),
        description: orNull(row.description),
        sessionStatus: row.session_status || "upcoming",
        startTime: orNull(row.start_time),
        endTime: orNull(row.end_time),
        displayOrder,
        isFeatured: bool(row.is_featured || "FALSE"),
        liveYoutubeUrl: orNull(row.live_youtube_url),
      },
    });
    sessionIdMap[row.id] = created.documentId;
    sessionsCreated++;
  }

  let participantsCreated = 0;
  let participantsSkipped = 0;
  let participantsMissingSession = 0;

  for (const row of participantRows) {
    const sessionDocumentId = sessionIdMap[row.session_id];
    if (!sessionDocumentId) {
      console.warn(
        `skipping participant "${row.name}" — no session found for session_id=${row.session_id}`,
      );
      participantsMissingSession++;
      continue;
    }

    const existing = await participantApi.findMany({
      filters: {
        name: { $eq: row.name },
        role: { $eq: row.role },
        session: { documentId: { $eq: sessionDocumentId } },
      },
      limit: 1,
    });

    if (existing.length) {
      participantsSkipped++;
      continue;
    }

    await participantApi.create({
      data: {
        name: row.name,
        designation: orNull(row.designation),
        organization: orNull(row.organization),
        role: row.role,
        bio: orNull(row.bio),
        displayOrder: Number(row.display_order) || 0,
        session: sessionDocumentId,
      },
    });
    participantsCreated++;
  }

  console.log(
    `sessions — created: ${sessionsCreated}, already existed: ${sessionsSkipped}`,
  );
  console.log(
    `participants — created: ${participantsCreated}, already existed: ${participantsSkipped}, missing session: ${participantsMissingSession}`,
  );

  await strapi.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
