import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/',UserController.getAllUsers)
router.get('/:id',UserController.getSingleUser)
router.patch('/:id',UserController.updateSingleUser)
router.delete('/:id',UserController.deleteUser)

export const UserRoutes = router;
