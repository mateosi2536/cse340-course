import { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId, insertOrganization, updateOrganization } from '../models/organizations.js';

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

const validateOrganizationFields = ({ name, description, contact_email, logo_filename }) => {
    const errors = [];
    if (!name || name.trim().length === 0) {
        errors.push('Organization name is required.');
    } else if (name.trim().length < 3) {
        errors.push('Organization name must be at least 3 characters.');
    } else if (name.trim().length > 150) {
        errors.push('Organization name must be 150 characters or fewer.');
    }
    if (!description || description.trim().length === 0) {
        errors.push('Description is required.');
    } else if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters.');
    }
    if (!contact_email || contact_email.trim().length === 0) {
        errors.push('Contact email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email.trim())) {
        errors.push('Contact email must be a valid email address.');
    }
    if (!logo_filename || logo_filename.trim().length === 0) {
        errors.push('Logo filename is required.');
    }
    return errors;
};

const showNewOrganizationPage = async (req, res, next) => {
    try {
        res.render('new-organization', { title: 'New Organization', errors: [], formData: {} });
    } catch (error) {
        next(error);
    }
};

const createOrganization = async (req, res, next) => {
    try {
        const { name, description, contact_email, logo_filename } = req.body;
        const errors = validateOrganizationFields({ name, description, contact_email, logo_filename });
        if (errors.length > 0) {
            return res.render('new-organization', { title: 'New Organization', errors, formData: { name, description, contact_email, logo_filename } });
        }
        await insertOrganization(name.trim(), description.trim(), contact_email.trim(), logo_filename.trim());
        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
};

const showEditOrganizationPage = async (req, res, next) => {
    try {
        const organization = await getOrganizationDetails(req.params.id);
        res.render('edit-organization', { title: 'Edit Organization', errors: [], formData: organization });
    } catch (error) {
        next(error);
    }
};

const updateOrganizationPage = async (req, res, next) => {
    try {
        const { name, description, contact_email, logo_filename } = req.body;
        const id = req.params.id;
        const errors = validateOrganizationFields({ name, description, contact_email, logo_filename });
        if (errors.length > 0) {
            return res.render('edit-organization', { title: 'Edit Organization', errors, formData: { name, description, contact_email, logo_filename, organization_id: id } });
        }
        await updateOrganization(id, name.trim(), description.trim(), contact_email.trim(), logo_filename.trim());
        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
};

export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createOrganization, showEditOrganizationPage, updateOrganizationPage };
