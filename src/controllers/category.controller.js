import { Category } from "../models/index.js";

export const categoryController = {
  create: async (req, res, next) => {
    try {
      const category = new Category(req.body);
      await category.save();

      res.status(201).send(category);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedCategory) {
        return res.status(404).send("Category not found");
      }

      res.status(200).send(updatedCategory);
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const categories = await Category.find();

      res.status(200).send(categories);
    } catch (err) {
      next(err);
    }
  },
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).send("Category not found");
      }

      res.status(200).send(category);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).send("Category not found");
      }

      res.status(200).send("Category deleted successfully");
    } catch (err) {
      next(err);
    }
  },
};
