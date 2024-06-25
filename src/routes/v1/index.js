const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../../user/user.controller');
const { login, register } = require('../../auth/auth.controller')
const auth = require('../../middlewares/auth');

router
  .route('/')
  .post(createUser)
  .get(getUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.post('/register', register);
router.post('/login', login);
//router.post('/logout', validate(authValidation.logout), authController.logout);

module.exports = router;