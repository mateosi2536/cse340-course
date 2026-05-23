import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (id) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getProjectsByCategoryId = async (id) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.date, p.location, o.name AS organization_name
        FROM public.project p
        JOIN public.project_category pc ON p.project_id = pc.project_id
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows;
};

export { getAllCategories, getCategoryDetails, getProjectsByCategoryId };
