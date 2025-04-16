import { FootballClub } from "../model/index.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await FootballClub.find({}).sort({ club_name: 1 });

    res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    console.error("Klublarni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Klublarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await FootballClub.findById(id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Klub topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    console.error("Klubni olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Klubni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

/**
 * Yangi klub qo'shish
 * @param {Object} req - So'rov ob'ekti (req.body - klub ma'lumotlari)
 * @param {Object} res - Javob ob'ekti
 */
export const createClub = async (req, res) => {
  try {
    // So'rov tarkibidan klub ma'lumotlarini olish
    const clubData = req.body;

    // Yangi klub yaratish
    const newClub = await FootballClub.create(clubData);

    // Muvaffaqiyatli javob qaytarish
    res.status(201).json({
      success: true,
      message: "Klub muvaffaqiyatli yaratildi",
      data: newClub,
    });
  } catch (error) {
    // Xatolik yuz berganda
    console.error("Klub yaratishda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Klub yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

/**
 * Klubni yangilash
 * @param {Object} req - So'rov ob'ekti (req.params.id - klub ID si, req.body - yangi ma'lumotlar)
 * @param {Object} res - Javob ob'ekti
 */
export const updateClub = async (req, res) => {
  try {
    // ID ni olish
    const { id } = req.params;

    // So'rov tarkibidan yangilangan ma'lumotlarni olish
    const updateData = req.body;

    // Bazadan klubni yangilash (yangi ma'lumotlarni qaytaradi)
    const updatedClub = await FootballClub.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Yangi ma'lumotni qaytaradi va validatsiyani ishlatadi
    );

    // Agar klub topilmasa
    if (!updatedClub) {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun klub topilmadi",
      });
    }

    // Muvaffaqiyatli javob qaytarish
    res.status(200).json({
      success: true,
      message: "Klub muvaffaqiyatli yangilandi",
      data: updatedClub,
    });
  } catch (error) {
    // Xatolik yuz berganda
    console.error("Klubni yangilashda xatolik:", error.message);
    res.status(400).json({
      success: false,
      message: "Klubni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

/**
 * Klubni o'chirish
 * @param {Object} req - So'rov ob'ekti (req.params.id - klub ID si)
 * @param {Object} res - Javob ob'ekti
 */
export const deleteClub = async (req, res) => {
  try {
    // ID ni olish
    const { id } = req.params;

    // Bazadan klubni o'chirish
    const deletedClub = await FootballClub.findByIdAndDelete(id);

    // Agar klub topilmasa
    if (!deletedClub) {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun klub topilmadi",
      });
    }

    // Muvaffaqiyatli javob qaytarish
    res.status(200).json({
      success: true,
      message: "Klub muvaffaqiyatli o'chirildi",
      data: {},
    });
  } catch (error) {
    // Xatolik yuz berganda
    console.error("Klubni o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Klubni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};
