import { getAllCategories, getCategoryDetails, getProjectsByCategoryId } from '../models/categories.js';

const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Service Categories', categories });
    } catch (error) {
        next(error);
    }
};

const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const category = await getCategoryDetails(req.params.id);
        const projects = await getProjectsByCategoryId(req.params.id);
        res.render('category', { title: category.name, category, projects });
    } catch (error) {
        next(error);
    }
};

export { showCategoriesPage, showCategoryDetailsPage };
