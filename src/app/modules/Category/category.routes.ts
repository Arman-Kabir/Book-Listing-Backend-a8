import express from 'express';
import { CategoryController } from './category.controller';


const router = express.Router();

router.post('/create-category',CategoryController.createCategory)
router.get('/',)
router.get('/:id',)
router.patch('/:id',)
router.delete('/:id',)

export const CategoryRoutes = router;