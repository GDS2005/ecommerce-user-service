const Joi = require('joi');

const registerBody = {
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().optional(),
};

exports.register = {
  body: Joi.object().keys(registerBody),
};

exports.login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

exports.refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

exports.forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

exports.resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
};

exports.verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};