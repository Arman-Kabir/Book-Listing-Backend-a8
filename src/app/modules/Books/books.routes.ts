import express from 'express';
import { BookController } from './books.controller';


const router = express.Router();

router.post('/create-book',BookController.createBook)
router.get('/',)
router.get('/:id',)
router.patch('/:id',)
router.delete('/:id',)

export const BookRoutes = router;