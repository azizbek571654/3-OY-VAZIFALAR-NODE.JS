import Joi from "joi";

const genres = Joi.object({
  name: Joi.string().min(4).max(30).required(),
});

export const genresValidator = (data) => {
  return genres.validate(data);
};
