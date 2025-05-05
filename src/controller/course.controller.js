import Couese from '../model/index.module.js';
import courseValidator from '../validation/course.validation.js';
import { catchError } from '../utils/index.js';

export class courseController {
  async createCourse(req, res) {
    try {
      const { error, value } = courseValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { course_name, teachers_id, student_id, category, status } = value;
      const course = await Couese.create({
        course_name,
        teachers_id,
        student_id,
        category,
        status,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'successfull✅',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await Couese.find();
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: courses,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getcourseById(req, res) {
    try {
      const id = req.params.id;
      const course = await Couese.findById(id);
      if (!course) {
        return catchError(res, 404, 'course not found');
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'succes',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updatecourseById(req, res) {
    try {
      const id = req.params.id;
      const course = await Couese.findById(id);
      if (!course) {
        return catchError(res, 404, 'course not found');
      }
      const updatedcourse = await Couese.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: updatedcourse,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deletecourseById(req, res) {
    try {
      const id = req.params.id;
      const course = await Couese.findById(id);
      if (!course) {
        return catchError(res, 404, 'course not found');
      }
      if (course.role !== 'supercourse') {
        return catchError(res, 400, 'supper course can not be DELETE');
      }
      await Couese.findByIdAndDelete(id);
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
