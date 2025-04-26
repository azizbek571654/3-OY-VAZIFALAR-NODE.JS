import Admin from "../model/Admin.model.js";
import { adminValidator } from "../validation/index.js";
import {
  decode,
  enCode,
  catchError,
  generateAcessToken,
  generateRefereshToken,
} from "../utils/index.js";

export class AdminController {
  async createSupperAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        throw new Error(`'Error on careating supper admin : ${error}`);
      }
      const { username, password } = value;

      const chekSupperadmin = await Admin.findOne({ role: "superadmin" });
      if (chekSupperadmin) {
        return res.status(409).json({
          StatusCode: 409,
          message: "supper admin aleady exists",
        });
      }

      const hashedPassword = await decode(password, 7);
      const SuppAdmin = await Admin.create({
        username,
        hashedPassword,
        role: "superadmin",
      });
      return res.status(201).json({
        StatusCode: 201,
        message: "succsec",
        data: SuppAdmin,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async createAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        throw new Error(`'Error on careating : ${error}`);
      }
      const { username, password } = value;

      const hashedPassword = await decode(password, 7);
      const newAdmin = await Admin.create({
        username,
        hashedPassword,
        role: "admin",
      });
      return res.status(201).json({
        StatusCode: 201,
        message: "succsec",
        data: newAdmin,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find();
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: admins,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        throw new Error("admin not found");
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: admin,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async updateAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedAdmin,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (!admin) {
        throw new Error("admin not found");
      }
      if (!admin.role === "superadmin") {
        return res.status(400).json({
          statusCode: 400,
          message: "Danggg",
        });
      }
      await Admin.findByIdAndDelete(id);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {},
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async siginAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) {
        throw new Error("admin not found");
      }
      const isMatchPassword = await encodeURI(password, admin.hashedPassword);
      if (!isMatchPassword) {
        throw new Error("Invalid password");
      }
      const payload = { id: admin._id, role: admin.role };
      const accessToken = generateAcessToken(payload);
      const refetrshToken = generateRefereshToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {
          accessToken,
          refetrshToken,
        },
      });
    } catch (error) {
      catchError(error, res);
    }
  }
}
