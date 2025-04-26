import { Reviews } from "../model/index.js";
import { catchError } from "../utils/index.js";
import { reviewValidator } from "../validation/index.js";

export class reviewController {
    async createReviews(req, res){
        try {
            const { error, value } = reviewValidator(req.body);

            if (error) {
                throw new Error(`'Error on careating : ${error}`);
            }
            const { user_id, movie_id, rating, comment } = value;

            const newreviews = await Reviews.create({
              user_id,
              movie_id,
              rating,
              comment,
            });
            return res.status(201).json({
              StatusCode: 201,
              message: "succsess",
              data: newreviews,
            });
        } catch (error) {
            catchError(error, res)
        }
    }

    async getAllreviews(req, res){
        try {
            const reviews = await Reviews.find();
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: reviews,
            });
        } catch (error) {
                catchError(error, res);
        }
    }

    async getreviewsById(req, res){
        try {
            const id = req.params.id;
            const reviews = await Reviews.findById(id)
            if (!reviews) {
                throw new Error("reviews not found");   
            }
        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data: reviews
        })
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async updatereviewsById(req, res){
        try {
            const id = req.params.id;
            const reviews = await Reviews.findById(id)
            if (!reviews) {
                throw new Error("reviews not found");
            }
            const updatedreviews = await Reviews.findByIdAndUpdate(id, req.body, {new:true});
    
        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data: updatedreviews
        });
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async deletereviewsById(req, res){
        try {
            const id = req.params.id;
            const reviews = await Reviews.findById(id);
            if (!reviews) {
                throw new Error("reviews not found");
            }
            await Reviews.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            catchError(error, res)
        }
    }
}