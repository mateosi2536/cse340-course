import { body, validationResult } from 'express-validator';
import { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId, insertOrganization, updateOrganization } from '../models/organizations.js';

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Organization name is required.')
        .isLength({ min: 3, max: 150 }).withMessage('Organization name must be between 3 and 150 characters.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required.')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters.'),
    body('contact_email')
        .trim()
        .notEmpty().withMessage('Contact email is required.')
        .isEmail().withMessage('Contact email must be a valid email address.'),
    body('logo_filename')
        .trim()
        .notEmpty().withMessage('Logo filename is required.')
];

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Our Partner Organizations', organizations });
    } catch (error) {
        next(error);
    }
};

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organization = await getOrganizationDetails(req.params.id);
        const projects = await getProjectsByOrganizationId(req.params.id);
        res.render('organization', { title: organization.name, organization, projects });
    } catch (error) {
        next(error);
    }
};

const showNewOrganizationPage = async (req, res, next) => {
    try {
        res.render('new-organization', { title: 'New Organization', formData: {} });
    } catch (error) {
        next(error);
    }
};

const createOrganization = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect('/new-organization');
        }
        const { name, description, contact_email, logo_filename } = req.body;
        await insertOrganization(name, description, contact_email, logo_filename);
        req.flash('success', 'Organization created successfully.');
        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
};

const showEditOrganizationPage = async (req, res, next) => {
    try {
        const organization = await getOrganizationDetails(req.params.id);
        res.render('edit-organization', { title: 'Edit Organization', formData: organization });
    } catch (error) {
        next(error);
    }
};

const updateOrganizationPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect(`/edit-organization/${id}`);
        }
        const { name, description, contact_email, logo_filename } = req.body;
        await updateOrganization(id, name, description, contact_email, logo_filename);
        req.flash('success', 'Organization updated successfully.');
        res.redirect(`/organization/${id}`);
    } catch (error) {
        next(error);
    }
};

export { organizationValidation, showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createOrganization, showEditOrganizationPage, updateOrganizationPage };
