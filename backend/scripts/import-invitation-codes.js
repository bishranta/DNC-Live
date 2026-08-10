/**
 * Bulk-import invitation codes from a CSV file.
 *
 *   npm run import:codes -- ../codes.csv
 *
 * CSV: one code per line, optional `isActive` second column (true/false).
 * A header row named "code" is skipped. Existing codes are left untouched.
 */
const fs = require("fs");
const path = require("path");

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node scripts/import-invitation-codes.js <file.csv>");
    process.exit(1);
  }

  const rows = fs
    .readFileSync(path.resolve(file), "utf8")
    .split(/\r?\n/)
    .map((line) => line.split(",").map((c) => c.trim().replace(/^"|"$/g, "")))
    .filter((cols) => cols[0] && cols[0].toLowerCase() !== "code");

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  let created = 0;
  let skipped = 0;
  for (const [code, isActive] of rows) {
    const existing = await strapi.documents("api::invitation-code.invitation-code").findMany({
      filters: { code: { $eq: code } },
      limit: 1,
    });
    if (existing.length) {
      skipped++;
      continue;
    }
    await strapi.documents("api::invitation-code.invitation-code").create({
      data: { code, isActive: isActive === undefined ? true : isActive !== "false" },
    });
    created++;
  }

  console.log(`invitation codes — created: ${created}, already existed: ${skipped}`);
  await strapi.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
