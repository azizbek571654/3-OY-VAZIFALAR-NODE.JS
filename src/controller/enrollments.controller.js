import { Enrollment, Course, User } from '../models/INDEX.module.js';
import { enrollmentValidator } from '../validations/INDEX.validator.js';
import {
  transport,
  catchError,
  optgenerator,
  setCache,
} from '../utils/INDEX.utils.js';

export class enrollmentController {
  async createEnrollment(req, res) {
    try {
      const { error, value } = enrollmentValidator(req.body);
      if (error) return catchError(res, 400, error);

      const { user_id, course_id, enrolled_at, email_send } = value;

      const user = await User.findById(user_id);
      if (!user) return catchError(res, 404, 'User not found');

      const course = await Course.findById(course_id);
      if (!course) return catchError(res, 404, 'Course not found');

      const alreadyEnrolled = await Enrollment.findOne({ user_id, course_id });
      if (alreadyEnrolled) {
        return catchError(
          res,
          400,
          'Bu foydalanuvchi ushbu kursga allaqachon yozilgan'
        );
      }

      const mailMessage = {
        from: process.env.SMTP_USER,
        to: process.env.USER_EMAIL,
        subject: 'Kursga yozilganingiz tasdiqlandi',
        text: `Siz "${course.title}" kursiga muvaffaqiyatli ro'yxatdan o'tdingiz
        darsingiz keyingi haftaning dushanba kunidan boshlanadi.`,
      };

      const enrollment = await Enrollment.create({
        user_id,
        course_id,
        enrolled_at: enrolled_at || Date.now(),
        email_send: false,
      });

      const otp = optgenerator();

      await new Promise((resolve, reject) => {
        transport.sendMail(mailMessage, async (err, info) => {
          if (err) {
            console.log(`Error sending mail: ${err}`);
            return reject(catchError(res, 400, err));
          }
          console.log(info);
          setCache(user.email, otp);

          if (info) {
            await Enrollment.findByIdAndUpdate(enrollment._id, {
              email_send: true,
            });
          } else {
            catchError(res, 401, 'Tasdiqlovchi habar yuborilmadi');
          }
          resolve();
        });
      });

      const populatedEnrollment = await Enrollment.findById(enrollment._id)
        .populate('user_id')
        .populate('course_id');

      return res.status(201).json({
        statusCode: 201,
        message: 'Enrolled successfully ✅',
        data: populatedEnrollment,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllEnrollments(req, res) {
    try {
      const enrollments = await Enrollment.find()
        .populate('user_id')
        .populate('course_id');
      return res.status(200).json({
        statusCode: 200,
        count: enrollments.length,
        message: 'Success ✅',
        data: enrollments,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getEnrollmentById(req, res) {
    try {
      const enrollment = await Enrollment.findById(req.params.id)
        .populate('user_id')
        .populate('course_id');
      if (!enrollment) return catchError(res, 404, 'Enrollment not found');

      return res.status(200).json({
        statusCode: 200,
        message: 'Success ✅',
        data: enrollment,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateEnrollmentById(req, res) {
    try {
      const { error, value } = enrollmentValidator(req.body);
      if (error) return catchError(res, 400, error);

      const enrollment = await Enrollment.findById(req.params.id);
      if (!enrollment) return catchError(res, 404, 'Enrollment not found');

      const updatedEnrollment = await Enrollment.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );

      return res.status(200).json({
        statusCode: 200,
        message: 'Enrollment updated ✅',
        data: updatedEnrollment,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteEnrollmentById(req, res) {
    try {
      const enrollment = await Enrollment.findById(req.params.id);
      if (!enrollment) return catchError(res, 404, 'Enrollment not found');

      await Enrollment.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        statusCode: 200,
        message: 'Enrollment deleted ✅',
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
