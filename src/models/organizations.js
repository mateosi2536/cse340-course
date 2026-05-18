import db from './db.js';

/**
 * Retrieves all partner organizations from the database.
 * Explicitly requests necessary columns to avoid performance and security
 * issues related to SELECT *.
 * 
 * @returns {Promise<Array>} List of organizations
 */
const getAllOrganizations = async () => {
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
  `;

  const result = await db.query(query);

  return result.rows;
};

export { getAllOrganizations };
