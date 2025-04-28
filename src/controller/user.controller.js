import { User } from "../model/index.js";
import { catchError } from "../utils/index.js";
import { userValidator } from "../validation/index.js";
import { decode, enCode } from "../utils/index.js";

export class userController  {
    async createUser(req, res){
        try {
            const { error, value } = userValidator(req.body);
            // console.log(value);
        
            if (error) {
              catchError(res, 404, "user not found");
            }
            const { name, email, password } = value;
            
            const hashedPassword = await decode(password, 7);
            // console.log(hashedPassword);
            
            const newuser = await User.create({
              name,
              email,
              hashedPassword,
            });
            // console.log(newuser);
            
            return res.status(201).json({
              StatusCode: 201,
              message: "succsess",
              data: newuser,
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    
    async getAllUsers(req, res){
        try {
            const users = await User.find();
            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: users,
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getUserById(req, res){
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            if (!user) {
                catchError(res, 404, "user not found");   
            }
        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data: user
        })
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async updateUserById(req, res){
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            if (!user) {
                catchError(res, 404, "user not found");
            }
            const updateduser = await User.findByIdAndUpdate(id, req.body, {new:true});

        return res.status(200).json({
          statusCode: 200,
          message: "success",
          data: updateduser
        });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async deleteUserById(req, res){
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (!user) {
              catchError(res, 404, "user not found");
            }
            await User.findByIdAndDelete(id)
            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: {}
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}
