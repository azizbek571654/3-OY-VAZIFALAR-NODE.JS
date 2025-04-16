import mongoose from "mongoose";

const footballClubSchema = new mongoose.Schema(
  {
    club_name: {
      type: String, 
      required: true,
      trim: true,
      maxlength: [100, "Klub nomi 100 ta belgidan oshmasligi kerak"],
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Shahar nomi 100 ta belgidan oshmasligi kerak"],
    },

    country: {
      type: String, 
      required: true,
      trim: true,
      maxlength: [100, "Davlat nomi 100 ta belgidan oshmasligi kerak"],
    },

    founded_year: {
      type: Number,
      min: [1857, "Tashkil etilgan yil 1857-yildan kam bo'lmasligi kerak"],
      max: [
        new Date().getFullYear(),
        "Tashkil etilgan yil hozirgi yildan oshmasligi kerak",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const FootballClub = mongoose.model("football_clubs", footballClubSchema);
export default FootballClub;
