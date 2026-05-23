import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id;
    `;
    const result = await db.query(query);
    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getCategoriesForProject = async (id) => {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows;
};

export { getAllProjects, getUpcomingProjects, getProjectDetails, getCategoriesForProject };
