import Match from "../model/match_fixtures.model.js";
import Team from "../model/teams.model.js";
import Tournament from "../model/Tournament.model.js";

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate("home_team_id", "name")
      .populate("away_team_id", "name")
      .populate("tournament_id", "name")
      .sort({ matchDate: -1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error("O'yinlarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinlarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate("home_team_id")
      .populate("away_team_id")
      .populate("tournament_id");

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "O'yin topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    console.error("O'yinni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getMatchesByTournament = async (req, res) => {
  try {
    const { tournament_id } = req.params;

    const tournament = await Tournament.findById(tournament_id);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Turnir topilmadi",
      });
    }

    const matches = await Match.find({ tournament_id })
      .populate("home_team_id", "name")
      .populate("away_team_id", "name")
      .sort({ matchDate: 1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error("Turnir o'yinlarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnir o'yinlarini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getMatchesByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Jamoa topilmadi",
      });
    }

    const matches = await Match.find({
      $or: [{ home_team_id: teamId }, { away_team_id: teamId }],
    })
      .populate("home_team_id", "name")
      .populate("away_team_id", "name")
      .populate("tournament_id", "name")
      .sort({ matchDate: -1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error("Jamoa o'yinlarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Jamoa o'yinlarini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const createMatch = async (req, res) => {
  try {
    const matchData = req.body;

    const homeTeam = await Team.findById(matchData.home_team_id);
    if (!homeTeam) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan uy jamoa mavjud emas",
      });
    }

    const awayTeam = await Team.findById(matchData.away_team_id);
    if (!awayTeam) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan mehmon jamoa mavjud emas",
      });
    }

    const tournament = await Tournament.findById(matchData.tournament_id);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan turnir mavjud emas",
      });
    }

    if (matchData.home_team_id === matchData.away_team_id) {
      return res.status(400).json({
        success: false,
        message: "Bir jamoa o'zi bilan o'ynay olmaydi",
      });
    }

    const newMatch = await Match.create(matchData);

    res.status(201).json({
      success: true,
      message: "O'yin muvaffaqiyatli yaratildi",
      data: newMatch,
    });
  } catch (error) {
    console.error("O'yin yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "O'yin yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.home_team_id && updateData.away_team_id) {
      if (updateData.home_team_id === updateData.away_team_id) {
        return res.status(400).json({
          success: false,
          message: "Bir jamoa o'zi bilan o'ynay olmaydi",
        });
      }
    }

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun o'yin topilmadi",
      });
    }

    if (updateData.home_team_id) {
      const homeTeam = await Team.findById(updateData.home_team_id);
      if (!homeTeam) {
        return res.status(404).json({
          success: false,
          message: "Ko'rsatilgan uy jamoa mavjud emas",
        });
      }
      
      if (updateData.home_team_id === match.away_team_id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Bir jamoa o'zi bilan o'ynay olmaydi",
        });
      }
    }

    if (updateData.away_team_id) {
      const awayTeam = await Team.findById(updateData.away_team_id);
      if (!awayTeam) {
        return res.status(404).json({
          success: false,
          message: "Ko'rsatilgan mehmon jamoa mavjud emas",
        });
      }
      
      if (updateData.away_team_id === match.home_team_id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Bir jamoa o'zi bilan o'ynay olmaydi",
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

    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "O'yin muvaffaqiyatli yangilandi",
      data: updatedMatch,
    });
  } catch (error) {
    console.error("O'yinni yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "O'yinni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun o'yin topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "O'yin muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    console.error("O'yinni o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};
