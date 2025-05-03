import Joi from 'joi';

const review = Joi.object({
  user_id: Joi.string().hex().length(24).required(),
  movie_id: Joi.string().hex().length(24).required(),
  rating: Joi.number().min(0).max(10).required(),
  comment: Joi.string().max(500).allow('').optional(),
});

export const reviewValidator = (data) => {
  return review.validate(data, { abortEarly: false });
};
