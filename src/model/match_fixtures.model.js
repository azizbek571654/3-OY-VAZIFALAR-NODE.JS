import mongoose from "mongoose";

const matchFixtureSchema = new mongoose.Schema(
  {
    match_date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      trim: true,
      maxlength: [100, "Joy nomi 100 ta belgidan oshmasligi kerak"],
    },
    home_team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    away_team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      validate: {
        validator: function (value) {
          return !value.equals(this.home_team_id);
        },
        message: "Bir jamoa o'zi bilan o'ynay olmaydi",
      },
    },
    home_score: {
      type: Number,
      min: [0, "Gol soni 0 dan kam bo'lmasligi kerak"],
      default: 0,
    },
    away_score: {
      type: Number,
      min: [0, "Gol soni 0 dan kam bo'lmasligi kerak"],
      default: 0,
    },
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    match_status: {
      type: String,
      enum: {
        values: [
          "rejalashtirilgan",
          "jarayonda",
          "tugallangan",
          "bekor qilingan",
        ],
        message:
          "{VALUE} - noto'g'ri holat. Mumkin bo'lgan holatlar: rejalashtirilgan, jarayonda, tugallangan, bekor qilingan",
      },
      default: "rejalashtirilgan",
      maxlength: [20, "O'yin holati 20 ta belgidan oshmasligi kerak"],
    },
  },
  {
    timestamps: true,
  }
);

const MatchFixture = mongoose.model("match_fixtures", matchFixtureSchema);
export default MatchFixture;
