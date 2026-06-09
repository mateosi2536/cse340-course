import { body, validationResult } from 'express-validator';
import { getUpcomingProjects, getProjectDetails, getCategoriesForProject, insertProject, updateProject, setProjectCategories } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getAllCategories } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required.'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required.')
        .isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.'),
    body('date')
        .trim()
        .notEmpty().withMessage('Date is required.'),
    body('organization_id')
        .trim()
        .notEmpty().withMessage('Organization is required.')
];

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

const showNewProjectPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const categories = await getAllCategories();
        res.render('new-project', { title: 'New Service Project', formData: {}, organizations, categories });
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect('/new-project');
        }
        const { title, description, location, date, organization_id } = req.body;
        const categoryIds = [].concat(req.body.categories || []);
        const newProject = await insertProject(organization_id, title, description, location, date);
        await setProjectCategories(newProject.project_id, categoryIds);
        req.flash('success', 'Project created successfully.');
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
        res.render('edit-project', { title: 'Edit Service Project', formData, organizations, categories });
    } catch (error) {
        next(error);
    }
};

const updateProjectPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect(`/edit-project/${id}`);
        }
        const { title, description, location, date, organization_id } = req.body;
        const categoryIds = [].concat(req.body.categories || []);
        await updateProject(id, organization_id, title, description, location, date);
        await setProjectCategories(id, categoryIds);
        req.flash('success', 'Project updated successfully.');
        res.redirect(`/project/${id}`);
    } catch (error) {
        next(error);
    }
};

export { projectValidation, showProjectsPage, showProjectDetailsPage, showNewProjectPage, createProject, showEditProjectPage, updateProjectPage };
