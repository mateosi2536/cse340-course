import { getUpcomingProjects, getProjectDetails, getCategoriesForProject } from '../models/projects.js';

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

export { showProjectsPage, showProjectDetailsPage };
