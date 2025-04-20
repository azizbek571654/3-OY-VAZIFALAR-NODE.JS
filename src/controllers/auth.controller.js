import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { config } from "../config/config.js";
import { generatetoken } from "../config/generate.js";

export const authController = {
  register: async (req, res, next) => {
    try {
      const body = req.body;
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne(
        { email: body.email },
        "email _id"
      ).exec();
      if (!user) {
        const newUser = new User({
          ...body,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
          status: "success",
          massage: "Users find successfully",
          error: null,
          data: {
            newUser,
            token: token,
          },
        });
        return;
      }
      return next(new Error("User already exists!", 409));
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return next(new Error("user detail wrong", 400));
      }
      const paylod = {
        sub: user._id,
        name: user.name,
        email: user.email,
      };
      const secretkey = config.jwt_secret;
      const token = generatetoken(paylod, secretkey, {
        algorithm: "HS512",
        expiresIn: "1d",
      });

      req.user = User;
      res.json({
        status: "success",
        massage: "login is succcofly",
        error: null,
        data: {
          user,
          token: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
