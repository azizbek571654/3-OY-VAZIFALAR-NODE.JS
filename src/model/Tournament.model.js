import mongoose from "mongoose";

// Turnir sxemasi
const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Turnir nomi 100 ta belgidan oshmasligi kerak"],
    },
    description: {
      type: String,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.start_date;
        },
        message: "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak",
      },
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["rejalashtirilgan", "jarayonda", "tugallangan", "bekor qilingan"],
        message: "{VALUE} - noto'g'ri holat",
      },
      default: "rejalashtirilgan",
    }
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;
