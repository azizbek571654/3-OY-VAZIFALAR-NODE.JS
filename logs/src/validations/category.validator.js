import Joi from 'joi';

const category = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

export const CategoryValidator = (data) => {
  return category.validate(data);
};

export default CategoryValidator;
