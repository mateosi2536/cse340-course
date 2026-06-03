import { getUpcomingProjects, getProjectDetails, getCategoriesForProject, insertProject, updateProject, setProjectCategories } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getAllCategories } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        res.render('projects', { title: 'Upcoming Service Projects', projects });
    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const project = await getProjectDetails(req.params.id);
        const categories = await getCategoriesForProject(req.params.id);
        res.render('project', { title: project.title, project, categories });
    } catch (error) {
        next(error);
    }
};

const validateProjectFields = ({ title, description, location, date, organization_id }) => {
    const errors = [];
    if (!title || title.trim().length === 0) {
        errors.push('Title is required.');
    } else if (title.trim().length < 3) {
        errors.push('Title must be at least 3 characters.');
    } else if (title.trim().length > 150) {
        errors.push('Title must be 150 characters or fewer.');
    }
    if (!description || description.trim().length === 0) {
        errors.push('Description is required.');
    }
    if (!location || location.trim().length === 0) {
        errors.push('Location is required.');
    } else if (location.trim().length > 255) {
        errors.push('Location must be 255 characters or fewer.');
    }
    if (!date || date.trim().length === 0) {
        errors.push('Date is required.');
    }
    if (!organization_id) {
        errors.push('Organization is required.');
    }
    return errors;
};

const showNewProjectPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const categories = await getAllCategories();
        res.render('new-project', { title: 'New Service Project', errors: [], formData: {}, organizations, categories });
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const { title, description, location, date, organization_id } = req.body;
        const categoryIds = [].concat(req.body.categories || []);
        const errors = validateProjectFields({ title, description, location, date, organization_id });
        if (errors.length > 0) {
            const organizations = await getAllOrganizations();
            const categories = await getAllCategories();
            return res.render('new-project', { title: 'New Service Project', errors, formData: { title, description, location, date, organization_id, categories: categoryIds }, organizations, categories });
        }
        const newProject = await insertProject(organization_id, title.trim(), description.trim(), location.trim(), date);
        await setProjectCategories(newProject.project_id, categoryIds);
        res.redirect('/projects');
    } catch (error) {
        next(error);
    }
};

const showEditProjectPage = async (req, res, next) => {
    try {
        const project = await getProjectDetails(req.params.id);
        const projectCategories = await getCategoriesForProject(req.params.id);
        const organizations = await getAllOrganizations();
        const categories = await getAllCategories();
        const formData = {
            ...project,
            date: String(project.date).substring(0, 10),
            categories: projectCategories.map(c => String(c.category_id)),
        };
        res.render('edit-project', { title: 'Edit Service Project', errors: [], formData, organizations, categories });
    } catch (error) {
        next(error);
    }
};

const updateProjectPage = async (req, res, next) => {
    try {
        const { title, description, location, date, organization_id } = req.body;
        const categoryIds = [].concat(req.body.categories || []);
        const id = req.params.id;
        const errors = validateProjectFields({ title, description, location, date, organization_id });
        if (errors.length > 0) {
            const organizations = await getAllOrganizations();
            const categories = await getAllCategories();
            return res.render('edit-project', { title: 'Edit Service Project', errors, formData: { title, description, location, date, organization_id, categories: categoryIds, project_id: id }, organizations, categories });
        }
        await updateProject(id, organization_id, title.trim(), description.trim(), location.trim(), date);
        await setProjectCategories(id, categoryIds);
        res.redirect('/projects');
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage, showNewProjectPage, createProject, showEditProjectPage, updateProjectPage };
