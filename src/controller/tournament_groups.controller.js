import TournamentGroup from "../model/tournament_groups.model.js";
import Tournament from "../model/Tournament.model.js";

export const getTournamentGroups = async (req, res) => {
  try {
    const groups = await TournamentGroup.find()
      .populate("tournament_id", "tournament_name")
      .sort({ group_name: 1 });

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    console.error("Guruhlarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Guruhlarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getTournamentGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await TournamentGroup.findById(id)
      .populate("tournament_id");

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Guruh topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error("Guruhni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Guruhni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getGroupsByTournament = async (req, res) => {
  try {
    const { tournament_id } = req.params;

    const tournament = await Tournament.findById(tournament_id);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Turnir topilmadi",
      });
    }

    const groups = await TournamentGroup.find({ tournament_id })
      .sort({ group_name: 1 });

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    console.error("Turnir guruhlarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnir guruhlarini olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const createTournamentGroup = async (req, res) => {
  try {
    const groupData = req.body;

    const tournament = await Tournament.findById(groupData.tournament_id);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Ko'rsatilgan turnir mavjud emas",
      });
    }

    const newGroup = await TournamentGroup.create(groupData);

    res.status(201).json({
      success: true,
      message: "Guruh muvaffaqiyatli yaratildi",
      data: newGroup,
    });
  } catch (error) {
    console.error("Guruh yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Guruh yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const updateTournamentGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const group = await TournamentGroup.findById(id);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun guruh topilmadi",
      });
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

    const updatedGroup = await TournamentGroup.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Guruh muvaffaqiyatli yangilandi",
      data: updatedGroup,
    });
  } catch (error) {
    console.error("Guruhni yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Guruhni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const deleteTournamentGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGroup = await TournamentGroup.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun guruh topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Guruh muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    console.error("Guruhni o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Guruhni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};