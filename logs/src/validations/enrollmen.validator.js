import Joi from 'joi';

const enrollment = Joi.object({
  user_id: Joi.string().length(24).required(),
  course_id: Joi.string().length(24).required(),
  enrolled_at: Joi.date(),
  email_send: Joi.boolean(),
});

export const enrollmentValidator = (data) => {
  return enrollment.validate(data);
};

export default enrollmentValidator;
