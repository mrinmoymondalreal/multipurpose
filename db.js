const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

// async function getPgVersion() {
//   const result = await sql`SELECT *
//   FROM works
//   ORDER BY date DESC
//   LIMIT 5;`;
//   console.log(result);
// }

// getPgVersion();

module.exports = sql;