import { CourseReview, Course, User } from '../models/INDEX.module.js';
import { courseReviewValidator } from '../validations/INDEX.validator.js';
import { catchError } from '../utils/INDEX.utils.js';

export class courseReviewController {
  async createReview(req, res) {
    try {
      const { error, value } = courseReviewValidator(req.body);
      if (error) return catchError(res, 400, error);

      const { user_id, course_id, rating, comment } = value;

      const user = await User.findById(user_id);
      const course = await Course.findById(course_id);
      if (!user) return catchError(res, 404, 'User not found');
      if (!course) return catchError(res, 404, 'Course not found');

      const review = await CourseReview.create({
        user_id,
        course_id,
        rating,
        comment,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'Review created ✅',
        data: review,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await CourseReview.find()
        .populate('user_id')
        .populate('course_id');
      return res.status(200).json({
        statusCode: 200,
        count: reviews.length,
        message: 'All reviews ✅',
        data: reviews,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await CourseReview.findById(req.params.id)
        .populate('user_id')
        .populate('course_id');
      if (!review) return catchError(res, 404, 'Review not found');
      return res.status(200).json({
        statusCode: 200,
        message: 'Review found ✅',
        data: review,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateReviewById(req, res) {
    try {
      const review = await CourseReview.findById(req.params.id);
      if (!review) return catchError(res, 404, 'Review not found');

      const updated = await CourseReview.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json({
        statusCode: 200,
        message: 'Review updated ✅',
        data: updated,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteReviewById(req, res) {
    try {
      const review = await CourseReview.findById(req.params.id);
      if (!review) return catchError(res, 404, 'Review not found');

      await CourseReview.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Review deleted ✅',
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
