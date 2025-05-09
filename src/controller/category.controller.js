import { Category } from '../models/INDEX.module.js';
import { CategoryValidator } from '../validations/INDEX.validator.js';
import { catchError } from '../utils/INDEX.utils.js';

export class categoryController {
  async createCategory(req, res) {
    try {
      const { error, value } = CategoryValidator(req.body);
      if (error) return catchError(res, 400, error);

      const category = await Category.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'Category created successfully ✅',
        data: category,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        statusCode: 200,
        count: categories.length,
        message: 'Success ✅',
        data: categories,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return catchError(res, 404, 'Category not found');

      return res.status(200).json({
        statusCode: 200,
        message: 'Success ✅',
        data: category,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateCategoryById(req, res) {
    try {
      const { error, value } = CategoryValidator(req.body);
      if (error) return catchError(res, 400, error);

      const category = await Category.findById(req.params.id);
      if (!category) return catchError(res, 404, 'Category not found');

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );

      return res.status(200).json({
        statusCode: 200,
        message: 'Category updated ✅',
        data: updatedCategory,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return catchError(res, 404, 'Category not found');

      await Category.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        statusCode: 200,
        message: 'Category deleted ✅',
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
