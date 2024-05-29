const Joi = require('joi');

const phoneSchema = Joi.object({
  phoneNumber: Joi.string().length(13).required(),
});

const otpSchema = Joi.object({
  phoneNumber: Joi.string().length(13).required(),
  otpCode: Joi.string().length(6).required(),
  verificationToken: Joi.string().required(),
});

const register = {
  body: Joi.object().keys({
    phone: Joi.string(),
    // password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  phoneSchema,
  otpSchema,
  // forgotPassword,
  // resetPassword,
  // verifyEmail,
};
