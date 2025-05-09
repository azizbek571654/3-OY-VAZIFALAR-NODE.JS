import { Course, User } from '../models/INDEX.module.js';
import { courseValidator } from '../validations/INDEX.validator.js';
import { catchError } from '../utils/INDEX.utils.js';

export class courseController {
  async createCourse(req, res) {
    try {
      const { error, value } = courseValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { title, description, price, category_id, author_id } = value;

      const chekCourse = await Course.findOne({ title });

      if (chekCourse) {
        return catchError(res, 409, 'Course alrady exists');
      }

      const author = await User.findById(author_id);

      if (!author) return catchError(res, 404, 'Author id not found');

      const course = await Course.create({
        title,
        description,
        price,
        category_id,
        author_id,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'Course Created successfull✅',
        data: course,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllCourse(req, res) {
    try {
      const courses = await Course.find()
        .populate('author_id')
        .populate('category_id');
      return res.status(200).json({
        statusCode: 200,
        count: courses.length,
        message: 'All Courses ✅',
        data: courses,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getCourseById(req, res) {
  try {
    const course = await Course.findById(req.params.id)
      .populate('author_id')
      .populate('category_id');

    if (!course) return catchError(res, 404, 'Course not found');

    return res.status(200).json({
      statusCode: 200,
      message: 'Successfully ✅',
      data: course,
    });
  } catch (error) {
    catchError(res, 500, error.message);
  }
}


  async UpdateCourseById(req, res) {
    try {
      const { error, value } = courseValidator(req.body);
      if (error) return catchError(res, 400, error.details[0].message);
      const updatedcourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).populate('author_id').populate('category_id');

      return res.status(200).json({
        statusCode: 200,
        message: 'Course updated ✅',
        data: updatedcourse,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteCourseById(req, res) {
    try {
      const course = await courseController.findById(res, req.params.id);
      if (!course) return catchError(res, 404, 'Course not found');
      await Course.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Course deleted ✅',
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const course = await Course.findById(id);
      if (!course) {
        return catchError(res, 404, `Course not found by ID ${id}`);
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
