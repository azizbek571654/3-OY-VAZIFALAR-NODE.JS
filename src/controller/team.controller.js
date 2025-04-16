import Team from "../model/teams.model.js";
import Club from "../model/football_clubs.model.js";
import Tournament from "../model/Tournament.model.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({})
      .populate("club_id", "club_name city")
      .populate("tournament_id", "name")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error("Jamoalarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Jamoalarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate("club_id")
      .populate("tournament_id");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Jamoa topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Jamoani olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Jamoani olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await Team.find({ tournament_id: tournamentId })
      .populate("club_id", "club_name city")
      .sort({ team_name: 1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error("Turnir jamoalarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnir jamoalarini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const createTeam = async (req, res) => {
  try {
    const teamData = req.body;

    const club = await Club.findById(teamData.club_id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan klub mavjud emas",
      });
    }

    const tournament = await Tournament.findById(teamData.tournament_id);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan turnir mavjud emas",
      });
    }

    const newTeam = await Team.create(teamData);

    res.status(201).json({
      success: true,
      message: "Jamoa muvaffaqiyatli yaratildi",
      data: newTeam,
    });
  } catch (error) {
    console.error("Jamoa yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Jamoa yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.club_id) {
      const club = await Club.findById(updateData.club_id);
      if (!club) {
        return res.status(404).json({
          success: false,
          message: "Ko'rsatilgan klub mavjud emas",
        });
      }
    }

    if (updateData.tournament_id) {
      const tournament = await Tournament.findById(updateData.tournament_id);
      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: "Ko'rsatilgan turnir mavjud emas",
        });
      }
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun jamoa topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Jamoa muvaffaqiyatli yangilandi",
      data: updatedTeam,
    });
  } catch (error) {
    console.error("Jamoani yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Jamoani yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun jamoa topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Jamoa muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    console.error("Jamoani o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Jamoani o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};
