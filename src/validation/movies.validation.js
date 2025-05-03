import Joi from 'joi';

const movies = Joi.object({
  title: Joi.string().min(8).max(30).required(),
  genre: Joi.string().min(5).max(25).required(),
  comments: Joi.string().min(15).max(35).required(),
});

export const moviesValidator = (data) => {
  return movies.validate(data);
};
