import { User } from '../models/INDEX.module.js';
import jwt from 'jsonwebtoken';
import { userValidator } from '../validations/INDEX.validator.js';
import {
  decode,
  enCode,
  transport,
  catchError,
  generateAccessToken,
  generateRefreshToken,
  optgenerator,
  getCache,
  setCache,
} from '../utils/INDEX.utils.js';

export class UserController {
  async createSupperAdmin(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { email, hashedPassword, role, full_name } = value;
      const chekSupperuser = await User.findOne({ role: 'superadmin' });

      if (chekSupperuser) {
        return catchError(res, 409, 'supper user alrady exists');
      }
      const hashedPass = await enCode(hashedPassword, 7);
      const Suppuser = await User.create({
        full_name,
        email,
        hashedPassword: hashedPass,
        role,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'succesfull✅',
        data: Suppuser,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { full_name, email, hashedPassword, role } = value;

      const hashedPass = await enCode(hashedPassword, 7);
      const newuser = await User.create({
        full_name,
        email,
        hashedPassword: hashedPass,
        role,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'succesfull✅',
        data: newuser,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async siginUser(req, res) {
    try {
      const { email, hashedPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      const isMatchhashedPassword = await decode(
        hashedPassword,
        user.hashedPassword
      );
      if (!isMatchhashedPassword) {
        return catchError(res, 400, 'INvalid hashedPassword');
      }

      const otp = optgenerator();

      const mailMessage = {
        from: process.env.SMTP_USER,
        to: process.env.USER_EMAIL,
        subject: "Bizning o'quv markazimizga xush kelibibsiz:",
        text: otp,
      };
      transport.sendMail(mailMessage, function (err, info) {
        if (err) {
          console.log(`error sending to mail ${err}`);
          return catchError(res, 400, err);
        } else {
          console.log(info);
          setCache(user.email, otp);
        }
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Mission succesfull ✅',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async confimSiginUser(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return catchError(res, 400, 'user not found');
      }
      const otpCashe = getCache(email);
      if (!otpCashe || otp != otpCashe) {
        return catchError(res, 400, 'Wrong user');
      }
      const payload = { id: user._id, role: user.role };
      const accessToken = generateAccessToken(payload);
      const refetrshToken = generateRefreshToken(payload);
      res.cookie('refetrshToken', refetrshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'succesfull ✅',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async accessToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return catchError(res, 401, 'Refresh token not found');
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        return catchError(res, 401, 'Refresh token expired');
      }
      const payload = { id: decodedToken.id, role: decodedToken.role };
      const accessToken = generateAccessToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: 'successfuly ✅',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async signoutuser(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return catchError(res, 401, 'Refresh token not found');
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        return catchError(res, 401, 'Refresh token expired');
      }
      res.clearCookie('refreshToken');
      return res.status(200).json({
        statusCode: 200,
        message: 'successfull ✅',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error);
    }
  }

  async getAllusers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        statusCode: 200,
        count: users.length,
        message: 'succesfull ✅',
        data: users,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getuserById(req, res) {
    try {
      const user = await UserController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'succesfull ✅',
        data: user,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateuserById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserController.findById(res, req.params.id);
      if (req.body.full_name) {
        const exist_full_name = await User.findOne({
          full_name: req.body.full_name,
        });
        if (exist_full_name && id != exist_full_name._id) {
          return catchError(res, 409, 'username alrady exist');
        }
      }
      let hashedPassword = user.hashedPassword;
      if (req.body.hashedPassword) {
        hashedPassword = enCode(req.body.hashedPassword, 7);
        delete req.body.hashedPassword;
      }
      const updateduser = await User.findByIdAndUpdate(
        id,
        { ...req.body, hashedPassword },
        { new: true }
      );
      return res.status(200).json({
        statusCode: 200,
        message: 'succesfull ✅',
        data: updateduser,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteuserById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserController.findById(res, req.params.id);
      // console.log(user);

      if (user.role === 'superadmin') {
        return catchError(res, 400, 'supper user can not be DELETE');
      }
      await User.findByIdAndDelete(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'succesfull ✅',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return catchError(res, 404, `user not found by ID ${id}`);
      }
      return user;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
