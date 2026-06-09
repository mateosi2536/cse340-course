import { Router } from 'express';
import { showHomePage } from './controllers/index.js';
import { organizationValidation, showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createOrganization, showEditOrganizationPage, updateOrganizationPage } from './controllers/organizations.js';
import { projectValidation, showProjectsPage, showProjectDetailsPage, showNewProjectPage, createProject, showEditProjectPage, updateProjectPage } from './controllers/projects.js';
import { categoryValidation, showCategoriesPage, showCategoryDetailsPage, showNewCategoryPage, createCategory, showEditCategoryPage, updateCategoryPage } from './controllers/categories.js';
import { registerValidation, loginValidation, showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, showDashboard, showUsersPage, requireLogin, requireRole } from './controllers/users.js';

const router = Router();

const requireAdmin = requireRole('admin');

router.get('/', showHomePage);

router.get('/register', showUserRegistrationForm);
router.post('/register', registerValidation, processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', loginValidation, processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireAdmin, showUsersPage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireAdmin, showNewOrganizationPage);
router.post('/new-organization', requireAdmin, organizationValidation, createOrganization);
router.get('/edit-organization/:id', requireAdmin, showEditOrganizationPage);
router.post('/edit-organization/:id', requireAdmin, organizationValidation, updateOrganizationPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', requireAdmin, showNewProjectPage);
router.post('/new-project', requireAdmin, projectValidation, createProject);
router.get('/edit-project/:id', requireAdmin, showEditProjectPage);
router.post('/edit-project/:id', requireAdmin, projectValidation, updateProjectPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', requireAdmin, showNewCategoryPage);
router.post('/new-category', requireAdmin, categoryValidation, createCategory);
router.get('/edit-category/:id', requireAdmin, showEditCategoryPage);
router.post('/edit-category/:id', requireAdmin, categoryValidation, updateCategoryPage);

export default router;
