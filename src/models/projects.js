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

const insertProject = async (organization_id, title, description, location, date) => {
    const query = `
        INSERT INTO public.project (organization_id, title, description, location, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;
    const result = await db.query(query, [organization_id, title, description, location, date]);
    return result.rows[0];
};

const updateProject = async (id, organization_id, title, description, location, date) => {
    const query = `
        UPDATE public.project
        SET organization_id = $1, title = $2, description = $3, location = $4, date = $5
        WHERE project_id = $6;
    `;
    await db.query(query, [organization_id, title, description, location, date, id]);
};

const setProjectCategories = async (project_id, category_ids) => {
    await db.query(`DELETE FROM public.project_category WHERE project_id = $1;`, [project_id]);
    for (const category_id of category_ids) {
        await db.query(
            `INSERT INTO public.project_category (project_id, category_id) VALUES ($1, $2);`,
            [project_id, category_id]
        );
    }
};

export { getAllProjects, getUpcomingProjects, getProjectDetails, getCategoriesForProject, insertProject, updateProject, setProjectCategories };
