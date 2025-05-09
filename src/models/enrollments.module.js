import { Schema, model } from 'mongoose';

const enrollmentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolled_at: { type: Date, default: Date.now },
    email_send: { type: Boolean },
  },
  { timestamps: true }
);
enrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });
export const Enrollment = model('Enrollment', enrollmentSchema);
