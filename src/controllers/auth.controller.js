/* eslint-disable no-console */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const otpServices = require('../services/otp.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const result = await otpServices.sendOtp(phoneNumber);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { phoneNumber, otpCode, verificationToken } = req.body;
  console.log(`Verification Request - Phone: ${phoneNumber}, OTP: ${otpCode}, Token: ${verificationToken}`); // Debug log

  try {
    const result = await otpServices.verifyOtp(phoneNumber, otpCode, verificationToken);
    console.log(`Verify OTP result: ${JSON.stringify(result)}`); // Debug log
    res.send(result);
  } catch (error) {
    console.error(`Verification failed: ${error.message}`); // Debug log
    res.status(500).send({ message: 'Verification failed', error: error.message });
  }
};

const resendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const result = await otpServices.resendOtp(phoneNumber);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendOtp,
  verifyOtp,
  resendOtp,
};
