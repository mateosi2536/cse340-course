import db from './db.js';

const getAllProjects = async () => {
  const query = `
    SELECT p.*, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id;
  `;
  const result = await db.query(query);
  return result.rows;
};

export { getAllProjects };
