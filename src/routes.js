import { Router } from 'express';
import { showHomePage } from './controllers/index.js';
import { organizationValidation, showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createOrganization, showEditOrganizationPage, updateOrganizationPage } from './controllers/organizations.js';
import { projectValidation, showProjectsPage, showProjectDetailsPage, showNewProjectPage, createProject, showEditProjectPage, updateProjectPage } from './controllers/projects.js';
import { categoryValidation, showCategoriesPage, showCategoryDetailsPage, showNewCategoryPage, createCategory, showEditCategoryPage, updateCategoryPage } from './controllers/categories.js';

const router = Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationPage);
router.post('/new-organization', organizationValidation, createOrganization);
router.get('/edit-organization/:id', showEditOrganizationPage);
router.post('/edit-organization/:id', organizationValidation, updateOrganizationPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectPage);
router.post('/new-project', projectValidation, createProject);
router.get('/edit-project/:id', showEditProjectPage);
router.post('/edit-project/:id', projectValidation, updateProjectPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', showNewCategoryPage);
router.post('/new-category', categoryValidation, createCategory);
router.get('/edit-category/:id', showEditCategoryPage);
router.post('/edit-category/:id', categoryValidation, updateCategoryPage);

export default router;
