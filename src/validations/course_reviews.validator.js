import Joi from 'joi';

const courseReview = Joi.object({
  user_id: Joi.string().length(24).required(),
  course_id: Joi.string().length(24).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(1000).optional(),
});

export const courseReviewValidator = (data) => {
  return courseReview.validate(data);
};

export default courseReviewValidator;
