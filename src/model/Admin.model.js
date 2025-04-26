import { model, Schema } from "mongoose";
import { collections } from "../common/db.js";

const adminScheme  = new Schema({
    username: {type: String, unique: true, required: true},
    hashedPassword: {type: String, required: true},
    role: {type: String, enum: ['superadmin', 'admin'], default: 'admin', required: true}
}, {timestamps: true}); 

const Admin = model('Admin', adminScheme);
export default Admin;