const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser, login } = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);

module.exports = router;