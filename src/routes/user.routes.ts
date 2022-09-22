import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users.controllers';

const express = require("express");

const router = express.Router();

router.post('/', createUser);

router.get('/', getUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;