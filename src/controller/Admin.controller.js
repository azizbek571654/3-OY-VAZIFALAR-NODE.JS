import Admin from "../model/Admin.model.js";
import { adminValidator } from "../validation/index.js";
import {
  decode,
  enCode,
  transport,
  catchError,
  generateAcessToken,
  generateRefereshToken,
  optgenerator,
  getCache, setCache
} from "../utils/index.js";

export class AdminController {
  async createSupperAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { username, password } = value;
      const chekSupperadmin = await Admin.findOne({ role: "superadmin" });
      if (chekSupperadmin) {
        catchError(res, 409, "supper admin alrady exists");
      }
      const hashedPassword = await decode(password, 7);
      const SuppAdmin = await Admin.create({
        username,
        hashedPassword,
        role: "superadmin",
      });
      return res.status(201).json({
        statusCose: 201,
        message: "succes",
        data: SuppAdmin,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async createAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { username, password } = value;

      const hashedPassword = await decode(password, 7);
      const admin = await Admin.create({
        username,
        hashedPassword,
        role: "admin",
      });
      return res.status(201).json({
        statusCose: 201,
        message: "succes",
        data: admin,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async siginAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) {
        catchError(res, 404, "admin not found");
      }
      const isMatchPassword = await encodeURI(password, admin.hashedPassword);
      if (!isMatchPassword) {
        catchError(res, 400, "INvalid password");
      }

      const otp = optgenerator();

      const mailMessage = {
        from: process.env.SMTP_USER,
        to: "azizbekmirzavaliyev31@gmail.com",
        subject: "Full Stack N20",
        text: otp,
      };
      transport.sendMail(mailMessage, function (err, info) {
        if (err) {
          console.log(`error sending to mail ${err}`);
          catchError(res, 400, err);
        } else {
          console.log(info);
          setCache(admin.username, otp)
        }
      });
      return res.status(200).json({
        statusCose: 200,
        message: "Mission succesfull ✅",
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async confimSiginAdmin(req, res) {
    try {
      const { username, otp } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) {
        catchError(res, 400, "admin not found");
      }
      const otpCashe = getCache(username);
      if (!otpCashe || otp != otpCashe) {
        catchError(res, 400, "Wrong user");
      }
      const payload = { id: admin._id, role: admin.role };
      const accessToken = generateAcessToken(payload);
      const refetrshToken = generateRefereshToken(payload);
      res.cookie("refetrshToken", refetrshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }); 
      return res.status(200).json({
        statusCose: 200,
        message: "Mission succesfull ✅",
        data: accessToken,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async accessToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        catchError(res, 401, "Refresh token not found");
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        catchError(res, 401, "Refresh token expired");
      }
      const payload = { id: decodedToken.id, role: decodedToken.role };
      const accessToken = generateAccessToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: "Mission successfuly ✅",
        data: accessToken,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
  
  async signoutAdmin(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        catchError(res, 401, "Refresh token not found");
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        catchError(res, 401, "Refresh token expired");
      }
      res.clearCookie("refreshToken");
      return res.status(200).json({
        statusCode: 200,
        message: "Mission successfull ✅",
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find();
      return res.status(201).json({
        statusCose: 200,
        message: "succes",
        data: admins,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        catchError(res, 404, "admin not found");
      }
      return res.status(200).json({
        statusCose: 200,
        message: "succes",
        data: admin,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        catchError(res, 404, "admin not found");
      }
      const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(201).json({
        statusCose: 200,
        message: "succes",
        data: updatedAdmin,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        return catchError(res, 404, "admin not found");
      }
      if (admin.role !== "superadmin") {
        return catchError(res, 400, "supper admin can not be DELETE");
      }
      await Admin.findByIdAndDelete(id);
      return res.status(201).json({
        statusCose: 200,
        message: "succes",
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
