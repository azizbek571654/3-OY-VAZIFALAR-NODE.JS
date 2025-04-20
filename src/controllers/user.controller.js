import { CustomError } from "../middlewares/errrorhandler.js"
import { User } from "../models/index.js"

export const userController = {
    getall: async(req, res, next) =>{
        try {
            const users = await User.find()
            if(!users){
                throw new CustomError("users not found!", 404)
            }
            res.status(200).json({
                status: "success",
                massage:" users find successfully",
                error: null,
                data: {
                    users
                },
            })
        } catch (error) {
            next(error)
            console.log(error);
        }
    },
    getone: async(req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if(!user){
                throw new CustomError("users not found!", 404)
            }
            return res.status(200).json({
                status: "success",
                massage:" user find successfully",
                error: null,
                data: {
                    user
                },
            })
        } catch (error) {
            next(error)
            // console.log(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const body = req.body;
            const user = new User(body)
            await user.save()

            res.json({
                status: "success",
                massage:"create new user",
                error: null,
                data: {
                    user
                },
            })
        } catch (error) {
            next(error)
            console.log(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const user = User.findById(id)
            if(user){
                await User.updateOne({_id: id}, body)
                return res.status(200).json({
                    status: "success",
                    massage:"update user successfully",
                    error: null,
                    data: null
                })
                
            }
            return next(new Error("user not found!", 404))
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const user = User.findById(id)
            if(user){
                await User.deleteOne({_id: id})
                return res.status(200).json({
                    status: "success",
                    massage:"delete user successfully",
                    error: null,
                    data: null
                })
                
            }
            return next(new Error("user not found!", 404))
        } catch (error) {
            next(error)
        }
    }
}