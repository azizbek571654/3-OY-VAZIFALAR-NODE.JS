import Tournament from "../model/Tournament.model.js";

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({}).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments,
    });
  } catch (error) {
    console.error("Turnirlarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnirlarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Turnir topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    console.error("Turnirni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnirni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const createTournament = async (req, res) => {
  try {
    const tournamentData = req.body;

    if (new Date(tournamentData.startDate) > new Date(tournamentData.endDate)) {
      return res.status(400).json({
        success: false,
        message: "Boshlang'ich sana tugash sanasidan oldin bo'lishi kerak",
      });
    }

    const newTournament = await Tournament.create(tournamentData);

    res.status(201).json({
      success: true,
      message: "Turnir muvaffaqiyatli yaratildi",
      data: newTournament,
    });
  } catch (error) {
    console.error("Turnir yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Turnir yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.startDate && updateData.endDate) {
      if (new Date(updateData.startDate) > new Date(updateData.endDate)) {
        return res.status(400).json({
          success: false,
          message: "Boshlang'ich sana tugash sanasidan oldin bo'lishi kerak",
        });
      }
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTournament) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun turnir topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Turnir muvaffaqiyatli yangilandi",
      data: updatedTournament,
    });
  } catch (error) {
    console.error("Turnirni yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Turnirni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTournament = await Tournament.findByIdAndDelete(id);

    if (!deletedTournament) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun turnir topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Turnir muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    console.error("Turnirni o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Turnirni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};
