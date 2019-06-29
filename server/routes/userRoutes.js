import express from 'express';
const router = express.Router();

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userControllers';

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserById);
router.route('/:id').patch(updateUser);
router.route('/:id').delete(deleteUser);


module.exports = router;