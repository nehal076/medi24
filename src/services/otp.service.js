const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const crypto = require('crypto');
const { generateToken } = require('../utils/jwt');
const { User, OtpEntry } = require('../models');

const generateOtpWithVerificationToken = () => {
  const otpCode = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  const verificationToken = crypto.randomBytes(16).toString('hex');
  return { otpCode, verificationToken };
};

const sendOtp = async (phoneNumber) => {
  const { otpCode, verificationToken } = generateOtpWithVerificationToken();
  const message = `Your verification code is: ${otpCode}. Please enter this code to complete your verification. Do not share this code with anyone.`;

  try {
    await client.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    const expiresAt = new Date(new Date().getTime() + 5 * 60000); // 5 minutes from now
    const otpEntry = new OtpEntry({ phoneNumber, otpCode, verificationToken, expiresAt });
    await otpEntry.save();

    return { message: 'OTP sent successfully.', verificationToken };
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

const verifyOtpInDb = async (phoneNumber, otpCode, verificationToken) => {
  try {
    const currentDateTime = new Date();
    const otpEntry = await OtpEntry.findOne({
      phoneNumber,
      otpCode,
      verificationToken,
      expiresAt: { $gt: currentDateTime },
    });

    return otpEntry;
  } catch (error) {
    throw new Error('Error verifying OTP in database');
  }
};

// services/otp.service.js
const verifyOtp = async (phoneNumber, otpCode, verificationToken) => {
  if (!verificationToken) {
    throw new Error('Verification token is required');
  }

  const otpEntry = await verifyOtpInDb(phoneNumber, otpCode, verificationToken);

  if (!otpEntry) {
    throw new Error('OTP not valid or expired');
  }

  let user = await User.findOne({ phoneNumber });

  if (!user) {
    user = new User({ phoneNumber });
    await user.save();
  }

  await OtpEntry.deleteOne({ _id: otpEntry._id });

  const token = generateToken(user);

  return { message: 'OTP verified successfully', token };
};

const resendOtp = async (phoneNumber) => {
  await OtpEntry.deleteMany({ phoneNumber }); // Cleanup old entries
  return sendOtp(phoneNumber);
};

module.exports = {
  sendOtp,
  verifyOtpInDb,
  verifyOtp,
  resendOtp,
};
