import { getAllCategories, getCategoryDetails, getProjectsByCategoryId, insertCategory, updateCategory } from '../models/categories.js';

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

const showNewCategoryPage = async (req, res, next) => {
    try {
        res.render('new-category', { title: 'New Category', errors: [], formData: {} });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const errors = [];
        if (!name || name.trim().length === 0) {
            errors.push('Category name is required.');
        } else if (name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.trim().length > 100) {
            errors.push('Category name must be 100 characters or fewer.');
        }
        if (errors.length > 0) {
            return res.render('new-category', { title: 'New Category', errors, formData: { name } });
        }
        await insertCategory(name.trim());
        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
};

const showEditCategoryPage = async (req, res, next) => {
    try {
        const category = await getCategoryDetails(req.params.id);
        res.render('edit-category', { title: 'Edit Category', errors: [], formData: category });
    } catch (error) {
        next(error);
    }
};

const updateCategoryPage = async (req, res, next) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const errors = [];
        if (!name || name.trim().length === 0) {
            errors.push('Category name is required.');
        } else if (name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.trim().length > 100) {
            errors.push('Category name must be 100 characters or fewer.');
        }
        if (errors.length > 0) {
            return res.render('edit-category', { title: 'Edit Category', errors, formData: { name, category_id: id } });
        }
        await updateCategory(id, name.trim());
        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
};

export { showCategoriesPage, showCategoryDetailsPage, showNewCategoryPage, createCategory, showEditCategoryPage, updateCategoryPage };
