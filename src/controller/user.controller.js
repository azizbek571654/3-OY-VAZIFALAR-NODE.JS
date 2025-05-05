import User from '../model//index.module.js';
import { userValidator } from '../validation/user.validation.js';
import {
  decode,
  enCode,
  transport,
  catchError,
  generateAcessToken,
  generateRefereshToken,
  optgenerator,
  getCache,
  setCache,
} from '../utils/index.js';

export class UserController {
  async createSupperAdmin(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { email, password, role, name } = value;
      const chekSupperadmin = await User.findOne({ role: 'superadmin' });
      if (chekSupperadmin) {
        return catchError(res, 409, 'supper user alrady exists');
      }
      const hashedPassword = await decode(password, 7);
      const SuppAdmin = await User.create({
        email,
        name,
        hashedPassword,
        role,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'succes',
        data: SuppAdmin,
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
      const { name, email, password, role } = value;

      const hashedPassword = await decode(password, 7);
      const newuser = await User.create({
        name,
        email,
        hashedPassword,
        role,
      });
      return res.status(201).json({
        statusCode: 201,
        message: 'succesfull',
        data: newuser,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async siginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      const isMatchPassword = await enCode(password, user.hashedPassword);
      if (!isMatchPassword) {
        return catchError(res, 400, 'INvalid password');
      }

      const otp = optgenerator();

      const mailMessage = {
        from: process.env.SMTP_USER,
        to: 'azizbekmirzavaliyev31@gmail.com',
        subject: 'Full Stack N20',
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
      const accessToken = generateAcessToken(payload);
      const refetrshToken = generateRefereshToken(payload);
      res.cookie('refetrshToken', refetrshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Mission succesfull ✅',
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
        message: 'Mission successfuly ✅',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async signoutAdmin(req, res) {
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
        message: 'Mission successfull ✅',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const admins = await User.find();
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: admins,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAdminById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'succes',
        data: user,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateAdminById(req, res) {
    try {
      const id = req.params.id;
      const user = await Admin.findById(id);
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: updatedAdmin,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const id = req.params.id;
      const user = await Admin.findById(id);
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      if (user.role !== 'superadmin') {
        return catchError(res, 400, 'supper user can not be DELETE');
      }
      await Admin.findByIdAndDelete(id);
      return res.status(201).json({
        statusCode: 200,
        message: 'succes',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
