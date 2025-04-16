import mongoose from "mongoose";

const tournamentGroupSchema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Guruh nomi 100 ta belgidan oshmasligi kerak"],
    },
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TournamentGroup =
  mongoose.models.TournamentGroup ||
  mongoose.model("TournamentGroup", tournamentGroupSchema);

export default TournamentGroup;
