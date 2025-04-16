import Player from "../model/Player.model.js";
import Team from "../model/teams.model.js";

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({})
      .populate("team_id", "name")
      .sort({ lastName: 1 });

    res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error("O'yinchilarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinchilarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findById(id).populate({
      path: "team_id",
      populate: {
        path: "clubId",
        model: "Club",
      },
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "O'yinchi topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    console.error("O'yinchini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinchini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getPlayersByTeam = async (req, res) => {
  try {
    const { team_id } = req.params;

    const team = await Team.findById(team_id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Jamoa topilmadi",
      });
    }

    const players = await Player.find({ team_id }).sort({
      position: 1,
      full_name: 1,
    });

    res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error("Jamoa o'yinchilarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Jamoa o'yinchilarini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const playerData = req.body;

    const team = await Team.findById(playerData.team_id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan jamoa mavjud emas",
      });
    }

    const newPlayer = await Player.create(playerData);

    res.status(201).json({
      success: true,
      message: "O'yinchi muvaffaqiyatli yaratildi",
      data: newPlayer,
    });
  } catch (error) {
    console.error("O'yinchi yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "O'yinchi yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.team_id) {
      const team = await Team.findById(updateData.team_id);
      if (!team) {
        return res.status(404).json({
          success: false,
          message: "Ko'rsatilgan jamoa mavjud emas",
        });
      }
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun o'yinchi topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "O'yinchi muvaffaqiyatli yangilandi",
      data: updatedPlayer,
    });
  } catch (error) {
    console.error("O'yinchini yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "O'yinchini yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun o'yinchi topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "O'yinchi muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    console.error("O'yinchini o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "O'yinchini o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};
