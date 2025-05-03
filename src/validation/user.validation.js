import Joi from 'joi';

const user = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().min(8).max(25).required(),
  password: Joi.string().min(8).max(25).required(),
});

export const userValidator = (data) => {
  return user.validate(data);
};
