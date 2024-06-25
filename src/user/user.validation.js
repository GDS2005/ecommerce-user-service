const Joi = require('joi');

const createUserBody = {
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().required().valid('user', 'admin'),
};

const createUser = {
  body: Joi.object().keys(createUserBody),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};