import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { config } from "../config/config.js";
import { truncates } from "bcryptjs";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, config.jwt_secret);
    console.log(decode);
    const user = await User.findById(decode.sub);
    if (!user) {
      return next(new Error("autharidation failed"));
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }

  // const user = await User.findOne({_id: jwtDecode.sub})
  // if (!user) {
  //     return next(new Error("Athuration failed", 400))
  // }
  // console.log("ishladi");
};

// export const authMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);

//     const[useremail, userpassword] = Buffer.from(token, "base64")
//         .toString()
//         .split(":")

//     const user = await User.findOne({email: useremail})

//     if(!user){
//         return res.status(404).send("user detail wrong")
//     }

//     if(
//         useremail &&
//         userpassword &&
//         user.email === useremail &&
//         user.password === userpassword
//     ){
//         next();    console.log(user);

//         return;
//     }
//     res.status(404).send("user detail wrong")
//     return;

// }
