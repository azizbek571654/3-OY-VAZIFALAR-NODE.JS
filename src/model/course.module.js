import mongoose, { model, Schema } from 'mongoose';
const coueseScheme = new Schema(
  {
    course_name: { type: String, required: true },
    teachers_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },
    student_id: { Type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    category: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Couese = model('Course', coueseScheme);
export default Couese;
