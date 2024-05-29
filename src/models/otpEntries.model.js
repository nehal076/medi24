const mongoose = require('mongoose');

const otpEntrySchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 13,
    },
    otpCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 6,
    },
    verificationToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OtpEntry', otpEntrySchema);
