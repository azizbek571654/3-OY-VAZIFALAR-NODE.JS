import Joi from 'joi';

const course = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  category_id: Joi.string().length(24).min(3).max(50).required(),
  author_id: Joi.string().length(24).required(),
});

export const courseValidator = (data) => {
  return course.validate(data);
};

export default courseValidator;
