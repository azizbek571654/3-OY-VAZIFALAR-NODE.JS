import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "Toliq ism 100 ta belgidan oshmasligi kerak"],
  },
  date_of_birth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        const age = Math.floor(
          (today - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000)
        );
        return age >= 16 && age <= 40;
      },
      message:
        "Futbolchining yoshi noto'g'ri kiritilgan. Yoshi 16 dan 40 gacha bo'lishi kerak.",
    },
  },
  position: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: ["darvozabon", "himoyachi", "yarim himoyachi", "hujumchi"],
      message:
        "{VALUE} - noto'g'ri pozitsiya. Mumkin bo'lgan pozitsiyalar: darvozabon, himoyachi, yarim himoyachi, hujumchi",
    },
    maxlength: [50, "Pozitsiya nomi 50 ta belgidan oshmasligi kerak"],
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  jersey_number: {
    type: Number,
    min: [1, "Futbolchi raqami 1 dan kam bo'lmasligi kerak"],
    max: [99, "Futbolchi raqami 99 dan ko'p bo'lmasligi kerak"],
  },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
