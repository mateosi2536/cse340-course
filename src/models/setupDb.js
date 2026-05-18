import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads and executes setup.sql to build the schema and seed organizations.
 */
const runSetup = async () => {
  try {
    console.log('Reading setup.sql...');
    const sqlPath = path.join(__dirname, '../setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing setup.sql against the database...');
    await db.query(sql);

    console.log('Database tables created and seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error running setup.sql:', error.message);
    process.exit(1);
  }
};

runSetup();
