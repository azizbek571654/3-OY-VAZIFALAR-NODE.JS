import Joi from 'joi';

const course = Joi.object({
  course_name: Joi.string().required(),
  teachers_id: Joi.string().required(),
  student_id: Joi.string().required(),
  category: Joi.string().min(5).max(35).required(),
  status: Joi.string().min(5).max(45).required(),
});

export const courseValidator = (data) => {
  return course.validate(data);
};

export default courseValidator;
