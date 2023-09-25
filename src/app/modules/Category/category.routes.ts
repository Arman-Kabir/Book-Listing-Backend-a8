import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post('/create-category', CategoryController.createCategory)
router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.getSingleCategory)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateSingleCategory)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory)

export const CategoryRoutes = router;