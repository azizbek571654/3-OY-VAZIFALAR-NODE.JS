import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Jamoa nomi 100 ta belgidan oshmasligi kerak"],
    },
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "football_clubs",
      required: true,
    },
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
    coach_name: {
      type: String,
      trim: true,
      maxlength: [100, "Murabbiy ismi 100 ta belgidan oshmasligi kerak"],
    },
  },
  {
    timestamps: true,
  }
);

const Teams = mongoose.model("teams", teamSchema);
export default Teams;