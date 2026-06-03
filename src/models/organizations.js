import db from './db.js';

const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization;
    `;
    const result = await db.query(query);
    return result.rows;
};

const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;
    const result = await db.query(query, [organizationId]);
    return result.rows[0];
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT project_id, title, description, date, location
        FROM public.project
        WHERE organization_id = $1;
    `;
    const result = await db.query(query, [organizationId]);
    return result.rows;
};

const insertOrganization = async (name, description, contact_email, logo_filename) => {
    const query = `
        INSERT INTO public.organization (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id;
    `;
    const result = await db.query(query, [name, description, contact_email, logo_filename]);
    return result.rows[0];
};

const updateOrganization = async (id, name, description, contact_email, logo_filename) => {
    const query = `
        UPDATE public.organization
        SET name = $1, description = $2, contact_email = $3, logo_filename = $4
        WHERE organization_id = $5;
    `;
    await db.query(query, [name, description, contact_email, logo_filename, id]);
};

export { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId, insertOrganization, updateOrganization };
