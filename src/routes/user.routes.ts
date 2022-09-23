import { registrationUser, deleteUser, getUsers, updateUser, login } from '../controllers/users.controllers';

const express = require("express");

const router = express.Router();

router.post('/', registrationUser);
router.post('/login', login);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;