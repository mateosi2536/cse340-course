import { body, validationResult } from 'express-validator';
import { getAllCategories, getCategoryDetails, getProjectsByCategoryId, insertCategory, updateCategory } from '../models/categories.js';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters.')
];

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
        res.render('new-category', { title: 'New Category', formData: {} });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect('/new-category');
        }
        const { name } = req.body;
        await insertCategory(name);
        req.flash('success', 'Category created successfully.');
        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
};

const showEditCategoryPage = async (req, res, next) => {
    try {
        const category = await getCategoryDetails(req.params.id);
        res.render('edit-category', { title: 'Edit Category', formData: category });
    } catch (error) {
        next(error);
    }
};

const updateCategoryPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => req.flash('error', error.msg));
            return res.redirect(`/edit-category/${id}`);
        }
        const { name } = req.body;
        await updateCategory(id, name);
        req.flash('success', 'Category updated successfully.');
        res.redirect(`/category/${id}`);
    } catch (error) {
        next(error);
    }
};

export { categoryValidation, showCategoriesPage, showCategoryDetailsPage, showNewCategoryPage, createCategory, showEditCategoryPage, updateCategoryPage };
