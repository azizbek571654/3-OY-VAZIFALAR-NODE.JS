import Joi from 'joi';

const user = Joi.object({
  full_name: Joi.string().min(4).max(35).required(),
  email: Joi.string().min(8).max(25).required(),
  hashedPassword: Joi.string().min(8).max(25).required(),
  role: Joi.string()
    .valid('superadmin', 'admin', 'teacher', 'student')
    .optional(),
});

export const userValidator = (data) => {
  return user.validate(data);
};

export default userValidator;
