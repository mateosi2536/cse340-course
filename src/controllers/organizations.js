import { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId } from '../models/organizations.js';

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

export { showOrganizationsPage, showOrganizationDetailsPage };
