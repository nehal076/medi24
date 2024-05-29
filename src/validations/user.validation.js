const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { roles } = require('../config/roles');

const createUser = {
  body: Joi.object().keys({
 
    phone_number: Joi.string().required().pattern(/^[0-9]+$/), // Assuming phone number consists of digits only
    role_type: Joi.string().valid(...roles),
    // token: Joi.string(),
    // refresh_token: Joi.string(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    phone_number: Joi.string(),
    role_type: Joi.string().valid(...roles),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      phone_number: Joi.string().pattern(/^[0-9]+$/), // Assuming phone number consists of digits only
      role_type: Joi.string().valid(...roles),
      token: Joi.string(),
      refresh_token: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};


// const createUser = {
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().custom(password),
//     name: Joi.string().required(),
//     role: Joi.string().required().valid('user', 'admin'),
//   }),
// };

// const getUsers = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

// const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
// };

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// module.exports = {
//   createUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser,
// };
