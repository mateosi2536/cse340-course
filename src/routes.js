import { Router } from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createOrganization, showEditOrganizationPage, updateOrganizationPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectPage, createProject, showEditProjectPage, updateProjectPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showNewCategoryPage, createCategory, showEditCategoryPage, updateCategoryPage } from './controllers/categories.js';

const router = Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationPage);
router.post('/new-organization', createOrganization);
router.get('/edit-organization/:id', showEditOrganizationPage);
router.post('/edit-organization/:id', updateOrganizationPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectPage);
router.post('/new-project', createProject);
router.get('/edit-project/:id', showEditProjectPage);
router.post('/edit-project/:id', updateProjectPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', showNewCategoryPage);
router.post('/new-category', createCategory);
router.get('/edit-category/:id', showEditCategoryPage);
router.post('/edit-category/:id', updateCategoryPage);

export default router;
